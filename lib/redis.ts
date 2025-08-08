import { createClient, RedisClientType } from "redis";

declare global {
    // eslint-disable-next-line
    var __redisClient: RedisClientType | undefined;
}

const url = process.env.REDIS_URL ?? 'redis://localhost:6379';

export async function getRedisClient(): Promise<RedisClientType> {
    if (global.__redisClient && (global.__redisClient as any).isReady) {
        return global.__redisClient;
    }


    const client = createClient({ url });

    client.on('error', (err) => {
        console.error('Redis Client Error', err);
    });

    await client.connect();

    // store a global reference in dev so HMR won't create multiple clients
    if (process.env.NODE_ENV !== 'production') {
        // @ts-ignore
        global.__redisClient = client;
    }

    return client;
}