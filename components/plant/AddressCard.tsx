import { Text, View } from "react-native";
import { CircleAlert, MapPin } from "lucide-react-native";
import { colors } from "@/lib/tokens";
import type { Address } from "@/lib/geo/reverseGeocode";

type Props = { address: Address | null; failed: boolean };

export function AddressCard({ address, failed }: Props) {
  if (failed) {
    return (
      <View role="status" className="flex-row items-center gap-3 rounded-btn-card border border-[#D9C4AC] bg-brown-soft px-3.5 py-3">
        <CircleAlert size={20} color={colors.brownDeep} />
        <View className="flex-1 gap-0.5">
          <Text className="font-body text-[15px] font-bold text-ink">주소를 못 찾았어요</Text>
          <Text className="font-body text-[12px] text-brown-deep">산이나 물가는 주소가 없기도 해요</Text>
        </View>
      </View>
    );
  }
  return (
    <View className="flex-row items-center gap-3 rounded-btn-card border border-divider bg-bg px-3.5 py-3">
      <MapPin size={20} color={colors.brown} />
      <View className="flex-1 gap-0.5">
        <Text className="font-body text-[15px] font-bold text-ink">{address?.short ?? "주소 찾는 중…"}</Text>
        {address?.full ? <Text className="font-body text-[12px] text-muted">{address.full}</Text> : null}
      </View>
    </View>
  );
}
