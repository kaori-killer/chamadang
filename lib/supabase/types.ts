import type { ClipRow, NearbyPlace, PlaceRow, Visibility } from "@/lib/types";

export type { ClipRow, NearbyPlace, PlaceRow, Visibility };

type PlaceTable = {
  id: string;
  user_id: string;
  location: string;
  name: string | null;
  tags: string[];
  visibility: Visibility;
  address_short: string | null;
  address_full: string | null;
  created_at: string;
  updated_at: string;
};

type ReportTable = {
  id: string;
  place_id: string;
  reporter_id: string;
  reason: string;
  created_at: string;
};

type Insertable<T, Optional extends keyof T> = Omit<T, Optional> & Partial<Pick<T, Optional>>;

export type Database = {
  public: {
    Tables: {
      places: {
        Row: PlaceTable;
        Insert: Insertable<PlaceTable, "id" | "created_at" | "updated_at" | "tags" | "visibility" | "name" | "address_short" | "address_full">;
        Update: Partial<PlaceTable>;
        Relationships: [];
      };
      clips: {
        Row: ClipRow;
        Insert: Insertable<ClipRow, "id" | "duration_ms" | "source" | "tea" | "note" | "recorded_at">;
        Update: Partial<ClipRow>;
        Relationships: [];
      };
      reports: {
        Row: ReportTable;
        Insert: Insertable<ReportTable, "id" | "created_at">;
        Update: Partial<ReportTable>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      places_in_bounds: {
        Args: { sw_lat: number; sw_lng: number; ne_lat: number; ne_lng: number; mode?: string };
        Returns: PlaceRow[];
      };
      delete_my_account: { Args: Record<string, never>; Returns: undefined };
      my_place_count: { Args: Record<string, never>; Returns: number };
      nearby_own_place: {
        Args: { lat: number; lng: number; meters?: number };
        Returns: NearbyPlace[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
