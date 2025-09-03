// components/AppScreen.js
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppScreen({ children, style = { padding: 16 } }) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView
        style={[
          { flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom },
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
