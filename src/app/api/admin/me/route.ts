import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse } from 'next/server'
import Admin from "@/Models/adminModel";
connect();

export async function POST(req: NextRequest) {
    try{
    const data = await req.json();
        const existingAdmin = await Admin.findOne(data)
        if(existingAdmin){
        return NextResponse.json({"username":existingAdmin.username});
    }
    else{
        return NextResponse.json({ error: "admin not found"}, { status: 404 });
    }
}
catch(err){
    return NextResponse.json({ error: "error"}, { status: 401 });
}
}
    