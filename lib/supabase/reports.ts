import { supabase } from "./client";

import type { ReportReason } from "@/lib/types";

export type { ReportReason };

export async function reportPlace(reporterId: string, placeId: string, reason: ReportReason) {
  const { error } = await supabase.from("reports").insert({ place_id: placeId, reporter_id: reporterId, reason });
  if (error) throw error;
}
