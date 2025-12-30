import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { setSession } from "@/lib/session";

const PYTHON = path.join(process.cwd(), "face_service/venv/bin/python");

const SCRIPT = path.join(process.cwd(), "face_service/face_login.py");

export async function POST() {
  return new Promise((resolve) => {
    exec(`${PYTHON} ${SCRIPT}`, async (err, stdout, stderr) => {
      console.log("PY LOGIN STDOUT:", stdout);
      console.log("PY LOGIN STDERR:", stderr);

      if (err) {
        resolve(NextResponse.json({ success: false, error: "PYTHON_ERROR" }));
        return;
      }

      try {
        const result = JSON.parse(stdout.trim());

        if (result.success === true && result.userId) {
          await setSession(result.userId);
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
