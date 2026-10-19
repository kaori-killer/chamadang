import { distanceMeters, formatDistance } from "@/lib/geo/distance";

describe("distanceMeters", () => {
  it("같은 지점은 0", () => {
    expect(distanceMeters({ lat: 37.6, lng: 126.9 }, { lat: 37.6, lng: 126.9 })).toBe(0);
  });
  it("서울시청–남산타워 약 2.4km", () => {
    const d = distanceMeters({ lat: 37.5663, lng: 126.9779 }, { lat: 37.5512, lng: 126.9882 });
    expect(d).toBeGreaterThan(1900);
    expect(d).toBeLessThan(2100);
  });
});

describe("formatDistance", () => {
  it("1km 미만은 m", () => expect(formatDistance(850.4)).toBe("850m"));
  it("1km 이상은 소수 한 자리 km", () => expect(formatDistance(1234)).toBe("1.2km"));
});
