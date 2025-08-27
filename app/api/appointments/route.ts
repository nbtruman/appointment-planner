import { getRedisClient } from "@/lib/redis";
import { NextResponse } from "next/server";

type Appointment = {
    id: string,
    title: string,
    dateTime: string,
}

type UserData = {
    appointments: Appointment[],
    contacts: [],
}

export async function GET(request: Request){
    const client = await getRedisClient();
    const url = new URL(request.url);

    const user = url.searchParams.get('user');
    if (!user) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const key = `user:${user}`;

    let userData = await client.json.get(key) as UserData | null;

    if (!userData) {
        await client.json.set(key, '$', { appointments: [], contacts: [] });
        userData = { appointments: [], contacts: [] }
    }

    return NextResponse.json(userData.appointments);
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