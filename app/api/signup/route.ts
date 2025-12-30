// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { v4 as uuidv4 } from "uuid";
// import { readDB, writeDB } from "@/lib/db";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   if (!email || !password) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   const db = readDB();

//   const existingUser = db.users.find((u) => u.email === email);

//   if (existingUser) {
//     return NextResponse.json({ error: "User already exists" }, { status: 409 });
//   }

//   const passwordHash = await bcrypt.hash(password, 10);

//   db.users.push({
//     id: uuidv4(),
//     email,
//     passwordHash,
//     goldOwned: 0,
//   });

//   writeDB(db);

//   return NextResponse.json({
//     message: "Signup successful",
//   });
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { readDB, writeDB } from "@/lib/db";
import { setSession } from "@/lib/session";

export async function POST(req: Request) {
  const {
    email,

    fullName,
    address,
    mobileNumber,
    particulars,
    remarks,
  } = await req.json();

  if (
    !email ||
    !fullName ||
    !address ||
    !mobileNumber ||
    !particulars ||
    !remarks
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const db = readDB();

  if (db.users.some((u) => u.fullName === fullName)) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const userId = uuidv4();
  // const passwordHash = await bcrypt.hash(password, 10);

  db.users.push({
    id: userId,
    email,

    fullName,
    address,
    mobileNumber,
    particulars,
    remarks,
  });

  writeDB(db);
  await setSession(userId);

  return NextResponse.json({
    message: "Signup successful",
  });
}
