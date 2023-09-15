import { NextResponse } from "next/server";
import { Prisma } from "@/Db/prismaFile";

export async function GET() {
    const products = await Prisma.product.findMany()
    console.log(products)
  return NextResponse.json(products)
}
