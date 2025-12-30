import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

const BIN = path.join(process.cwd(), "face_service/dist/face_login");

function execAsync(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      console.log("TEST STDOUT:", stdout);
      console.log("TEST STDERR:", stderr);

      if (err) reject(err);
      else resolve(stdout);
    });
  });
}

export async function GET(): Promise<Response> {
  try {
    const stdout = await execAsync(BIN);
    const result = JSON.parse(stdout.trim());

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Face test failed" },
      { status: 500 }
    );
  }
}
