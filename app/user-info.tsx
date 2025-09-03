// screens/UserInfoScreen.js
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function UserInfoScreen() {
  const router = useRouter();

  const [name, setName] = useState("");

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Enter your name:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        value={name}
        onChangeText={setName}
      />
      {/* Add Age, Gender, Phone, etc. here */}
      <Button
        title="Continue"
        onPress={() => router.push({ pathname: "/confirmation", params: { name } })}
      />
    </View>
  );
}
