import { Text, View } from "react-native";
import { Button } from "@/components/ui/Button";

type Props = { tone: "light" | "dark"; icon: React.ReactNode; title: string; sub: string; action?: { label: string; onPress: () => void } };

export function Banner({ tone, icon, title, sub, action }: Props) {
  const dark = tone === "dark";
  return (
    <View role="status" className={`flex-row items-center gap-3 rounded-btn-card px-3.5 py-3 shadow-md ${dark ? "bg-ink" : "border border-divider bg-surface"}`}>
      <View className={`h-9 w-9 items-center justify-center rounded-lg ${dark ? "" : "bg-brown-soft"}`}>{icon}</View>
      <View className="flex-1 gap-0.5">
        <Text className={`font-body text-[14px] font-bold ${dark ? "text-bg" : "text-ink"}`}>{title}</Text>
        <Text className={`font-body text-[12px] ${dark ? "text-bg/75" : "text-muted"}`}>{sub}</Text>
      </View>
      {action ? <Button label={action.label} variant="danger" context="card" className="min-h-[36px] rounded-full px-3" onPress={action.onPress} /> : null}
    </View>
  );
}
