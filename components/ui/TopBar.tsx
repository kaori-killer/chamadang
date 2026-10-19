import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = { left?: React.ReactNode; right?: React.ReactNode; edge?: "page" | "map" };

export function TopBar({ left, right, edge = "page" }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      role="toolbar"
      style={{ paddingTop: insets.top + 8 }}
      className={`flex-row items-center justify-between ${edge === "page" ? "px-page" : "px-edge"}`}
    >
      <View className="min-w-[44px]">{left}</View>
      <View className="min-w-[44px] items-end">{right}</View>
    </View>
  );
}
