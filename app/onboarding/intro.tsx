import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gaiwan } from "@/components/character/Gaiwan";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { StepDots } from "@/components/ui/StepDots";

export default function Intro() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 items-center justify-between bg-bg px-page" style={{ paddingTop: insets.top + 80, paddingBottom: insets.bottom + 16 }}>
      <View className="items-center gap-7">
        <View className="h-[200px] w-[200px] items-center justify-center rounded-full bg-surface"><Gaiwan /></View>
        <Heading level="hero" className="text-[44px]">차마당</Heading>
        <Text className="text-center font-body text-[17px] leading-7 text-ink">차 한 잔 들고 나가서{"\n"}마시기 좋았던 자리를{"\n"}1.5초로 남겨두는 지도예요</Text>
      </View>
      <View className="w-full items-center gap-4">
        <StepDots total={2} current={0} />
        <Button label="시작할게요" className="w-full" onPress={() => router.push("/onboarding/permissions")} />
      </View>
    </View>
  );
}
