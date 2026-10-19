import { Pressable, type PressableProps } from "react-native";

type Props = Omit<PressableProps, "children" | "aria-label"> & {
  ariaLabel: string;
  size?: number;
  tone?: "light" | "dark";
  children: React.ReactNode;
};

export function IconButton({ ariaLabel, size = 44, tone = "light", children, className, ...rest }: Props) {
  return (
    <Pressable
      role="button"
      aria-label={ariaLabel}
      hitSlop={8}
      style={{ width: size, height: size }}
      className={`items-center justify-center rounded-full ${tone === "light" ? "bg-bg shadow-sm" : "bg-ink/40"} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Pressable>
  );
}
