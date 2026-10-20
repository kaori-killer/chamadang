import { create } from "zustand";

export type MapMode = "all" | "mine";
export type CardState = "none" | "expanded" | "collapsed" | "fullscreen";

type UiState = {
  mode: MapMode;
  card: CardState;
  selectedPlaceId: string | null;
  clusterIds: string[] | null;
  openCluster: (ids: string[]) => void;
  setMode: (m: MapMode) => void;
  openCard: (placeId: string) => void;
  collapseCard: () => void;
  expandCard: () => void;
  closeCard: () => void;
  setFullscreen: (on: boolean) => void;
};

export const useUi = create<UiState>((set) => ({
  mode: "all",
  card: "none",
  selectedPlaceId: null,
  clusterIds: null,
  openCluster: (clusterIds) => set({ clusterIds, card: "none", selectedPlaceId: null }),
  setMode: (mode) => set({ mode, card: "none", selectedPlaceId: null, clusterIds: null }),
  openCard: (selectedPlaceId) => set({ selectedPlaceId, card: "expanded", clusterIds: null }),
  collapseCard: () => set((s) => (s.card === "expanded" ? { card: "collapsed" } : {})),
  expandCard: () => set((s) => (s.selectedPlaceId ? { card: "expanded" } : {})),
  closeCard: () => set({ card: "none", selectedPlaceId: null, clusterIds: null }),
  setFullscreen: (on) => set((s) => ({ card: on ? "fullscreen" : s.selectedPlaceId ? "expanded" : "none" })),
}));
