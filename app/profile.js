import AppScreen from "@/components/AppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, IconButton, Text } from "react-native-paper";

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await AsyncStorage.getItem("userInfo");
        if (data) setUserInfo(JSON.parse(data));
      } catch (e) {
        // handle error
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userInfo");
    router.replace("/user-info");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <AppScreen style={{ padding: 0 }}>
      {/* Background */}
      <LinearGradient
        colors={["#f7f9fc", "#e8f2ff"]}
        style={styles.backgroundGradient}
      />
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      {/* Header with back button */}
      <View style={styles.headerRow}>
        <IconButton
          icon="arrow-left"
          size={28}
          onPress={handleGoBack}
          style={styles.backIcon}
        />
        <Text variant="headlineSmall" style={styles.title}>
          Profile
        </Text>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.avatarBox}>
        <Avatar.Icon
          size={72}
          icon="account"
          color="#fff"
          style={{ backgroundColor: "#6c63ff" }}
        />
      </View>
      <View style={styles.infoBox}>
        {userInfo ? (
          <>
            <View style={styles.infoRow}>
              <IconButton icon="account" size={20} style={styles.infoIcon} />
              <Text style={styles.label}>
                Name: <Text style={styles.value}>{userInfo.name}</Text>
              </Text>
            </View>
            <View style={styles.infoRow}>
              <IconButton icon="cake" size={20} style={styles.infoIcon} />
              <Text style={styles.label}>
                Age: <Text style={styles.value}>{userInfo.age}</Text>
              </Text>
            </View>
            <View style={styles.infoRow}>
              <IconButton icon="phone" size={20} style={styles.infoIcon} />
              <Text style={styles.label}>
                Phone: <Text style={styles.value}>{userInfo.phone}</Text>
              </Text>
            </View>
            <View style={styles.infoRow}>
              <IconButton
                icon="gender-male-female"
                size={20}
                style={styles.infoIcon}
              />
              <Text style={styles.label}>
                Gender: <Text style={styles.value}>{userInfo.gender}</Text>
              </Text>
            </View>
            <View style={styles.infoRow}>
              <IconButton icon="run" size={20} style={styles.infoIcon} />
              <Text style={styles.label}>
                Activity Level:{" "}
                <Text style={styles.value}>{userInfo.activityLevel}</Text>
              </Text>
            </View>
            {userInfo.height ? (
              <View style={styles.infoRow}>
                <IconButton
                  icon="human-male-height"
                  size={20}
                  style={styles.infoIcon}
                />
                <Text style={styles.label}>
                  Height: <Text style={styles.value}>{userInfo.height} cm</Text>
                </Text>
              </View>
            ) : null}
            {userInfo.weight ? (
              <View style={styles.infoRow}>
                <IconButton
                  icon="weight-kilogram"
                  size={20}
                  style={styles.infoIcon}
                />
                <Text style={styles.label}>
                  Weight: <Text style={styles.value}>{userInfo.weight} kg</Text>
                </Text>
              </View>
            ) : null}
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <Button
        mode="outlined"
        style={styles.logoutBtn}
        onPress={handleLogout}
        icon="logout"
      >
        Logout
      </Button>
      <Text style={styles.version}>
        App Version:{" "}
        {Constants.expoConfig?.version ||
          Constants.manifest?.version ||
          "1.0.0"}
      </Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  circle1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(108, 99, 255, 0.08)",
    top: -100,
    right: -100,
    zIndex: 1,
  },
  circle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(77, 182, 172, 0.06)",
    bottom: -80,
    left: -80,
    zIndex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    // paddingTop: 32,
    marginBottom: 8,
    zIndex: 2,
  },
  backIcon: {
    marginLeft: 0,
  },
  avatarBox: {
    alignItems: "center",
    marginBottom: 12,
    zIndex: 2,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
    zIndex: 2,
  },
  infoBox: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 18,
    marginBottom: 24,
    zIndex: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoIcon: {
    margin: 0,
    marginRight: 4,
    backgroundColor: "transparent",
  },
  label: {
    fontWeight: "600",
    color: "#333",
    fontSize: 15,
  },
  value: {
    fontWeight: "400",
    color: "#555",
  },
  logoutBtn: {
    marginHorizontal: 18,
    marginTop: 8,
    borderRadius: 8,
    borderColor: "#e53935",
    zIndex: 2,
  },
  version: {
    marginTop: 24,
    textAlign: "center",
    color: "#888",
    fontSize: 13,
    zIndex: 2,
  },
});
