import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlace } from "@/lib/supabase/places";
import { reportPlace, type ReportReason } from "@/lib/supabase/reports";
import { success } from "@/lib/native/haptics";
import { useSession } from "./useSession";

export function usePlaceActions() {
  const qc = useQueryClient();
  const session = useSession();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["places"] });

  const remove = useMutation({ mutationFn: deletePlace, onSuccess: () => { success(); invalidate(); } });
  const report = useMutation({
    mutationFn: ({ placeId, reason }: { placeId: string; reason: ReportReason }) => reportPlace(session.data!.user.id, placeId, reason),
    onSuccess: () => { success(); invalidate(); },
  });
  return { remove, report };
}
