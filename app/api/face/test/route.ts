import { NextResponse } from "next/server";
import { exec } from "child_process";

export async function GET() {
  return new Promise((resolve) => {
    exec("python3 ./face_service/face_login.py", (err, stdout) => {
      if (err) {
        resolve(NextResponse.json({ error: err.message }));
        return;
      }
      resolve(NextResponse.json({ result: stdout.trim() }));
    });
  });
}
