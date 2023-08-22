import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse } from 'next/server'
import User from "@/Models/userModel";
connect();

export async function POST(req: NextRequest) {
    try{
    const data = await req.json();
        const existingUser = await User.findOne(data)
        if(existingUser){
        return NextResponse.json({"username":existingUser.username});
    }
    else{
        return NextResponse.json({ error: "user not found"}, { status: 404 });
    }
}
catch(err){
    return NextResponse.json({ error: "error"}, { status: 401 });
}
}


    