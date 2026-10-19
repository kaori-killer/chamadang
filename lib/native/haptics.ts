import * as Haptics from "expo-haptics";

export const tap = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
export const success = () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
export const warning = () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
