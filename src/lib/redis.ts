import { Redis } from '@upstash/redis'
import type { SetCommandOptions } from '@upstash/redis';
import { env } from '$env/dynamic/private';

const redis = new Redis({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
})

export async function get(key: string): Promise<string | null> {
    const result: string | null = await redis.get(key);
    return result;
}

export async function set(key: string, value: string, prefix?: string | undefined, opts?: SetCommandOptions | undefined): Promise<string | null> {
    key = prefix ? `${prefix}:${key}` : key;
    const result = await redis.set(key, value, opts);
    return result;
}
