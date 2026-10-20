import { readJson, writeJson } from "@/lib/storage/kv";
import { savePlant, type SaveInput } from "./savePlant";

const KEY = "upload-queue";

export type QueuedPlant = SaveInput & { queuedAt: string };

export const readQueue = () => readJson<QueuedPlant[]>(KEY, []);

export async function enqueue(input: SaveInput) {
  const q = await readQueue();
  q.push({ ...input, queuedAt: new Date().toISOString() });
  await writeJson(KEY, q);
  return q.length;
}

export async function flushQueue(): Promise<{ done: number; left: number }> {
  const q = await readQueue();
  let done = 0;
  const left: QueuedPlant[] = [];
  for (const item of q) {
    try { await savePlant(item); done += 1; } catch { left.push(item); }
  }
  await writeJson(KEY, left);
  return { done, left: left.length };
}
