import Svg, { Circle, Path } from "react-native-svg";

export function Gaiwan({ size = 160 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="-80 -80 160 160">
      <Path d="M-56 -22 C -60 20, -36 48, 0 48 C 36 48, 60 20, 56 -22 Z" fill="#7A8450" transform="translate(3 3)" />
      <Path d="M-36 -6 L 4 36 M-18 -14 L 22 28 M-46 8 L -12 42" stroke="#66703F" strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M-58 -24 C -62 20, -38 50, 0 50 C 38 50, 62 20, 58 -24 Z" fill="none" stroke="#2A2622" strokeWidth={3} strokeLinejoin="round" />
      <Path d="M-64 -24 C -64 -32, 64 -32, 64 -24 C 64 -16, -64 -16, -64 -24 Z" fill="#F4EFE4" stroke="#2A2622" strokeWidth={3} />
      <Path d="M-42 -32 C -38 -52, 38 -52, 42 -32 Z" fill="#8C5E3C" stroke="#2A2622" strokeWidth={3} strokeLinejoin="round" />
      <Circle cx={0} cy={-58} r={6} fill="#2A2622" />
      <Circle cx={-14} cy={4} r={3.5} fill="#2A2622" />
      <Circle cx={14} cy={2} r={3.5} fill="#2A2622" />
      <Path d="M-6 20 C 0 26, 6 26, 10 20" fill="none" stroke="#2A2622" strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M-70 60 C -70 72, 70 72, 70 60 C 70 50, -70 50, -70 60 Z" fill="#8C5E3C" stroke="#2A2622" strokeWidth={3} />
    </Svg>
  );
}
