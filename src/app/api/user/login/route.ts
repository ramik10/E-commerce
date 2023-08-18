import {NextRequest, NextResponse } from 'next/server'
import Jwt from 'jsonwebtoken'
import User from "@/Models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export  async function POST(
req: NextRequest
)
{  
    const body = await req.json()
    const { username, password } = body;
    if (!username || !password) {
        return NextResponse.json({ success: true, message: "Please enter username and password" })
    }
    const existingUser = await User.findOne({username,password});
    if (existingUser) {
    const token = Jwt.sign({username}, "secret");
    const jsonResponse = NextResponse.json({ success: true, message: "Login successful" });
    jsonResponse.cookies.set("token", token)
    return (
        jsonResponse  
        )
    }
    else{
       return  NextResponse.json({success:false,message:"Invalid username or password"},{status:400})
    }
    
        
    }
