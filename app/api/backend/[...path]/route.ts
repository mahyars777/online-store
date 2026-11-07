import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/session";

async function proxy(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const joined = path.join("/");
  const isAdmin = joined.startsWith("admin/");
  if (isAdmin && !(await hasAdminSession())) return NextResponse.json({ error: "برای دسترسی به پنل ابتدا وارد شوید." }, { status: 401 });
  const base = (process.env.BACKEND_API_URL || "http://localhost:4000").replace(/\/$/, "");
  const incoming = new URL(req.url);
  const target = `${base}/api/${joined}${incoming.search}`;
  const headers = new Headers();
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  if (isAdmin && process.env.BACKEND_ADMIN_API_KEY) headers.set("x-admin-key", process.env.BACKEND_ADMIN_API_KEY);
  const method = req.method;
  const body = method === "GET" || method === "HEAD" ? undefined : await req.arrayBuffer();
  try {
    const upstream = await fetch(target, { method, headers, body, cache: "no-store" });
    const responseHeaders = new Headers();
    const upstreamType = upstream.headers.get("content-type");
    if (upstreamType) responseHeaders.set("content-type", upstreamType);
    return new NextResponse(await upstream.arrayBuffer(), { status: upstream.status, headers: responseHeaders });
  } catch {
    return NextResponse.json({ error: "ارتباط با بک‌اند برقرار نشد. وضعیت سرور و BACKEND_API_URL را بررسی کنید." }, { status: 502 });
  }
}
export const GET = proxy; export const POST = proxy; export const PUT = proxy; export const PATCH = proxy; export const DELETE = proxy;
