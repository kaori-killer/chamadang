import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { ChevronUp } from "lucide-react-native";
import { colors } from "@/lib/tokens";

type Props = { name: string; posterUrl: string | null; onExpand: () => void };

export function CollapsedBar({ name, posterUrl, onExpand }: Props) {
  return (
    <Pressable role="button" aria-label={`${name} 카드 펼치기`} onPress={onExpand} className="h-16 flex-row items-center gap-3 rounded-card bg-surface px-3 shadow-lg">
      <View className="h-12 w-8 overflow-hidden rounded-lg bg-khaki">
        {posterUrl ? <Image source={{ uri: posterUrl }} style={{ width: 32, height: 48 }} contentFit="cover" /> : null}
      </View>
      <Text className="flex-1 font-body text-[15px] font-bold text-ink" numberOfLines={1}>{name}</Text>
      <ChevronUp size={20} color={colors.textMuted} />
    </Pressable>
  );
}
