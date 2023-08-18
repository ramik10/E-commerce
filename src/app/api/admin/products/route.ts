import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse } from 'next/server'
import { NextApiRequest } from "next";
import Product from "@/Models/productsModel";

connect();

type request =  NextRequest & {headers:{username:any}}

export async function POST(req: NextRequest) {
    const { name, price, image, description, quantity, category } = await req.json();
    if (!name || !price || !image || !quantity || !description || !category) {
        return NextResponse.json({ success: true, message: "Please enter all fields" })
    }
    if (name && price && image && description && quantity && category) {
        const newProduct = new Product({ name, price, image, description, quantity, category });
        await newProduct.save();
        return NextResponse.json({ success: true, message: "Product added successfully" });
    }
}

export async function GET(req: NextRequest) {
    const username = req.headers.get("username");
    console.log(username);
    const products = await Product.find();
    return NextResponse.json(products);
}