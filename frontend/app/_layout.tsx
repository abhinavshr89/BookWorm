import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen.jsx";
import { StatusBar } from "expo-status-bar";
import { Router } from "expo-router";
import { useSegments } from "expo-router";
import { useAuthStore } from "../store/authStore.js";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;
    if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    } else if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    }
  }, [user, token, segments]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
