import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getUserCoins } from "@/actions/fetchActions";
import { prisma } from "@/lib/db.config";
import { coinSpend, minusCoins, updateSummary } from "@/actions/commonActions";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { Document } from "@langchain/core/documents";
import { text } from "stream/consumers";
import { TokenTextSplitter } from "@langchain/textsplitters";
import { PromptTemplate } from "@langchain/core/prompts";
import { summaryTemplate } from "@/lib/prompts";
import { loadSummarizationChain } from "langchain/chains";
import { gptModal } from "@/lib/langchain";

interface SummerizePayload {
  url: string;
  id: string;
}

export async function POST(request: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body: SummerizePayload = await request.json();

    // Check if the user has sufficient coins to make requests
    const userCoins = await getUserCoins(session?.user?.id!);
    if (userCoins === null || (userCoins?.coins && userCoins?.coins <= 10)) {
      return NextResponse.json(
        {
          message:
            "You don't have sufficient coins to make more requests. Please add more coins to continue using our services.",
        },
        { status: 400 }
      );
    }

    // Check if there is any identical summary available
    const oldSummary = await prisma.summary.findFirst({
      select: {
        response: true,
      },
      where: {
        url: body.url,
      },
    });

    if (oldSummary != null && oldSummary.response) {
      // Deduct user coins and log the expenditure
      const remainingCoins = await minusCoins(session?.user?.id!);
      if (remainingCoins <= 0) {
        return NextResponse.json(
          {
            message:
              "You have run out of coins. Please add more coins to continue using our services.",
          },
          { status: 400 }
        );
      }
      await coinSpend(session?.user?.id!, body.id);

      return NextResponse.json({
        message: "Podcast / Video Summary",
        data: oldSummary?.response,
      });
    }

    // Extracting transcript
    let text: Document<Record<string, any>>[];
    try {
      const loader = YoutubeLoader.createFromUrl(body.url, {
        language: "en",
        addVideoInfo: true,
      });
      text = await loader.load();
    } catch (error) {
      return NextResponse.json(
        {
          message:
            "Transcription is not possible for this video. Please try with another one.",
        },
        { status: 404 }
      );
    }

    const splitter = new TokenTextSplitter({
      chunkSize: 10000,
      chunkOverlap: 250,
    });
    const docsSummary = await splitter.splitDocuments(text);
    const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);
    const summaryChain = loadSummarizationChain(gptModal, {
      type: "map_reduce",
      verbose: true,
      combinePrompt: summaryPrompt,
    });
    const res = await summaryChain.invoke({ input_documents: docsSummary });

    // Deduct user coins, log the expenditure, and update the summary in the database
    const remainingCoins = await minusCoins(session?.user?.id!);
    if (remainingCoins <= 0) {
      return NextResponse.json(
        {
          message:
            "You have run out of coins. Please add more coins to continue using our services.",
        },
        { status: 400 }
      );
    }
    await coinSpend(session?.user?.id!, body.id);
    await updateSummary(res?.text, body.id);

    return NextResponse.json({ message: "Video Summary", data: res?.text });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong! Please try again later." },
      { status: 500 }
    );
  }
}
