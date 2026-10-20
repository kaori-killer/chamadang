import { useQuery } from "@tanstack/react-query";
import type { LatLng } from "@/lib/native/location";
import { fetchNearbyOwnPlace } from "@/lib/supabase/places";
import { limits } from "@/lib/tokens";

export function useNearbyOwnPlace(position: LatLng | null) {
  return useQuery({
    queryKey: ["nearby-own", position?.lat, position?.lng],
    queryFn: () => fetchNearbyOwnPlace(position!.lat, position!.lng, limits.nearbyMeters),
    enabled: !!position,
    staleTime: 10_000,
  });
}
