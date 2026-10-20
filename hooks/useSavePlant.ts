import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePlant, type SaveInput } from "@/lib/upload/savePlant";

export function useSavePlant() {
  const qc = useQueryClient();
  const [percent, setPercent] = useState(0);
  const mutation = useMutation({
    mutationFn: (input: SaveInput) => savePlant(input, (_, p) => setPercent(p)),
    onSuccess: () => {
      setPercent(100);
      qc.invalidateQueries({ queryKey: ["places"] });
    },
    onError: () => setPercent(0),
  });
  return { ...mutation, percent };
}
