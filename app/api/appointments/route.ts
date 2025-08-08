import { getRedisClient } from "@/lib/redis";
import { Temporal } from '@js-temporal/polyfill'

export async function POST(request: Request){
    try {
        const appointment = { id: 3, dateTime: Temporal.PlainDateTime.from('2025-08-12 09:00'), description: "Dentist"}

        const client = await getRedisClient();
        const key = 'user1';

        await client.rPush(key, JSON.stringify(appointment));

        return Response.json(appointment, { status: 201 });
    } catch (error) {
        return Response.json({ error: 'Something went wrong'}, {status: 400});
    }
}