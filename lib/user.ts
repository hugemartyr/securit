import { readDB } from "@/lib/db";

export function getUserById(userId: string) {
  const db = readDB();
  return db.users.find((u) => u.id === userId);
}
