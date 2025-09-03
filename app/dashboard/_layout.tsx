import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
      <Tabs initialRouteName="dashboard" screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="progressScreen"
          options={{
            title: "Progress",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="chart-bar"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="riskScreen"
          options={{
            title: "Risk",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="alert-circle-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
  );
}
