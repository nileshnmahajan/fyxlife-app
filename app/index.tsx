// screens/WelcomeScreen.js
import { useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}
      
      
      >
        
        {/* Illustration / Logo */}
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/2966/2966485.png" }}
          style={{ width: 160, height: 160, marginBottom: 32 }}
          resizeMode="contain"
        />

        {/* Title */}
        <Text
          variant="headlineMedium"
          // style={{ fontWeight: "700", marginBottom: 12, color: "#37474F" }}
          // className="text-2xl font-bold"
        >
          Welcome to Fyxlife 🌱
        </Text>

        {/* Subtitle */}
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", color: "#607D8B", marginBottom: 40 }}
        >
          Track your fitness, eat better, and stay calm.  
          Your wellness journey starts here.
        </Text>

        {/* CTA Button */}
        <Button
          mode="contained"
          onPress={() => router.push("/user-info")}
          style={{ borderRadius: 12, paddingVertical: 4, width: "70%" }}
          buttonColor="#6C63FF"
        >
          Get Started
        </Button>
      </View>
    </SafeAreaView>
  );
}
