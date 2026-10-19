import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withTiming, cancelAnimation } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { colors, limits } from "@/lib/tokens";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const SIZE = 84;
const R = 39;
const C = 2 * Math.PI * R;

type Props = { recording: boolean; onStart: () => void; onCancel: () => void };

export function RecordButton({ recording, onStart, onCancel }: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (recording) progress.value = withTiming(1, { duration: limits.clipMs });
    else { cancelAnimation(progress); progress.value = 0; }
  }, [recording, progress]);

  const ringProps = useAnimatedProps(() => ({ strokeDashoffset: C * (1 - progress.value) }));

  return (
    <Pressable
      role="button"
      aria-label="1.5초 녹화, 길게 누르기"
      onPressIn={onStart}
      onPressOut={onCancel}
      style={{ width: SIZE, height: SIZE }}
      className="items-center justify-center"
    >
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}>
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={R} stroke={recording ? "rgba(244,239,228,0.35)" : colors.bg} strokeWidth={5} fill="none" />
        {recording ? (
          <AnimatedCircle cx={SIZE / 2} cy={SIZE / 2} r={R} stroke={colors.bg} strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray={C} animatedProps={ringProps} />
        ) : null}
      </Svg>
      <View style={{ width: 60, height: 60, borderRadius: recording ? 14 : 30, backgroundColor: colors.brown }} />
    </Pressable>
  );
}
