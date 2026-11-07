import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/session";
export async function GET() { return NextResponse.json({ authenticated: await hasAdminSession() }); }
