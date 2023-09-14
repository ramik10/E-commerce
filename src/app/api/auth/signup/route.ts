import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@/Db/prismaFile";
import {z} from "zod"



export async function POST(req: NextRequest) {
   const body =  await req.json()
  const credentials = z.object({
    name: z.string().min(4).max(25),
    email: z.string().email(),
    password: z.string().min(4).max(100),
  }).safeParse(body)
    if(!credentials.success){
        return NextResponse.json({error: "error"}, {status:400})
    }
  const user = await Prisma.user.findUnique({ where: { email: credentials.data.email } });
  if (!user) {
    const newUser = await Prisma.user.create({
      data: {
        name: credentials.data.name,
        email: credentials.data.email,
        password: credentials.data.password
      },
    });
    return NextResponse.json({email:newUser.email, password:newUser.password},{status:210});
  }
 else {
    return NextResponse.json({status:220});
  }
};