import { View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X } from "lucide-react-native";
import { CameraDenied } from "@/components/plant/CameraDenied";
import { Recorder } from "@/components/plant/Recorder";
import { IconButton } from "@/components/ui/IconButton";
import { StepDots } from "@/components/ui/StepDots";
import { usePermissions } from "@/hooks/usePermissions";
import { usePlantFlow } from "@/hooks/usePlantFlow";
import { colors } from "@/lib/tokens";

export default function PlantRecord() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const permissions = usePermissions();
  const setClip = usePlantFlow((s) => s.setClip);

  const close = () => { usePlantFlow.getState().reset(); router.back(); };

  if (permissions.isPending) return <View className="flex-1 bg-[#2F3720]" />;
  const denied = permissions.data?.camera === "denied" || permissions.data?.microphone === "denied";
  if (denied) {
    return (
      <View className="flex-1">
        <CameraDenied />
        <View className="absolute left-edge" style={{ top: insets.top + 8 }}>
          <IconButton ariaLabel="닫기" tone="dark" onPress={close}><X size={20} color={colors.bg} /></IconButton>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#2F3720]">
      <Recorder onRecorded={(clip) => { setClip(clip); router.push("/plant/preview"); }} />
      <View className="absolute inset-x-0 flex-row items-center justify-between px-edge" style={{ top: insets.top + 8 }}>
        <IconButton ariaLabel="닫기" tone="dark" onPress={close}><X size={20} color={colors.bg} /></IconButton>
        <StepDots total={3} current={0} tone="dark" />
      </View>
    </View>
  );
}
