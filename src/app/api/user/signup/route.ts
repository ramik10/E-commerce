import {NextRequest, NextResponse } from 'next/server'
import  Jwt  from 'jsonwebtoken';
import User from "@/Models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export  async function POST(
    req: NextRequest
)
{   
    const { username, password } = await req.json();
    if (!username || !password) {
        return NextResponse.json({ success: true, message: "Please enter username and password" })
    }
    const existingAdmin = await User.findOne({username});
    if(existingAdmin){
        return NextResponse.json({success:false,message:"Username already exists"},{status:400})
    }
    if (!existingAdmin) {
    const newUser = new User({username,password});
    await newUser.save();
    const token = Jwt.sign({ username}, "secret");
    const jsonResponse = NextResponse.json({ success: true, message: "Signup successful" });
    jsonResponse.cookies.set("token", token)
    return jsonResponse;
}
}