import type { LatLng } from "@/lib/native/location";

export type Address = { short: string; full: string };

const endpoint = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc";

export async function reverseGeocode({ lat, lng }: LatLng): Promise<Address | null> {
  const params = new URLSearchParams({ coords: `${lng},${lat}`, orders: "legalcode,addr", output: "json" });
  const res = await fetch(`${endpoint}?${params}`, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.EXPO_PUBLIC_NAVER_GEOCODE_CLIENT_ID!,
      "X-NCP-APIGW-API-KEY": process.env.EXPO_PUBLIC_NAVER_GEOCODE_CLIENT_SECRET!,
    },
  });
  if (!res.ok) return null;
  const json = await res.json();
  const legal = json.results?.find((r: any) => r.name === "legalcode");
  const addr = json.results?.find((r: any) => r.name === "addr");
  if (!legal) return null;
  const gu = legal.region.area2.name;
  const dong = legal.region.area3.name;
  const number = addr?.land?.number1 ? ` ${addr.land.number1}${addr.land.number2 ? "-" + addr.land.number2 : ""}` : "";
  return { short: `${gu} ${dong}`, full: `${legal.region.area1.name} ${gu} ${dong}${number}` };
}
