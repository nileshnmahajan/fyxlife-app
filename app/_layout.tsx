import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import { Colors } from "@/constants/colors";
import { PaperProvider } from "react-native-paper";

import { SafeAreaProvider } from "react-native-safe-area-context";

const theme = {
  colors: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    background: Colors.background,
    text: Colors.text,
  },
};

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
          // If user info exists, redirect to dashboard main screen
          router.replace({ pathname: "/dashboard" });
        }
      } catch (e) {
        // handle error if needed
      }
    };
    checkUserInfo();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
