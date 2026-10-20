import { extractPoster } from "@/lib/native/poster";
import { insertClip, uploadFile } from "@/lib/supabase/clips";
import { insertPlace, type NewPlace } from "@/lib/supabase/places";
import type { RecordedClip } from "@/lib/native/camera";

export type SaveInput = {
  userId: string;
  clip: RecordedClip;
  place: NewPlace;
  attachTo: string | null;
  tea: string | null;
  note: string | null;
};

export type SaveStage = "poster" | "video" | "record";

const stagePercent: Record<SaveStage, number> = { poster: 20, video: 60, record: 90 };

export async function savePlant(input: SaveInput, onStage?: (stage: SaveStage, percent: number) => void) {
  const id = `${Date.now()}`;
  const base = `${input.userId}/${id}`;

  onStage?.("poster", stagePercent.poster);
  const posterUri = await extractPoster(input.clip.uri);
  const posterPath = await uploadFile(`${base}.jpg`, posterUri, "image/jpeg");

  onStage?.("video", stagePercent.video);
  const videoPath = await uploadFile(`${base}.mp4`, input.clip.uri, "video/mp4");

  onStage?.("record", stagePercent.record);
  const placeId = input.attachTo ?? (await insertPlace(input.userId, input.place));
  await insertClip(input.userId, {
    placeId, videoPath, posterPath,
    durationMs: input.clip.durationMs, tea: input.tea, note: input.note, recordedAt: input.clip.recordedAt,
  });
  return placeId;
}
