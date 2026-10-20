import { useQuery } from "@tanstack/react-query";
import { fetchClips } from "@/lib/supabase/clips";

export function useClips(placeId: string | null) {
  return useQuery({
    queryKey: ["clips", placeId],
    queryFn: () => fetchClips(placeId!),
    enabled: !!placeId,
    staleTime: 60_000,
  });
}
