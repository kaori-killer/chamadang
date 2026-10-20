import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { supabase } from "./client";

export type LinkProvider = "kakao" | "apple";

const redirectTo = Linking.createURL("auth/callback");

export async function linkProvider(provider: LinkProvider) {
  const { data, error } = await supabase.auth.linkIdentity({ provider, options: { redirectTo, skipBrowserRedirect: true } });
  if (error) throw error;
  if (!data.url) throw new Error("no_auth_url");
  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== "success") throw new Error("cancelled");
  const code = new URL(result.url).searchParams.get("code");
  if (!code) throw new Error("no_code");
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) throw exchangeError;
}

export async function linkedProviders(): Promise<LinkProvider[]> {
  const { data } = await supabase.auth.getUserIdentities();
  return (data?.identities ?? []).map((i) => i.provider).filter((p): p is LinkProvider => p === "kakao" || p === "apple");
}

export async function countMyPlaces() {
  const { data, error } = await supabase.rpc("my_place_count");
  if (error) throw error;
  return Number(data ?? 0);
}

export async function deleteMyAccount() {
  const { error } = await supabase.rpc("delete_my_account");
  if (error) throw error;
  await supabase.auth.signOut();
}
