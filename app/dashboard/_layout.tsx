import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs initialRouteName="dashboard" screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: () => "🏠",
        }}
      />
      <Tabs.Screen
        name="progressScreen"
        options={{
          title: "Progress",
          tabBarIcon: () => "📊",
        }}
      />
      <Tabs.Screen
        name="riskScreen"
        options={{
          title: "Risk",
          tabBarIcon: () => "⚠️",
        }}
      />
    </Tabs>
  );
}
