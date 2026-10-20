import { renderHook } from "@testing-library/react-native";
import { useNearbyOrder } from "@/hooks/useNearbyOrder";
import type { PlaceRow } from "@/lib/types";

const place = (id: string, lat: number, lng: number, at: string): PlaceRow => ({
  id, user_id: "u", lat, lng, name: id, tags: [], visibility: "public", address_short: null,
  clip_count: 1, latest_poster: null, latest_recorded_at: at, is_mine: true,
});
const a = place("a", 37.600, 126.929, "2026-10-01");
const b = place("b", 37.601, 126.929, "2026-10-12");
const c = place("c", 37.620, 126.929, "2026-10-05");

describe("useNearbyOrder", () => {
  it("모두의 마당은 선택한 자리에서 가까운 순", () => {
    const { result } = renderHook(() => useNearbyOrder([c, b, a], "a", "all"));
    expect(result.current.map((p) => p.id)).toEqual(["a", "b", "c"]);
  });
  it("내 마당은 선택한 자리 다음으로 최근 순", () => {
    const { result } = renderHook(() => useNearbyOrder([a, b, c], "a", "mine"));
    expect(result.current.map((p) => p.id)).toEqual(["a", "b", "c"]);
  });
  it("선택이 없으면 빈 배열", () => {
    const { result } = renderHook(() => useNearbyOrder([a, b], null, "all"));
    expect(result.current).toEqual([]);
  });
});
