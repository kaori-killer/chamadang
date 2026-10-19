import type { CameraView } from "expo-camera";
import { limits } from "@/lib/tokens";

export type RecordedClip = { uri: string; durationMs: number; recordedAt: string };

export async function recordClip(camera: CameraView): Promise<RecordedClip> {
  const started = new Date().toISOString();
  const result = await camera.recordAsync({ maxDuration: limits.clipMs / 1000 });
  if (!result?.uri) throw new Error("recording_failed");
  return { uri: result.uri, durationMs: limits.clipMs, recordedAt: started };
}

export function stopRecording(camera: CameraView) {
  camera.stopRecording();
}
