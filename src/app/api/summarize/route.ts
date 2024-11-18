import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getUserCoins } from "@/actions/fetchActions";
import prisma from "@/lib/db.config";
import { coinSpend, minusCoins } from "@/actions/commonActions";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { Document } from "@langchain/core/documents";
import { text } from "stream/consumers";
import { TokenTextSplitter } from "@langchain/textsplitters";

interface SummerizePayload {
  url: string;
  id: string;
}

export async function POST(request: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }
    const body: SummerizePayload = await request.json();

    //*CHECK IF USER HAS SUFFICIENT COINS TO MAKE REQUESTS OR NOT
    const userCoins = await getUserCoins(session?.user?.id!);
    if (userCoins === null || (userCoins?.coins && userCoins?.coins <= 10)) {
      return NextResponse.json(
        {
          message:
            "You Don't Have Sufficient Coins To Make More Requests. Please Add More Coins To Continue Using Our Services",
        },
        { status: 400 }
      );
    }

    // CHECK IF THERE IS ANY IDENTICAL SUMMARY AVAILABLE
    const oldSummary = await prisma.summary.findFirst({
      select: {
        response: true,
      },
      where: {
        url: body.url,
      },
    });

    if (oldSummary != null && oldSummary.response) {
      /*
      TODOS
        1. DEDUCT USER COINS FOR EACH REQUEST
        2. ENTER THE DEDUCTED COIN INFO TO THE DATABASE
      */

      await minusCoins(session?.user?.id!);
      await coinSpend(session?.user?.id!, body.id);
      return NextResponse.json({
        message: "Podcast / Video Summary",
        data: oldSummary?.response,
      });

      // EXTRACTING TRANSCRIPT
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
              "Transcription Is Not Possible For This Video.. Please Try With Another One",
          },
          { status: 404 }
        );
      }
    }

    const splitter = new TokenTextSplitter({
      chunkSize: 10000,
      chunkOverlap: 250,
    });
    const docsSummary = await splitter.splitDocuments(text);
  } catch (error) {
    return NextResponse.json(
      { message: `Something Went Wrong!!! Please Try Again Later...` },
      { status: 500 }
    );
  }
}
