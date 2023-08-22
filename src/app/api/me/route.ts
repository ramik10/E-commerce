import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    const  token  = req.cookies.get("token")?.value as string;
    if (!token) {
         return NextResponse.redirect("/api/error");
    }
    if(token){
        const username = jwt.verify(token,"secret");
        if(username){
            return NextResponse.json(username)
        }
        else{
            return NextResponse.redirect("/api/error");
        }
    }   
}