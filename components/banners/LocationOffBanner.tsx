import { MapPinOff } from "lucide-react-native";
import { Banner } from "./Banner";
import { colors } from "@/lib/tokens";

export function LocationOffBanner({ onEnable }: { onEnable: () => void }) {
  return <Banner tone="light" icon={<MapPinOff size={20} color={colors.brownDeep} />} title="위치 권한이 꺼져 있어요" sub="둘러보기는 돼요. 심을 땐 필요해요" action={{ label: "켜기", onPress: onEnable }} />;
}
