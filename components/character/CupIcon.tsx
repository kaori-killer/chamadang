import Svg, { Path } from "react-native-svg";
import { colors } from "@/lib/tokens";

export function CupIcon({ size = 18, color = colors.bg }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 10 C 5 16, 8 19, 12 19 C 16 19, 19 16, 19 10 Z" />
      <Path d="M4 10 L 20 10" />
      <Path d="M9 6 C 8 5, 10 4, 9 3 M14 6 C 13 5, 15 4, 14 3" />
    </Svg>
  );
}
