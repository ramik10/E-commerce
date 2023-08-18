import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse } from 'next/server'
import Admin from "@/Models/adminModel";
connect();

export async function POST(req: NextRequest) {
    // console.log(await req.json());
    try{
    const data = await req.json();
        //  console.log(data.username);
        const existingAdmin = await Admin.findOne(data)
        console.log(existingAdmin);
        if(existingAdmin){
        return NextResponse.json({"username":existingAdmin.username});
    }
    else{
        return NextResponse.json({ error: "admin not found"}, { status: 404 });
    }
}
catch(err){
    console.log(err);
    return NextResponse.json({ error: "error"}, { status: 401 });
}
}
    