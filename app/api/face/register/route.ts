// import { NextResponse } from "next/server";
// import { exec } from "child_process";
// import { readDB, writeDB } from "@/lib/db";

// export async function POST(req: Request) {
//   const { userId } = await req.json();

//   return new Promise((resolve) => {
//     exec(
//       `/opt/homebrew/bin/python3.10 face_service/face_register.py ${userId}`,
//       (err, stdout, stderr) => {
//         console.log("PYTHON STDOUT:", stdout);
//         console.log("PYTHON STDERR:", stderr);

//         try {
//           const result = JSON.parse(stdout.trim());

//           if (result.success) {
//             const db = readDB();
//             const user = db.users.find((u) => u.id === userId);
//             if (user) user.faceEnabled = true;
//             writeDB(db);

//             resolve(NextResponse.json({ success: true }));
//             return;
//           }
//         } catch {}

//         resolve(NextResponse.json({ success: false }));
//       }
//     );
//   });
// }

import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { readDB, writeDB } from "@/lib/db";

const PYTHON = path.join(process.cwd(), "face_service/venv/bin/python");

const SCRIPT = path.join(process.cwd(), "face_service/face_register.py");

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ success: false, error: "NO_USER_ID" });
  }

  return new Promise((resolve) => {
    exec(`${PYTHON} ${SCRIPT} ${userId}`, (err, stdout, stderr) => {
      console.log("PY REGISTER STDOUT:", stdout);
      console.log("PY REGISTER STDERR:", stderr);

      if (err) {
        resolve(NextResponse.json({ success: false, error: "PYTHON_ERROR" }));
        return;
      }

      // const result = JSON.parse(stdout.trim());

      const lines = stdout.trim().split("\n");
      const lastLine = lines[lines.length - 1]; // Get the very last line printed

      try {
        const result = JSON.parse(lastLine);
        if (result.success === true) {
          const db = readDB();
          const user = db.users.find((u) => u.id === userId);

          if (user) {
            user.faceEnabled = true;
            writeDB(db);
          }

          resolve(NextResponse.json({ success: true }));
          return;
        }
      } catch (e) {
        console.error("JSON parse failed:", e);
      }

      resolve(NextResponse.json({ success: false }));
    });
  });
}
