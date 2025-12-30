// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { readDB } from "@/lib/db";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   if (!email || !password) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   const db = readDB();

//   const user = db.users.find((u) => u.email === email);

//   if (!user) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const isValid = await bcrypt.compare(password, user.passwordHash);

//   if (!isValid) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   return NextResponse.json({
//     message: "Login successful",
//     user: {
//       email: user.email,
//       goldOwned: user.goldOwned,
//     },
//   });
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readDB } from "@/lib/db";
import { setSession } from "@/lib/session";

export async function POST(req: Request) {
  const { fullName } = await req.json();

  if (!fullName) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const db = readDB();

  const user = db.users.find((u) => u.fullName === fullName);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // const valid = await bcrypt.compare(password, user.passwordHash);

  // if (!valid) {
  //   return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  // }

  await setSession(user.id);

  return NextResponse.json({
    message: "Login successful",
  });
}
