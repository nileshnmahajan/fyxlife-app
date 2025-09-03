// screens/ProgressScreen.js
import React from "react";
import { Text, View } from "react-native";

export default function ProgressScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>📊 Progress Summary</Text>
      <Text>Today: 2 goals completed</Text>
      <Text>This Week: 10 goals completed</Text>
      <Text>This Month: 40 goals completed</Text>
    </View>
  );
}
