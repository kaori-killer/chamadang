import * as Location from "expo-location";

export type LatLng = { lat: number; lng: number };

export async function getCurrent(): Promise<LatLng> {
  const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  return { lat: pos.coords.latitude, lng: pos.coords.longitude };
}
