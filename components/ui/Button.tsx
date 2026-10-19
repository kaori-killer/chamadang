import { Pressable, Text, type PressableProps } from "react-native";

type Variant = "primary" | "secondary" | "danger" | "tertiary";
type Context = "page" | "card";

type Props = Omit<PressableProps, "children" | "aria-label"> & {
  label: string;
  ariaLabel?: string;
  variant?: Variant;
  context?: Context;
  icon?: React.ReactNode;
};

const bg: Record<Variant, string> = {
  primary: "bg-khaki",
  secondary: "bg-bg border border-divider",
  danger: "bg-brown",
  tertiary: "bg-bg border border-divider",
};
const fg: Record<Variant, string> = {
  primary: "text-bg",
  secondary: "text-ink",
  danger: "text-bg",
  tertiary: "text-ink",
};

export function Button({ label, ariaLabel, variant = "primary", context = "page", icon, disabled, className, ...rest }: Props) {
  const height = variant === "tertiary" ? "min-h-[44px]" : context === "page" ? "min-h-[54px]" : "min-h-[50px]";
  const rounded = context === "page" ? "rounded-btn" : "rounded-btn-card";
  return (
    <Pressable
      role="button"
      aria-label={ariaLabel ?? label}
      aria-disabled={disabled ?? false}
      disabled={disabled}
      className={`${height} ${rounded} ${disabled ? "bg-disabled" : bg[variant]} flex-row items-center justify-center gap-2 px-4 active:opacity-80 ${className ?? ""}`}
      {...rest}
    >
      {icon}
      <Text className={`font-body font-bold ${variant === "tertiary" ? "text-[14px]" : "text-[15px]"} ${disabled ? "text-bg" : fg[variant]}`}>{label}</Text>
    </Pressable>
  );
}
