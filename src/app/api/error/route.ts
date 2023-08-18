import { NextResponse } from "next/server";

export async function GET() {
    console.log("error");
  return NextResponse.json({ error: "verification error" }, { status: 401 });
}