import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    try {
        const token = await getToken({req})
        if(!token){
            return NextResponse.json({message:"UnAuthorized"}, {status:401});
        }

    } catch (error) {
        console.log("The Add URL Error",error)
        return NextResponse.json({message:"Something Went Wrong!!! Please \n Try Again Later..."})
    }
}