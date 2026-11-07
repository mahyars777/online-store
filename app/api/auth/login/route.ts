import { NextResponse } from "next/server";
import { COOKIE, createSession } from "@/lib/session";
export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!process.env.ADMIN_PANEL_PASSWORD || password !== process.env.ADMIN_PANEL_PASSWORD)
    return NextResponse.json({ error: "رمز عبور صحیح نیست." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}
