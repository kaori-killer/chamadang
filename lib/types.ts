export type Visibility = "public" | "private";

export type PlaceRow = {
  id: string;
  user_id: string;
  lat: number;
  lng: number;
  name: string | null;
  tags: string[];
  visibility: Visibility;
  address_short: string | null;
  clip_count: number;
  latest_poster: string | null;
  latest_recorded_at: string | null;
  is_mine: boolean;
};

export type ClipRow = {
  id: string;
  place_id: string;
  user_id: string;
  video_path: string;
  poster_path: string;
  duration_ms: number;
  tea: string | null;
  note: string | null;
  source: "camera" | "gallery";
  recorded_at: string;
};

export type NearbyPlace = { id: string; name: string | null; lat: number; lng: number; latest_poster: string | null };
