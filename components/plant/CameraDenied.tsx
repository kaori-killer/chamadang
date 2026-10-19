import { Linking, Text, View } from "react-native";
import { CameraOff } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { colors } from "@/lib/tokens";

export function CameraDenied() {
  return (
    <View className="flex-1 items-center justify-center gap-5 bg-[#2F3720] px-10">
      <View className="h-24 w-24 items-center justify-center rounded-full bg-bg/10">
        <CameraOff size={44} color={colors.bg} />
      </View>
      <Heading className="text-center text-[32px] text-bg">카메라를{"\n"}쓸 수 없어요</Heading>
      <Text className="text-center font-body text-[14px] leading-6 text-bg/75">설정에서 차마당의 카메라를 켜주세요</Text>
      <Button label="설정 열기" variant="secondary" context="card" onPress={() => Linking.openSettings()} />
    </View>
  );
}
