import { Linking } from "react-native";
import type { LatLng } from "@/lib/native/location";

export async function openDirections(to: LatLng, name: string) {
  const label = encodeURIComponent(name || "차마당 자리");
  const app = `nmap://route/walk?dlat=${to.lat}&dlng=${to.lng}&dname=${label}&appname=com.sojeong.chamadang`;
  const web = `https://map.naver.com/p/directions/-/${to.lng},${to.lat},${label}/-/walk`;
  const canOpen = await Linking.canOpenURL(app);
  await Linking.openURL(canOpen ? app : web);
}
