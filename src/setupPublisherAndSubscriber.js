import { createClient } from "redis";

export const client = createClient();
export const subscriber = client.duplicate();

export async function connectRedis() {
  await client.connect();
  await subscriber.connect();
}
