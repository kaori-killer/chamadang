import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { IconButton } from "@/components/ui/IconButton";
import { TopBar } from "@/components/ui/TopBar";
import { Heading } from "@/components/ui/Heading";
import { privacy, terms } from "@/content/legal";
import { colors } from "@/lib/tokens";

export default function Legal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { doc } = useLocalSearchParams<{ doc?: string }>();
  const d = doc === "privacy" ? privacy : terms;
  return (
    <View className="flex-1 bg-surface">
      <TopBar left={<IconButton ariaLabel="뒤로" onPress={() => router.back()}><ChevronLeft size={22} color={colors.ink} /></IconButton>} />
      <ScrollView contentContainerClassName="gap-4 px-page pt-5" contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <Heading>{d.title}</Heading>
        <Text className="font-body text-[12px] text-muted">{d.effective}</Text>
        {d.sections.map((s) => (
          <View key={s.heading} className="gap-1">
            <Text role="heading" aria-level={2} className="font-body text-[14px] font-bold text-ink">{s.heading}</Text>
            <Text className="font-body text-[14px] leading-6 text-ink">{s.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
