import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "verification error" }, { status: 401 });
}