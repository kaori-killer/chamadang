import { Camera } from "expo-camera";
import * as Location from "expo-location";

export type PermissionKind = "camera" | "microphone" | "location";
export type PermissionState = "granted" | "denied" | "undetermined";

const toState = (status: string): PermissionState =>
  status === "granted" ? "granted" : status === "denied" ? "denied" : "undetermined";

export async function status(kind: PermissionKind): Promise<PermissionState> {
  if (kind === "camera") return toState((await Camera.getCameraPermissionsAsync()).status);
  if (kind === "microphone") return toState((await Camera.getMicrophonePermissionsAsync()).status);
  return toState((await Location.getForegroundPermissionsAsync()).status);
}

export async function ask(kind: PermissionKind): Promise<PermissionState> {
  if (kind === "camera") return toState((await Camera.requestCameraPermissionsAsync()).status);
  if (kind === "microphone") return toState((await Camera.requestMicrophonePermissionsAsync()).status);
  return toState((await Location.requestForegroundPermissionsAsync()).status);
}

export async function askAll() {
  return {
    camera: await ask("camera"),
    microphone: await ask("microphone"),
    location: await ask("location"),
  };
}
