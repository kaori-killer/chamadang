import { useQuery, useQueryClient } from "@tanstack/react-query";
import { readFlag, writeFlag } from "@/lib/storage/kv";

const KEY = "onboarded";

export function useOnboarded() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["onboarded"], queryFn: () => readFlag(KEY), staleTime: Infinity });
  const markDone = async () => { await writeFlag(KEY); qc.setQueryData(["onboarded"], true); };
  return { ...query, markDone };
}
