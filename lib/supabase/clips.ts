import { supabase } from "./client";
import type { ClipRow } from "./types";

export async function fetchClips(placeId: string): Promise<ClipRow[]> {
  const { data, error } = await supabase
    .from("clips").select("*").eq("place_id", placeId).order("recorded_at", { ascending: false });
  if (error) throw error;
  return data;
}

export type NewClip = {
  placeId: string; videoPath: string; posterPath: string;
  durationMs: number; tea: string | null; note: string | null; recordedAt: string;
};

export async function insertClip(userId: string, c: NewClip) {
  const { error } = await supabase.from("clips").insert({
    place_id: c.placeId, user_id: userId, video_path: c.videoPath, poster_path: c.posterPath,
    duration_ms: c.durationMs, tea: c.tea, note: c.note, source: "camera", recorded_at: c.recordedAt,
  });
  if (error) throw error;
}

export function publicUrl(path: string) {
  return supabase.storage.from("clips").getPublicUrl(path).data.publicUrl;
}

export async function uploadFile(path: string, fileUri: string, contentType: string) {
  const res = await fetch(fileUri);
  const blob = await res.blob();
  const { error } = await supabase.storage.from("clips").upload(path, blob, { contentType, upsert: false });
  if (error) throw error;
  return path;
}
