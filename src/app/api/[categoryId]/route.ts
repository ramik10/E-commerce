import { NextResponse } from "next/server";
import { Prisma } from "@/Db/prismaFile";

export async function GET( params :any) {
    console.log(params)
    const products = await Prisma.product.findMany({
        where: {
            categoryId: params.categoryId
        }
    })
    console.log(products)
  return NextResponse.json(products)
}