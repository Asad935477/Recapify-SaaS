import { NextRequest, NextResponse } from "next/server";

interface SummerizePayload {
  url: string;
  id: string;
}

export async function POST(request: NextRequest) {
  try {
  } catch (error) {
    return NextResponse.json(
      { message: `Something Went Wrong!!! Please Try Again Later...` },
      { status: 500 }
    );
  }
}
