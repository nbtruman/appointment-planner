import type { UserData } from "@/app/api/appointments/route";
import { getRedisClient } from "./redis";

export default async function getAppointments(userId: string) {
    const client = await getRedisClient();

    const key = `user:${userId}`;

    let userData = await client.json.get(key) as UserData | null;

    if (!userData) {
        await client.json.set(key, '$', { appointments: [], contacts: [] });
        userData = { appointments: [], contacts: [] }
    }

    return userData;
}