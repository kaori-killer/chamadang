import { supabase } from "./client";
import type { PlaceRow, Visibility } from "./types";

export type Bounds = { sw: { lat: number; lng: number }; ne: { lat: number; lng: number } };
export type PlaceMode = "all" | "mine";

export async function fetchPlacesInBounds(bounds: Bounds, mode: PlaceMode): Promise<PlaceRow[]> {
  const { data, error } = await supabase.rpc("places_in_bounds", {
    sw_lat: bounds.sw.lat, sw_lng: bounds.sw.lng, ne_lat: bounds.ne.lat, ne_lng: bounds.ne.lng, mode,
  });
  if (error) throw error;
  return data;
}

export async function fetchNearbyOwnPlace(lat: number, lng: number, meters: number) {
  const { data, error } = await supabase.rpc("nearby_own_place", { lat, lng, meters });
  if (error) throw error;
  return data[0] ?? null;
}

export type NewPlace = {
  lat: number; lng: number; name: string | null; tags: string[];
  visibility: Visibility; addressShort: string | null; addressFull: string | null;
};

export async function insertPlace(userId: string, p: NewPlace) {
  const { data, error } = await supabase
    .from("places")
    .insert({
      user_id: userId,
      location: `SRID=4326;POINT(${p.lng} ${p.lat})`,
      name: p.name, tags: p.tags, visibility: p.visibility,
      address_short: p.addressShort, address_full: p.addressFull,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

export async function deletePlace(id: string) {
  const { error } = await supabase.from("places").delete().eq("id", id);
  if (error) throw error;
}
