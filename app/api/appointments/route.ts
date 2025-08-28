import { getRedisClient } from "@/lib/redis";
import { NextResponse, NextRequest } from "next/server";

export type Appointment = {
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

export async function POST(request: NextRequest){
    const appointment = await request.json();

    const cookieStore = await request.cookies;
    const user = cookieStore.get('userId')?.value;
    
    const client = await getRedisClient();

    let userData = await client.json.get(`user:${user}`) as UserData;

    userData.appointments.push(appointment);

    await client.json.set(`user:${user}`, '$', userData);

    return NextResponse.json({ success: true, appointment, user: user })
}

export async function DELETE(request: NextRequest){
    const url = new URL(request.url);
    const appointmentId = url.searchParams.get('id');
    if (!appointmentId) {
        return NextResponse.json({ error: 'No appointment ID supplied in query string' });
    }

    const cookieStore = await request.cookies;
    const user = cookieStore.get('userId')?.value;
    
    const client = await getRedisClient();

    let userData = await client.json.get(`user:${user}`) as UserData;
    if (!userData) {
        return NextResponse.json({ error: 'Could not get user data' });
    }

    userData.appointments = userData.appointments.filter(appointment => appointment.id!== appointmentId);

    await client.json.set(`user:${user}`, "$", userData);

    return NextResponse.json({ success: true , appointmentId: appointmentId, userId: user });
}