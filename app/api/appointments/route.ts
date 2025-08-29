import { getRedisClient } from "@/lib/redis";
import getAppointments from "@/lib/getAppointments";
import { NextResponse, NextRequest } from "next/server";

export type Appointment = {
    id: string,
    description: string,
    dateTime: string,
}

export type UserData = {
    appointments: Appointment[],
    contacts: [],
}

export async function GET(request: Request){
    const url = new URL(request.url);

    const user = url.searchParams.get('user');
    if (!user) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const userData = await getAppointments(user);

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