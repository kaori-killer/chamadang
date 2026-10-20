import { Linking, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import Constants from "expo-constants";
import { CupIcon } from "@/components/character/CupIcon";
import { SettingsGroup, SettingsRow } from "@/components/settings/SettingsRow";
import { IconButton } from "@/components/ui/IconButton";
import { TopBar } from "@/components/ui/TopBar";
import { Heading } from "@/components/ui/Heading";
import { useAccount } from "@/hooks/useAccount";
import { colors } from "@/lib/tokens";

export default function Settings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { providers, placeCount } = useAccount();
  const linked = (providers.data?.length ?? 0) > 0;
  const count = placeCount.data ?? 0;

  return (
    <View className="flex-1 bg-surface">
      <TopBar left={<IconButton ariaLabel="뒤로" onPress={() => router.back()}><ChevronLeft size={22} color={colors.ink} /></IconButton>} />
      <View className="flex-1 gap-5 px-page pt-5" style={{ paddingBottom: insets.bottom + 16 }}>
        <Heading>설정</Heading>
        <View className="flex-row items-center gap-3.5 rounded-btn border border-divider bg-bg p-4">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-khaki"><CupIcon size={18} /></View>
          <View className="flex-1 gap-0.5">
            <Text className="font-body text-[15px] font-bold text-ink">{linked ? "연결된 마당" : "이름 없는 마당"}</Text>
            <Text className="font-body text-[12px] text-muted">자리 {count}개{linked ? "" : ", 계정을 연결하면 다른 폰에서도 보여요"}</Text>
          </View>
        </View>
        <SettingsGroup title="내 마당">
          <SettingsRow label={linked ? "연결된 계정" : "계정 연결하기 (카카오, Apple)"} trailing={linked ? providers.data?.map((p) => (p === "kakao" ? "카카오" : "Apple")).join(", ") : undefined} onPress={() => router.push("/settings/account")} />
          <SettingsRow label="권한 다시 설정" onPress={() => Linking.openSettings()} />
        </SettingsGroup>
        <SettingsGroup title="정보">
          <SettingsRow label="이용약관" onPress={() => router.push({ pathname: "/settings/legal", params: { doc: "terms" } })} />
          <SettingsRow label="개인정보처리방침" onPress={() => router.push({ pathname: "/settings/legal", params: { doc: "privacy" } })} />
        </SettingsGroup>
        <View className="mt-auto items-center gap-2.5">
          <Pressable role="button" aria-label="계정과 모든 자리 삭제" onPress={() => router.push("/settings/delete")} className="min-h-[44px] justify-center">
            <Text className="font-body text-[13px] text-muted underline">계정과 모든 자리 삭제</Text>
          </Pressable>
          <Text className="font-body text-[12px] text-[#9A9382]">차마당 {Constants.expoConfig?.version ?? ""}</Text>
        </View>
      </View>
    </View>
  );
}
