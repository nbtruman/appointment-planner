import { getRedisClient } from "@/lib/redis";

export async function GET(request: Request){
    const client = await getRedisClient();

    const key = 'user1';

    const raw = await client.lRange(key, 0, -1)

    return Response.json(raw);
}

export async function POST(request: Request){
    try {
        const appointment = { id: 3, dateTime: '2025-08-12 09:00', description: "Dentist"}

        const client = await getRedisClient();
        const key = 'user1';

        await client.rPush(key, JSON.stringify(appointment));

        return Response.json(appointment, { status: 201 });
    } catch (error) {
        return Response.json({ error: 'Something went wrong'}, {status: 400});
    }
}