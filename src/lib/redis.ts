import { Redis } from '@upstash/redis'
import type { SetCommandOptions } from '@upstash/redis';
import { env } from '$env/dynamic/private';

const redis = new Redis({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
})

// ion know why i have these but whatever
export async function get(key: string): Promise<string | null> {
    const idk: string | null = await redis.get(key);
    return idk;
}

export async function set(key: string, value: string, opts?: SetCommandOptions | undefined): Promise<string | null> {
    const idk = await redis.set(key, value, opts);
    return idk;
}
