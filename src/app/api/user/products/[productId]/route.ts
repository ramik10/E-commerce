import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import { NextApiRequest } from "next";
import Product from "@/Models/productsModel";

connect();

export async function GET(req: NextApiRequest) {
    const  productId = req.query.params;
    const product = await Product.findOne({productId});
    return NextResponse.json(product);
}

export async function POST(req: NextApiRequest) {
    const productId = req.query.params;
    
}