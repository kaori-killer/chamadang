import { Text, TextInput, View, type TextInputProps } from "react-native";

type Props = Omit<TextInputProps, "aria-label"> & {
  label: string;
  ariaLabel: string;
  optional?: boolean;
  maxLength: number;
  value: string;
  highlighted?: boolean;
};

export function TextField({ label, ariaLabel, optional, maxLength, value, highlighted, placeholder, ...rest }: Props) {
  return (
    <View className="gap-2">
      <View className="flex-row justify-between">
        <Text className="font-body text-[13px] font-bold text-muted">
          {label}
          {optional ? <Text className="font-normal"> (선택)</Text> : null}
        </Text>
        <Text className="font-body text-[12px] text-[#9A9382]">{value.length}/{maxLength}</Text>
      </View>
      <TextInput
        aria-label={ariaLabel}
        placeholder={placeholder}
        placeholderTextColor="#9A9382"
        maxLength={maxLength}
        value={value}
        className={`min-h-[44px] rounded-input border bg-bg px-3.5 font-body text-[15px] text-ink ${highlighted ? "border-brown" : "border-divider"}`}
        {...rest}
      />
    </View>
  );
}
