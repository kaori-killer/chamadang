import { useQuery } from "@tanstack/react-query";
import { fetchPlacesInBounds, type Bounds, type PlaceMode } from "@/lib/supabase/places";

export function usePlaces(bounds: Bounds | null, mode: PlaceMode) {
  return useQuery({
    queryKey: ["places", mode, bounds],
    queryFn: () => fetchPlacesInBounds(bounds!, mode),
    enabled: !!bounds,
    staleTime: 30_000,
  });
}
