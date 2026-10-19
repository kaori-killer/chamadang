import { supabase } from "./client";

export type ReportReason = "not_tea_spot" | "privacy" | "harmful" | "other";

export async function reportPlace(reporterId: string, placeId: string, reason: ReportReason) {
  const { error } = await supabase.from("reports").insert({ place_id: placeId, reporter_id: reporterId, reason });
  if (error) throw error;
}
