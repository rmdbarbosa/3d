import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "fourverticals_admin_session";
const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
const SESSION_PAYLOAD = "admin-gallery";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
}

function safeCompare(value: string, expectedValue: string) {
  const valueBuffer = Buffer.from(value);
  const expectedValueBuffer = Buffer.from(expectedValue);

  if (valueBuffer.length !== expectedValueBuffer.length) {
    return false;
  }

  return timingSafeEqual(valueBuffer, expectedValueBuffer);
}

function createSessionSignature(secret: string) {
  return createHmac("sha256", secret).update(SESSION_PAYLOAD).digest("hex");
}

export function isAdminAuthConfigured() {
  return Boolean(getAdminPassword() && getAdminSessionSecret());
}

export function verifyAdminPassword(password: string) {
  const adminPassword = getAdminPassword();

  if (!adminPassword) {
    return false;
  }

  return safeCompare(password, adminPassword);
}

export async function createAdminSession() {
  const secret = getAdminSessionSecret();

  if (!secret) {
    return false;
  }

  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, createSessionSignature(secret), {
    httpOnly: true,
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return true;
}

export async function isAdminAuthenticated() {
  const secret = getAdminSessionSecret();

  if (!secret) {
    return false;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE);

  if (!sessionCookie) {
    return false;
  }

  return safeCompare(sessionCookie.value, createSessionSignature(secret));
}
