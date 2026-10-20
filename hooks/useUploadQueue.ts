import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { enqueue, flushQueue, readQueue } from "@/lib/upload/queue";
import type { SaveInput } from "@/lib/upload/savePlant";
import { useNetwork } from "./useNetwork";

export function useUploadQueue() {
  const online = useNetwork();
  const qc = useQueryClient();
  const [pending, setPending] = useState(0);
  const [flushing, setFlushing] = useState(false);

  const refresh = useCallback(async () => setPending((await readQueue()).length), []);

  const add = useCallback(async (input: SaveInput) => { setPending(await enqueue(input)); }, []);

  const flush = useCallback(async () => {
    if (flushing) return;
    setFlushing(true);
    try {
      const r = await flushQueue();
      setPending(r.left);
      if (r.done > 0) qc.invalidateQueries({ queryKey: ["places"] });
    } finally { setFlushing(false); }
  }, [flushing, qc]);

  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => { if (online && pending > 0) flush(); }, [online, pending, flush]);

  return { pending, flushing, add };
}
