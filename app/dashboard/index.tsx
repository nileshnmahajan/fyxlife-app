// screens/DashboardScreen.js
import AppScreen from "@/components/AppScreen";
import { Colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  IconButton,
  ProgressBar,
  Text,
} from "react-native-paper";
const { width } = Dimensions.get("window");

// Alternative goals for swapping
const alternativeGoals = {
  move: [
    { label: "20 min walk", current: 20, goal: 20, unit: "min", streak: 0 },
    { label: "10 min stretch", current: 10, goal: 10, unit: "min", streak: 0 },
    { label: "15 min yoga", current: 15, goal: 15, unit: "min", streak: 0 },
  ],
  eat: [
    { label: "3 healthy meals", current: 3, goal: 3, unit: "meals", streak: 0 },
    { label: "2 fruits", current: 2, goal: 2, unit: "fruits", streak: 0 },
    { label: "Drink 2L water", current: 2, goal: 2, unit: "L", streak: 0 },
  ],
  calm: [
    { label: "10 min meditation", current: 10, goal: 10, unit: "min", streak: 0 },
    { label: "Read 15 min", current: 15, goal: 15, unit: "min", streak: 0 },
    { label: "Breathing exercise", current: 5, goal: 5, unit: "min", streak: 0 },
  ],
};

// Initial goals
const initialWellnessData = {
  move: { label: "Move", current: 45, goal: 60, unit: "min", streak: 3 },
  eat: { label: "Eat", current: 3, goal: 5, unit: "meals", streak: 5 },
  calm: { label: "Calm", current: 10, goal: 15, unit: "min", streak: 2 },
};

const progressData = {
  today: { completed: 2, total: 3 },
  week: { completed: 12, total: 21 },
  month: { completed: 40, total: 90 },
};

const riskData = [
  {
    system: "Cardio",
    risk: "Moderate",
    value: 0.4,
    description: "Heart disease risk",
  },
  {
    system: "Metabolic",
    risk: "Low",
    value: 0.2,
    description: "Diabetes risk",
  },
  {
    system: "Musculoskeletal",
    risk: "High",
    value: 0.7,
    description: "Osteoarthritis risk",
  },
  {
    system: "Respiratory",
    risk: "Low",
    value: 0.3,
    description: "Asthma risk",
  },
  {
    system: "Neuro",
    risk: "Moderate",
    value: 0.5,
    description: "Stress level",
  },
];


