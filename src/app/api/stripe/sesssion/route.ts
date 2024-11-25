import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import stripe, { Stripe } from "stripe";

interface SessionPayload {
  plan: String;
}

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }
    const body: SessionPayload = await req.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    //* GET PRODUCT
    const product = await prisma.products.findUnique({
      where: {
        name: body.plan,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "No Product found with this plan.",
        },
        { status: 404 }
      );
    }

    // CREATE TRANSACTION
    const transaction = await prisma.transactions.create({
      data: {
        user_id: Number(session?.user?.id!),
        amount: product.amount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: `Something Went Wrong!!! Please Try Again Later...` },
      { status: 500 }
    );
  }
}
