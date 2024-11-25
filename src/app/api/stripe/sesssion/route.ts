import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

interface SessionPayload {
  plan: String;
}

export async function POST(req: NextRequest) {}
