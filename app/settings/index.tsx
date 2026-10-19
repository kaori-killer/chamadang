import { View } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { IconButton } from "@/components/ui/IconButton";
import { TopBar } from "@/components/ui/TopBar";
import { Heading } from "@/components/ui/Heading";
import { colors } from "@/lib/tokens";

export default function Settings() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-surface">
      <TopBar left={<IconButton ariaLabel="뒤로" onPress={() => router.back()}><ChevronLeft size={22} color={colors.ink} /></IconButton>} />
      <View className="px-page pt-5"><Heading>설정</Heading></View>
    </View>
  );
}
