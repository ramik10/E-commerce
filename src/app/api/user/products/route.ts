import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import Product from "@/Models/productsModel";
import { NextRequest } from "next/server";

connect();

export async function GET(req:NextRequest) {
    const products = await Product.find();
    return NextResponse.json(products);
}