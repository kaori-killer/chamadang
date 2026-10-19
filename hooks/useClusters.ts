import { useMemo } from "react";
import type { MapMarker } from "@/components/map/types";
import type { PlaceRow } from "@/lib/supabase/types";
import { distanceMeters } from "@/lib/geo/distance";

const radiusForZoom = (zoom: number) => (zoom >= 16 ? 0 : zoom >= 14 ? 40 : 120);

export function useClusters(places: PlaceRow[], zoom: number, selectedId: string | null): MapMarker[] {
  return useMemo(() => {
    const radius = radiusForZoom(zoom);
    const groups: PlaceRow[][] = [];
    for (const p of places) {
      const g = radius > 0 ? groups.find((g) => distanceMeters({ lat: g[0].lat, lng: g[0].lng }, { lat: p.lat, lng: p.lng }) <= radius) : undefined;
      if (g) g.push(p); else groups.push([p]);
    }
    return groups.map((g) => {
      if (g.length === 1) {
        const p = g[0];
        return { id: p.id, position: { lat: p.lat, lng: p.lng }, kind: p.is_mine ? "mine" : "others", selected: p.id === selectedId };
      }
      return { id: `cluster:${g.map((p) => p.id).join(",")}`, position: { lat: g[0].lat, lng: g[0].lng }, kind: "cluster", count: g.length };
    });
  }, [places, zoom, selectedId]);
}
