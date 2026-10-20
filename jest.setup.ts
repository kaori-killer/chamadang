jest.mock("@mj-studio/react-native-naver-map", () => ({ NaverMapView: "NaverMapView", NaverMapMarkerOverlay: "NaverMapMarkerOverlay" }));
jest.mock("expo-camera", () => ({ Camera: { getCameraPermissionsAsync: jest.fn(), getMicrophonePermissionsAsync: jest.fn(), requestCameraPermissionsAsync: jest.fn(), requestMicrophonePermissionsAsync: jest.fn() }, CameraView: "CameraView" }));
jest.mock("expo-location", () => ({ getForegroundPermissionsAsync: jest.fn(), requestForegroundPermissionsAsync: jest.fn(), getCurrentPositionAsync: jest.fn(), Accuracy: { Balanced: 3 } }));
jest.mock("expo-haptics", () => ({ impactAsync: jest.fn(), notificationAsync: jest.fn(), ImpactFeedbackStyle: {}, NotificationFeedbackType: {} }));
jest.mock("@/lib/supabase/client", () => ({ supabase: {} }));
jest.mock("expo-video-thumbnails", () => ({ getThumbnailAsync: jest.fn() }));
