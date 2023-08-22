import { NextResponse } from "next/server";

export function GET() {
    const jsonResponse = NextResponse.json({ success: true, message: "Logging out" });
    jsonResponse.cookies.delete("token")
    return jsonResponse;
}