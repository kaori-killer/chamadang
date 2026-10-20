import { act, renderHook } from "@testing-library/react-native";
import { useReverseGeocode } from "@/hooks/useReverseGeocode";
import * as geo from "@/lib/geo/reverseGeocode";

jest.useFakeTimers();

describe("useReverseGeocode", () => {
  afterEach(() => jest.restoreAllMocks());

  it("디바운스 후 주소를 받아온다", async () => {
    jest.spyOn(geo, "reverseGeocode").mockResolvedValue({ short: "은평구 불광동", full: "서울 은평구 불광동 1" });
    const { result } = renderHook(() => useReverseGeocode({ lat: 37.6, lng: 126.9 }, 300));
    expect(result.current.status).toBe("loading");
    await act(async () => { jest.advanceTimersByTime(300); });
    expect(result.current).toEqual({ status: "done", address: { short: "은평구 불광동", full: "서울 은평구 불광동 1" } });
  });
  it("주소가 없으면 failed", async () => {
    jest.spyOn(geo, "reverseGeocode").mockResolvedValue(null);
    const { result } = renderHook(() => useReverseGeocode({ lat: 37.6, lng: 126.9 }, 0));
    await act(async () => { jest.advanceTimersByTime(0); });
    expect(result.current.status).toBe("failed");
  });
  it("위치가 바뀌면 이전 응답은 버린다", async () => {
    const spy = jest.spyOn(geo, "reverseGeocode").mockImplementation(async ({ lat }) => ({ short: `위치 ${lat}`, full: "" }));
    const { result, rerender } = renderHook(({ p }: { p: { lat: number; lng: number } }) => useReverseGeocode(p, 100), { initialProps: { p: { lat: 1, lng: 1 } } });
    rerender({ p: { lat: 2, lng: 2 } });
    await act(async () => { jest.advanceTimersByTime(100); });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.current.address?.short).toBe("위치 2");
  });
});
