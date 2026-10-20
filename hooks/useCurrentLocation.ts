import { useQuery } from "@tanstack/react-query";
import { getCurrent } from "@/lib/native/location";

export function useCurrentLocation() {
  return useQuery({ queryKey: ["current-location"], queryFn: getCurrent, staleTime: 30_000, retry: 1 });
}
