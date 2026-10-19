import { renderHook } from "@testing-library/react-native";
import { useClusters } from "@/hooks/useClusters";
import type { PlaceRow } from "@/lib/supabase/types";

const place = (id: string, lat: number, lng: number, mine = false): PlaceRow => ({
  id, user_id: "u", lat, lng, name: null, tags: [], visibility: "public", address_short: null,
  clip_count: 1, latest_poster: null, latest_recorded_at: null, is_mine: mine,
});

describe("useClusters", () => {
  const a = place("a", 37.6000, 126.9290);
  const b = place("b", 37.6001, 126.9291);
  const c = place("c", 37.6100, 126.9400, true);

  it("줌 16 이상은 묶지 않음", () => {
    const { result } = renderHook(() => useClusters([a, b, c], 16, null));
    expect(result.current).toHaveLength(3);
  });
  it("줌 14에서 40m 안은 하나로 묶고 개수 표시", () => {
    const { result } = renderHook(() => useClusters([a, b, c], 14, null));
    const cluster = result.current.find((m) => m.kind === "cluster");
    expect(result.current).toHaveLength(2);
    expect(cluster?.count).toBe(2);
  });
  it("내 핀은 mine, 선택된 핀은 selected", () => {
    const { result } = renderHook(() => useClusters([a, c], 16, "a"));
    expect(result.current.find((m) => m.id === "c")?.kind).toBe("mine");
    expect(result.current.find((m) => m.id === "a")?.selected).toBe(true);
  });
});
