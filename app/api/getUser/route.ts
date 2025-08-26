import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    let userId = cookieStore.get('userId')?.value;

    if (!userId) {
        userId = crypto.randomUUID();
        cookieStore.set('userId', userId, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
        })
    }
    return NextResponse.json(userId);
}