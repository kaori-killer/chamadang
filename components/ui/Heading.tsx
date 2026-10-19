import { Text, type TextProps } from "react-native";

type Props = TextProps & { level?: "hero" | "page" | "card"; children: React.ReactNode };

const sizes = { hero: "text-[40px]", page: "text-[30px]", card: "text-[28px]" };

export function Heading({ level = "page", children, className, ...rest }: Props) {
  return (
    <Text role="heading" aria-level={level === "card" ? 2 : 1} className={`font-title ${sizes[level]} leading-tight text-ink ${className ?? ""}`} {...rest}>
      {children}
    </Text>
  );
}
