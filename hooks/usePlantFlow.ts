import { create } from "zustand";
import type { RecordedClip } from "@/lib/native/camera";
import type { LatLng } from "@/lib/native/location";
import type { Address } from "@/lib/geo/reverseGeocode";
import type { Visibility } from "@/lib/types";

type Note = { tags: string[]; tea: string; note: string; visibility: Visibility };

type PlantFlow = {
  clip: RecordedClip | null;
  position: LatLng | null;
  address: Address | null;
  placeName: string;
  attachTo: string | null;
  note: Note;
  setClip: (c: RecordedClip | null) => void;
  setLocation: (p: LatLng, a: Address | null) => void;
  setPlaceName: (n: string) => void;
  setAttachTo: (id: string | null) => void;
  setNote: (patch: Partial<Note>) => void;
  reset: () => void;
};

const empty = { clip: null, position: null, address: null, placeName: "", attachTo: null, note: { tags: [], tea: "", note: "", visibility: "public" as Visibility } };

export const usePlantFlow = create<PlantFlow>((set) => ({
  ...empty,
  setClip: (clip) => set({ clip }),
  setLocation: (position, address) => set({ position, address }),
  setPlaceName: (placeName) => set({ placeName }),
  setAttachTo: (attachTo) => set({ attachTo }),
  setNote: (patch) => set((s) => ({ note: { ...s.note, ...patch } })),
  reset: () => set(empty),
}));
