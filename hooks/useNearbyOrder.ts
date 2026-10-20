import { useMemo } from "react";
import type { PlaceRow } from "@/lib/types";
import type { MapMode } from "@/store/ui";
import { distanceMeters } from "@/lib/geo/distance";

export function useNearbyOrder(places: PlaceRow[], selectedId: string | null, mode: MapMode): PlaceRow[] {
  return useMemo(() => {
    if (!selectedId) return [];
    const origin = places.find((p) => p.id === selectedId);
    if (!origin) return [];
    const rest = places.filter((p) => p.id !== selectedId);
    const sorted =
      mode === "mine"
        ? rest.sort((a, b) => (b.latest_recorded_at ?? "").localeCompare(a.latest_recorded_at ?? ""))
        : rest.sort((a, b) => distanceMeters(origin, a) - distanceMeters(origin, b));
    return [origin, ...sorted];
  }, [places, selectedId, mode]);
}