export default function DashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("today");
  const [refreshing, setRefreshing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const showComingSoon = (feature: string) =>
    Alert.alert("Coming soon", `${feature} will be available soon.`);
  // Wellness goals state
  const [wellnessData, setWellnessData] = useState(initialWellnessData);
  // Modal state for swapping
  const [swapModal, setSwapModal] = useState({ open: false, type: null });
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

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

  useEffect(() => {
    // Animate dashboard elements on load
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "#4CAF50";
      case "moderate":
        return "#FF9800";
      case "high":
        return "#F44336";
      default:
        return Colors.text;
    }
  };

  const renderWellnessCard = (type, data) => {
    const icons = {
      move: "🏃",
      eat: "🍽",
      calm: "😌",
    };
    const progress = data.current / data.goal;
    const progressColor =
      progress >= 0.8
        ? "#4CAF50"
        : progress >= 0.5
        ? "#FF9800"
        : Colors.primary;

    return (
      <Card style={styles.wellnessCard} mode="contained">
        <Card.Content style={styles.wellnessCardContent}>
          <View style={styles.wellnessHeader}>
            <View style={styles.wellnessIconContainer}>
              <Text style={styles.wellnessIcon}>{icons[type]}</Text>
            </View>
            <View>
              <Text variant="titleMedium" style={styles.wellnessTitle}>
                {data.label || type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
              <Text variant="bodySmall" style={styles.wellnessSubtitle}>
                {data.current}/{data.goal} {data.unit}
              </Text>
            </View>
          </View>

          <ProgressBar
            progress={progress}
            color={progressColor}
            style={styles.progressBar}
          />

          <View style={styles.wellnessFooter}>
            <View style={styles.streakContainer}>
              <Text variant="bodySmall" style={styles.streakText}>
                🔥 {data.streak} day streak
              </Text>
            </View>
            <IconButton
              icon="swap-horizontal"
              size={16}
              mode="contained"
              containerColor={Colors.primary + "20"}
              iconColor={Colors.primary}
              onPress={() => setSwapModal({ open: true, type })}
              accessibilityLabel={`Swap ${type} goal`}
            />
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderRiskMeter = (item, index) => {
    const riskColor = getRiskColor(item.risk);

    return (
      <Animated.View
        key={index}
        style={[
          styles.riskCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.riskHeader}>
          <Text variant="titleSmall" style={styles.riskTitle}>
            {item.system} System
          </Text>
          <View
            style={[styles.riskPill, { backgroundColor: riskColor + "20" }]}
          >
            <Text
              variant="labelSmall"
              style={[styles.riskLabel, { color: riskColor }]}
            >
              {item.risk} Risk
            </Text>
          </View>
        </View>

        <Text variant="bodyMedium" style={styles.riskDescription}>
          {item.description}
        </Text>

        <View style={styles.riskMeterContainer}>
          <View style={styles.riskMeter}>
            <View
              style={[
                styles.riskMeterFill,
                {
                  width: `${item.value * 100}%`,
                  backgroundColor: riskColor,
                },
              ]}
            />
          </View>
          <Text variant="labelSmall" style={styles.riskValue}>
            {Math.round(item.value * 100)}%
          </Text>
        </View>
      </Animated.View>
    );
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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <Animated.View
                style={[
                  styles.refreshContainer,
                  { opacity: refreshing ? 1 : 0 },
                ]}
              >
                <ActivityIndicator
                  animating={refreshing}
                  color={Colors.primary}
                />
              </Animated.View>
            }
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text variant="headlineSmall" style={styles.greeting}>
              Good Morning, {userInfo ? userInfo.name.split(" ")[0] : "User"}!
            </Text>
            <Text variant="bodyMedium" style={styles.date}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileIconText}>
                {userInfo ? userInfo.name.charAt(0) : ""}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Wellness Goals */}
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Today's Wellness Goals
        </Text>

        <Animated.View
          style={[
            styles.wellnessContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.wellnessScrollContent}
          >
            {Object.entries(wellnessData).map(([type, data], index) => (
              <View key={type} style={styles.wellnessItem}>
                {renderWellnessCard(type, data)}
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Swap Modal using React Native Modal */}
        <Modal
          visible={swapModal.open}
          transparent
          animationType="fade"
          onRequestClose={() => setSwapModal({ open: false, type: null })}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.25)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 24,
                minWidth: 280,
                elevation: 8,
                alignItems: "center",
              }}
            >
              <Text variant="titleMedium" style={{ marginBottom: 16 }}>
                Swap Goal
              </Text>
              {swapModal.type && alternativeGoals[swapModal.type]
                .filter(
                  (alt) =>
                    alt.label !==
                    (wellnessData[swapModal.type]?.label || "")
                )
                .map((alt) => (
                  <Button
                    key={alt.label}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 200 }}
                    onPress={() => {
                      setWellnessData((prev) => ({
                        ...prev,
                        [swapModal.type]: {
                          ...alt,
                          streak: prev[swapModal.type].streak, // preserve streak
                        },
                      }));
                      setSwapModal({ open: false, type: null });
                    }}
                  >
                    {alt.label}
                  </Button>
                ))}
              <Button
                mode="text"
                onPress={() => setSwapModal({ open: false, type: null })}
                style={{ marginTop: 8 }}
              >
                Cancel
              </Button>
            </View>
          </View>
        </Modal>

        {/* Progress Summary */}
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Your Progress
        </Text>

        <Animated.View
          style={[
            styles.progressContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.tabContainer}>
            {["today", "week", "month"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  variant="labelMedium"
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.progressContent}>
            <View style={styles.progressStats}>
              <Text variant="headlineMedium" style={styles.progressNumber}>
                {progressData[activeTab].completed}
              </Text>
              <Text variant="bodyMedium" style={styles.progressLabel}>
                completed of {progressData[activeTab].total} goals
              </Text>
            </View>

            <View style={styles.progressCircle}>
              <Text variant="bodyMedium" style={styles.progressPercentage}>
                {Math.round(
                  (progressData[activeTab].completed /
                    progressData[activeTab].total) *
                    100
                )}
                %
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Risk-o-meter */}
        <View style={styles.riskHeaderSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Health Risk Assessment
          </Text>
        </View>

        <View style={styles.riskContainer}>
          {riskData.map((item, index) => renderRiskMeter(item, index))}
        </View>

        {/* Quick Actions */}
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <Animated.View
          style={[
            styles.actionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.actionRow}>
            <Button
              mode="contained-tonal"
              icon="plus"
              style={styles.actionButton}
              contentStyle={styles.actionButtonContent}
              onPress={() => showComingSoon("Add Goal")}
            >
              Add Goal
            </Button>
            <Button
              mode="contained-tonal"
              icon="chart-line"
              style={styles.actionButton}
              contentStyle={styles.actionButtonContent}
              onPress={() => showComingSoon("Insights")}
            >
              Insights
            </Button>
          </View>
          <View style={styles.actionRow}>
            <Button
              mode="contained-tonal"
              icon="doctor"
              style={styles.actionButton}
              contentStyle={styles.actionButtonContent}
              onPress={() => showComingSoon("Health Tips")}
            >
              Health Tips
            </Button>
            <Button
              mode="contained-tonal"
              icon="account"
              style={styles.actionButton}
              contentStyle={styles.actionButtonContent}
              onPress={() => router.push("/profile")}
            >
              Profile
            </Button>
          </View>
        </Animated.View>

          <View style={{ height: 50 }} />

      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  circle1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(108, 99, 255, 0.08)",
    top: -100,
    right: -100,
  },
  circle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(77, 182, 172, 0.06)",
    bottom: -80,
    left: -80,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontWeight: "700",
    color: Colors.text,
    fontSize: 19,
  },
  date: {
    color: "#607D8B",
    marginTop: 4,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  profileIconText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: 16,
    color: Colors.text,
  },
  wellnessContainer: {
    marginBottom: 24,
  },
  wellnessScrollContent: {
    paddingHorizontal: 4,
  },
  wellnessItem: {
    width: width * 0.75,
    marginRight: 16,
  },
  wellnessCard: {
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  wellnessCardContent: {
    padding: 16,
  },
  wellnessHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  wellnessIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + "20",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  wellnessIcon: {
    fontSize: 24,
  },
  wellnessTitle: {
    fontWeight: "600",
    color: Colors.text,
  },
  wellnessSubtitle: {
    color: "#607D8B",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
    marginBottom: 16,
  },
  wellnessFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakContainer: {
    backgroundColor: "#FFF5E6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streakText: {
    color: "#FF9800",
    fontWeight: "600",
  },
  progressContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: {
    color: "#607D8B",
    fontWeight: "500",
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  progressContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressStats: {
    flex: 1,
  },
  progressNumber: {
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  progressLabel: {
    color: "#607D8B",
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  progressPercentage: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  riskHeaderSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  riskContainer: {
    marginBottom: 24,
  },
  riskCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  riskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  riskTitle: {
    fontWeight: "600",
    color: Colors.text,
  },
  riskPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskLabel: {
    fontWeight: "600",
  },
  riskDescription: {
    color: "#607D8B",
    marginBottom: 12,
  },
  riskMeterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  riskMeter: {
    flex: 1,
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    marginRight: 12,
    overflow: "hidden",
  },
  riskMeterFill: {
    height: "100%",
    borderRadius: 3,
  },
  riskValue: {
    fontWeight: "600",
    color: Colors.text,
  },
  actionsContainer: {
    marginBottom: 40,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonContent: {
    paddingVertical: 8,
  },
  refreshContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
});
