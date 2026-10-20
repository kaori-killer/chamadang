import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { colors } from "@/lib/tokens";

type Props = { label: string; onPress: () => void; trailing?: string };

export function SettingsRow({ label, onPress, trailing }: Props) {
  return (
    <Pressable role="button" aria-label={label} onPress={onPress} className="min-h-[52px] flex-row items-center justify-between border-b border-divider py-4">
      <Text className="font-body text-[15px] text-ink">{label}</Text>
      <View className="flex-row items-center gap-2">
        {trailing ? <Text className="font-body text-[13px] text-muted">{trailing}</Text> : null}
        <ChevronRight size={18} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

export function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View role="group" aria-label={title}>
      <Text className="pb-1.5 font-body text-[12px] font-bold text-muted">{title}</Text>
      {children}
    </View>
  );
}
