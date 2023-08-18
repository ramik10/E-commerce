import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import { NextRequest } from "next/server";
import User from "@/Models/userModel";

connect();

export async function POST(req: NextRequest, {params}:any) {
    const productId = params.productId;
    const username = req.headers.get("username");
    try {
            const user = await User.findOne({username});
            if (user) {
                user.orders.push(productId);
                await user.save();
                return NextResponse.json({success:true,message:"Product added to cart"});
            }
            else{
                return NextResponse.json({success:false,message:"User not found"},{status:400});
            }
        }
     catch (error) {
        return NextResponse.json({success:false,message:"Something went wrong"},{status:500});
    }
    
}