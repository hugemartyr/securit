// import { NextResponse } from "next/server";
// import { exec } from "child_process";
// import path from "path";
// import { setSession } from "@/lib/session";

// const PYTHON = path.join(process.cwd(), "face_service/venv/bin/python");

// const SCRIPT = path.join(process.cwd(), "face_service/face_login.py");

// export async function POST() {
//   return new Promise((resolve) => {
//     const BIN = path.join(process.cwd(), "face_service/dist/face_login");

//     exec(BIN, async (err, stdout, stderr) => {
//       console.log("PY LOGIN STDOUT:", stdout);
//       console.log("PY LOGIN STDERR:", stderr);

//       if (err) {
//         resolve(NextResponse.json({ success: false, error: "PYTHON_ERROR" }));
//         return;
//       }

//       try {
//         const result = JSON.parse(stdout.trim());

//         if (result.success === true && result.userId) {
//           await setSession(result.userId);
//           resolve(NextResponse.json({ success: true }));
//           return;
//         }
//       } catch (e) {
//         console.error("JSON parse failed:", e);
//       }

//       resolve(NextResponse.json({ success: false }));
//     });
//   });
// }
import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { setSession } from "@/lib/session";

const BIN = path.join(process.cwd(), "face_service/dist/face_login");

function execAsync(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      console.log("LOGIN STDOUT:", stdout);
      console.log("LOGIN STDERR:", stderr);

      if (err) reject(err);
      else resolve(stdout);
    });
  });
}

export async function POST(): Promise<Response> {
  try {
    const stdout = await execAsync(BIN);
    const result = JSON.parse(stdout.trim());

    if (result.success && result.userId) {
      await setSession(result.userId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Face login failed" },
      { status: 500 }
    );
  }
}
