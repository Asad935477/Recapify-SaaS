import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

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
  } catch (error) {
    return NextResponse.json(
      { message: `Something Went Wrong!!! Please Try Again Later...` },
      { status: 500 }
    );
  }
}
