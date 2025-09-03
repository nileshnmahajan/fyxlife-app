// screens/RiskScreen.js
import React from "react";
import { Text, View } from "react-native";

export default function RiskScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>⚠️ Risk-o-meter</Text>
      <Text>Cardio: Medium risk</Text>
      <Text>Metabolic: Low risk</Text>
      <Text>Musculoskeletal: High risk</Text>
    </View>
  );
}
