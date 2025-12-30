import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "users.json");

type Remark = {
  text: string;
  date: string;
};

export type User = {
  id: string;
  email: string;

  faceEnabled?: boolean;
  fullName?: string;
  address?: string;
  mobileNumber?: string;
  particulars?: string;
  remarks?: Remark[];
};

type DB = {
  users: User[];
};

export function readDB(): DB {
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw);
}

export function writeDB(data: DB) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}
