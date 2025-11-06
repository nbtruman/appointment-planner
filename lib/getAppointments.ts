import type { UserData } from "@/app/api/appointments/route";
import { redis } from "./redis";

export default async function getAppointments(userId: string) {
  const key = `user:${userId}`;

  let userData = await redis.json.get<UserData>(key);

  if (!userData) {
    await redis.json.set(key, "$", { appointments: [], contacts: [] });
    userData = { appointments: [], contacts: [] };
  }

  return userData;
}
