// import { NextResponse } from "next/server";
// import { readDB, writeDB } from "@/lib/db";
// import { getSession } from "@/lib/session";

// export async function POST(req: Request) {
//   const sessionUserId = await getSession();
//   if (!sessionUserId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { remark } = await req.json();
//   if (!remark) {
//     return NextResponse.json({ error: "Missing remark" }, { status: 400 });
//   }

//   const db = readDB();
//   const user = db.users.find((u) => u.id === sessionUserId);

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   // Auto-migrate old format
//   if (!Array.isArray(user.remarks)) {
//     user.remarks = user.remarks
//       ? [{ text: user.remarks, date: new Date().toISOString() }]
//       : [];
//   }

//   user.remarks.push({
//     text: remark,
//     date: new Date().toISOString(),
//   });

//   writeDB(db);

//   return NextResponse.json({ success: true });
// }

import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { getSession } from "@/lib/session";

/* ---------------- GET: Fetch user profile ---------------- */
export async function GET() {
  const sessionUserId = await getSession();

  if (!sessionUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = readDB();
  const user = db.users.find((u) => u.id === sessionUserId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Normalize remarks format
  if (!Array.isArray(user.remarks)) {
    user.remarks = user.remarks
      ? [{ text: user.remarks, date: new Date().toISOString() }]
      : [];
    writeDB(db);
  }

  return NextResponse.json(user);
}

/* ---------------- POST: Add a remark ---------------- */
export async function POST(req: Request) {
  const sessionUserId = await getSession();

  if (!sessionUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { remark } = await req.json();

  if (!remark) {
    return NextResponse.json({ error: "Missing remark" }, { status: 400 });
  }

  const db = readDB();
  const user = db.users.find((u) => u.id === sessionUserId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!Array.isArray(user.remarks)) {
    user.remarks = [];
  }

  user.remarks.push({
    text: remark,
    date: new Date().toISOString(),
  });

  writeDB(db);

  return NextResponse.json({ success: true });
}
