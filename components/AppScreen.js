// components/AppScreen.js

import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { Colors } from "@/constants/colors";

export default function AppScreen({ children, style = {} }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaView
        style={[
          { backgroundColor: Colors.background, flex: 1 },
          style,
        ]}
        edges={['top','bottom']}
      >
        {children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
