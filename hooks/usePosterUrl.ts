import { useCallback } from "react";
import { publicUrl } from "@/lib/supabase/clips";

export function usePosterUrl() {
  return useCallback((path: string) => publicUrl(path), []);
}
