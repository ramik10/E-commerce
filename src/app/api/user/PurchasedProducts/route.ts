import User from "@/Models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function GET(req: NextRequest) {
    const username = req.headers.get("username");
    try {
        const purchasedProducts = await User.findOne({username}).populate("orders");
        if (purchasedProducts) {
            return NextResponse.json(purchasedProducts.orders);
        }
        else{
            return NextResponse.json({success:false,message:"user not found"},{status:400});
        }
    } catch (error) {
        return NextResponse.json({success:false,message:"Something went wrong"},{status:500});
        
    }
}