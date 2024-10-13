import { summarySchema } from "@/validations/summaryValidation";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    const body = await req.json();
    const Validator = vine.compile(summarySchema);
    const payload = await Validator.validate(body);
    return NextResponse.json({ payload });
  } catch (error) {
    console.log("The Add URL Error", error);
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        {
          message: "Please Check Validation Errors",
          errors: error.messages,
        },
        { status: 422 }
      );
    }
    return NextResponse.json({
      message: `Something Went Wrong!!! Please Try Again Later...`,
    });
  }
}
