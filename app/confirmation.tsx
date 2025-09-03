// screens/ConfirmationScreen.js
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function ConfirmationScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hi {name || "User"}, your profile is ready 🎉</Text>
      <Button title="Go to Dashboard" onPress={() => router.replace("/dashboard")} />
    </View>
  );
}
