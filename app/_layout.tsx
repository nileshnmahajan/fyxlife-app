import { Stack } from "expo-router";

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
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
