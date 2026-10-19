import { useQuery } from "@tanstack/react-query";
import { ensureSession } from "@/lib/supabase/auth";

export function useSession() {
  return useQuery({ queryKey: ["session"], queryFn: ensureSession, staleTime: Infinity });
}
