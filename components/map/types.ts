import type { LatLng } from "@/lib/native/location";

export type Region = { center: LatLng; zoom: number };
export type MapBounds = { sw: LatLng; ne: LatLng };

export type MapMarker = {
  id: string;
  position: LatLng;
  kind: "mine" | "others" | "cluster";
  count?: number;
  selected?: boolean;
};

export type MapViewProps = {
  initialRegion: Region;
  markers: MapMarker[];
  onMarkerPress?: (id: string) => void;
  onMapPress?: () => void;
  onRegionChange?: (region: Region, bounds: MapBounds) => void;
  onRegionChangeIdle?: (region: Region, bounds: MapBounds) => void;
  showsUserLocation?: boolean;
  bottomInset?: number;
};

export type MapHandle = {
  animateTo: (center: LatLng, zoom?: number) => void;
  getCenter: () => LatLng;
};
