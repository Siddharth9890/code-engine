import { customAlphabet } from "nanoid";
import { client } from "./setupPublisherAndSubscriber.js";

const nanoid = customAlphabet("abcdefghijklmnopqurstuvwxyz", 10);

export async function submitCodeToRedis(code) {
  const id = nanoid();
  const submission = {
    code,
    id,
  };
  try {
    const result = await client.publish("codes", JSON.stringify(submission));
    if (result === 1) return id;
    else return -1;
  } catch (error) {
    console.log("Something went wrong");
  }
}
