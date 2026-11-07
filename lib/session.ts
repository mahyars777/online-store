import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
export const COOKIE = "store_admin_session";
const secret = () => process.env.SESSION_SECRET || "development-only-secret-change-me";
const sign = (value: string) => createHmac("sha256", secret()).update(value).digest("hex");
export function createSession() {
  const timestamp = String(Date.now());
  const nonce = sign(`nonce:${timestamp}`);
  const payload = `${timestamp}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}
export async function hasAdminSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [timestamp, nonce, signature] = parts;
  const payload = `${timestamp}.${nonce}`;
  try {
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(sign(payload)))) return false;
  } catch { return false; }
  return nonce === sign(`nonce:${timestamp}`) && Date.now() - Number(timestamp) < 8 * 60 * 60 * 1000 && Number(timestamp) <= Date.now();
}
