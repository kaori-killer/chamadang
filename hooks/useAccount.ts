import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { countMyPlaces, deleteMyAccount, linkProvider, linkedProviders, type LinkProvider } from "@/lib/supabase/account";
import { success } from "@/lib/native/haptics";

export function useAccount() {
  const qc = useQueryClient();
  const providers = useQuery({ queryKey: ["identities"], queryFn: linkedProviders });
  const placeCount = useQuery({ queryKey: ["my-place-count"], queryFn: countMyPlaces });
  const link = useMutation({
    mutationFn: (p: LinkProvider) => linkProvider(p),
    onSuccess: () => { success(); qc.invalidateQueries({ queryKey: ["identities"] }); },
  });
  const remove = useMutation({ mutationFn: deleteMyAccount, onSuccess: () => qc.clear() });
  return { providers, placeCount, link, remove };
}
