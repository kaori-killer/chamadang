import { Text, View } from "react-native";
import { Gaiwan } from "@/components/character/Gaiwan";
import { Heading } from "@/components/ui/Heading";

export function EmptyMine() {
  return (
    <View pointerEvents="none" className="absolute inset-0 items-center bg-bg/55 pt-[230px]">
      <View className="h-[180px] w-[180px] items-center justify-center"><Gaiwan size={180} /></View>
      <Heading className="mt-4 text-center">아직 마당이{"\n"}비어 있어요</Heading>
      <Text className="mt-3 text-center font-body text-[14px] text-muted">첫 자리를 심어볼까요?</Text>
    </View>
  );
}
