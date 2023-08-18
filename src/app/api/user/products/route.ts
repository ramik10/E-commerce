import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import Product from "@/Models/productsModel";

connect();

export async function GET() {
    const products = await Product.find();
    return NextResponse.json(products);
}