import { cookies } from "next/headers";

const SESSION_COOKIE = "gold_trader_session";

// 1. Make the function async
export async function setSession(userId: string) {
  const cookieStore = await cookies(); // 2. Await the cookies() promise
  cookieStore.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
