import { useQuery, useQueryClient } from "@tanstack/react-query";
import { askAll, status } from "@/lib/native/permissions";

export function usePermissions() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["permissions"],
    queryFn: async () => ({ camera: await status("camera"), microphone: await status("microphone"), location: await status("location") }),
  });
  const requestAll = async () => {
    const r = await askAll();
    qc.setQueryData(["permissions"], r);
    return r;
  };
  return { ...query, requestAll };
}
