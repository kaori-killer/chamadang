import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera, MapPin } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { StepDots } from "@/components/ui/StepDots";
import { usePermissions } from "@/hooks/usePermissions";
import { colors } from "@/lib/tokens";

function PermissionCard({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <View className="flex-row items-center gap-3.5 rounded-btn border border-divider bg-surface p-4">
      <View className="h-11 w-11 items-center justify-center rounded-input">{icon}</View>
      <View className="flex-1 gap-0.5">
        <Text className="font-body text-[15px] font-bold text-ink">{title}</Text>
        <Text className="font-body text-[13px] text-muted">{sub}</Text>
      </View>
    </View>
  );
}

export default function Permissions() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { requestAll } = usePermissions();

  const finish = () => router.replace("/");

  return (
    <View className="flex-1 bg-bg px-page" style={{ paddingTop: insets.top + 40, paddingBottom: insets.bottom + 16 }}>
      <View className="gap-2.5">
        <Heading>세 가지만{"\n"}허락해 주세요</Heading>
        <Text className="font-body text-[14px] text-muted">자리를 심는 데 꼭 필요한 것만 받아요</Text>
      </View>
      <View className="mt-7 gap-3.5">
        <PermissionCard icon={<View className="h-11 w-11 items-center justify-center rounded-input bg-khaki-soft"><Camera size={22} color={colors.khakiDeep} /></View>} title="카메라와 마이크" sub="자리의 1.5초를 소리까지 담아요" />
        <PermissionCard icon={<View className="h-11 w-11 items-center justify-center rounded-input bg-brown-soft"><MapPin size={22} color={colors.brownDeep} /></View>} title="위치" sub="지금 있는 자리에 핀을 찍어요. 앱을 쓸 때만요" />
      </View>
      <Text className="mt-7 font-body text-[13px] leading-5 text-muted">
        심은 자리는 모두에게 보여요.{"\n"}나만 볼 자리는 심을 때 <Text className="font-bold text-ink">내 마당에만</Text>을 켜요.
      </Text>
      <View className="mt-auto items-center gap-4">
        <StepDots total={2} current={1} />
        <Button label="좋아요, 허락할게요" className="w-full" onPress={async () => { await requestAll(); finish(); }} />
        <Pressable role="button" aria-label="권한 설정을 나중에 하기" onPress={finish} className="min-h-[44px] justify-center">
          <Text className="font-body text-[13px] text-muted">나중에 할게요</Text>
        </Pressable>
      </View>
    </View>
  );
}
