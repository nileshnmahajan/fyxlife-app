// components/AppScreen.js

import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { Colors } from "@/constants/colors";

import { Platform } from "react-native";

export default function InputScreen({ children, style = {}, keyboardOffset = 0 }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardOffset}
    >
      <SafeAreaView
        style={[
          { backgroundColor: Colors.background, flex: 1 },
          style,
        ]}
        edges={['top']}
      >
        {children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
