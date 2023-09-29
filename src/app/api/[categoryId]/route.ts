import {  NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/Db/prismaFile";

export async function GET( req:NextRequest, {params}:{params: { categoryId: string }}) {
    const products = await Prisma.product.findMany({
        where: {
            categoryId: params.categoryId
        }
    })
    
  return NextResponse.json(products)
}