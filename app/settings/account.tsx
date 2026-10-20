import { Platform, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { Gaiwan } from "@/components/character/Gaiwan";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { TopBar } from "@/components/ui/TopBar";
import { useAccount } from "@/hooks/useAccount";
import { colors } from "@/lib/tokens";

export default function Account() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { providers, placeCount, link } = useAccount();
  const has = (p: "kakao" | "apple") => providers.data?.includes(p);
  const busy = link.isPending;

  return (
    <View className="flex-1 bg-surface">
      <TopBar left={<IconButton ariaLabel="뒤로" onPress={() => router.back()}><ChevronLeft size={22} color={colors.ink} /></IconButton>} />
      <View className="flex-1 gap-5 px-page pt-6" style={{ paddingBottom: insets.bottom + 16 }}>
        <View className="items-center gap-3.5 text-center">
          <View className="h-[150px] w-[150px] items-center justify-center rounded-full bg-bg"><Gaiwan size={150} /></View>
          <Heading className="text-center">내 마당을{"\n"}다른 폰에서도</Heading>
          <Text className="text-center font-body text-[14px] leading-6 text-muted">폰을 바꿔도 자리 {placeCount.data ?? 0}개가 그대로 따라와요</Text>
        </View>
        {link.isError ? <Text role="alert" className="text-center font-body text-[13px] text-brown-deep">연결이 안 됐어요. 다시 시도해주세요</Text> : null}
        <View className="mt-auto gap-2.5">
          <Button label={has("kakao") ? "카카오 연결됨" : "카카오로 연결하기"} disabled={busy || has("kakao")} className="bg-[#FEE500]" labelClassName="text-[#191919]" onPress={() => link.mutate("kakao")} />
          {Platform.OS === "ios" ? (
            <Button label={has("apple") ? "Apple 연결됨" : "Apple로 연결하기"} disabled={busy || has("apple")} className="bg-ink" onPress={() => link.mutate("apple")} />
          ) : null}
          <Text className="mt-1.5 text-center font-body text-[12px] text-muted">이름과 사진은 지도에 안 보여요</Text>
        </View>
      </View>
    </View>
  );
}
