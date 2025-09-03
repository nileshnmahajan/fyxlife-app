import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <Tabs 
      initialRouteName="dashboard" 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <MaterialCommunityIcons
                name={focused ? "view-dashboard" : "view-dashboard-outline"}
                color={color}
                size={focused ? 26 : 24}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="progressScreen"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <MaterialCommunityIcons
                name={focused ? "chart-bar" : "chart-bar"}
                color={color}
                size={focused ? 26 : 24}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="riskScreen"
        options={{
          title: "Risk",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <MaterialCommunityIcons
                name={focused ? "alert-circle" : "alert-circle-outline"}
                color={color}
                size={focused ? 26 : 24}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    right: 20,
    height: 45,
    borderRadius: 35,
    marginHorizontal: 10,
    paddingTop: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    paddingBottom: 0,
  },
  tabBarItem: {
    paddingVertical: 0,
    // height: 70,
  },
  tabBarIcon: {
    marginBottom: 4,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: -4,
    height:0// hide names
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  iconContainerFocused: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    // backgroundColor: 'rgba(99, 102, 241, 0.1)',
    // marginTop: -10,
  },
});