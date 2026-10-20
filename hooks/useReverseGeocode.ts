import { useEffect, useRef, useState } from "react";
import type { LatLng } from "@/lib/native/location";
import { reverseGeocode, type Address } from "@/lib/geo/reverseGeocode";

export type GeocodeState = { status: "idle" | "loading" | "done" | "failed"; address: Address | null };

export function useReverseGeocode(position: LatLng | null, delayMs = 300): GeocodeState {
  const [state, setState] = useState<GeocodeState>({ status: "idle", address: null });
  const seq = useRef(0);

  const lat = position?.lat;
  const lng = position?.lng;

  useEffect(() => {
    if (lat === undefined || lng === undefined) return;
    const id = ++seq.current;
    setState((s) => ({ ...s, status: "loading" }));
    const timer = setTimeout(async () => {
      try {
        const address = await reverseGeocode({ lat, lng });
        if (id !== seq.current) return;
        setState({ status: address ? "done" : "failed", address });
      } catch {
        if (id === seq.current) setState({ status: "failed", address: null });
      }
    }, delayMs);
    return () => clearTimeout(timer);
  }, [lat, lng, delayMs]);

  return state;
}
