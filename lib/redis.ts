import { createClient } from "redis";

declare global {
  var __redisClient: ReturnType<typeof createClient> | undefined;
}

const url = process.env.REDIS_URL ?? 'redis://localhost:6379';

export async function getRedisClient() {
  if (global.__redisClient && global.__redisClient.isReady) {
    return global.__redisClient;
  }

  const client = createClient({ url });

  client.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  await client.connect();

  if (process.env.NODE_ENV !== 'production') {
    global.__redisClient = client;
  }

  return client;
}
