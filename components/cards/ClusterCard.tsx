import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Heading } from "@/components/ui/Heading";
import type { PlaceRow } from "@/lib/supabase/types";

type Props = { places: PlaceRow[]; posterUrl: (path: string) => string; onSelect: (id: string) => void };

export function ClusterCard({ places, posterUrl, onSelect }: Props) {
  return (
    <View role="list" aria-label="이 근처 자리" className="rounded-card bg-surface p-card pb-4 shadow-lg">
      <View className="mb-3 flex-row items-baseline justify-between">
        <Heading level="card">이 근처 자리 {places.length}개</Heading>
        <Text className="font-body text-[12px] text-muted">{places[0]?.address_short ?? ""}</Text>
      </View>
      <View className="gap-2">
        {places.slice(0, 4).map((p) => (
          <Pressable key={p.id} role="listitem" aria-label={p.name ?? "이름 없는 자리"} onPress={() => onSelect(p.id)} className="flex-row items-center gap-3 rounded-btn-card bg-bg p-2.5">
            <View className="h-[72px] w-12 overflow-hidden rounded-input bg-khaki">
              {p.latest_poster ? <Image source={{ uri: posterUrl(p.latest_poster) }} style={{ width: 48, height: 72 }} contentFit="cover" /> : null}
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="font-body text-[15px] font-bold text-ink" numberOfLines={1}>{p.name ?? "이름 없는 자리"}</Text>
              <Text className="font-body text-[12px] text-muted" numberOfLines={1}>{p.tags.join(", ")}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
