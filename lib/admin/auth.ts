import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_session";

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function isPassphraseConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSPHRASE);
}

export function verifyPassphrase(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSPHRASE;
  if (!expected) return false;
  const a = Buffer.from(hash(candidate));
  const b = Buffer.from(hash(expected));
  return timingSafeEqual(a, b);
}

export async function createAdminSession() {
  const passphrase = process.env.ADMIN_PASSPHRASE!;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, hash(passphrase), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = process.env.ADMIN_PASSPHRASE;
  if (!expected) return false;
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return false;
  const a = Buffer.from(session);
  const b = Buffer.from(hash(expected));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function requireAdmin() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");
}
