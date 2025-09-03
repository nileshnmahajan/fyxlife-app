// screens/RiskMeterScreen.js
import AppScreen from "@/components/AppScreen";
import { Colors } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, ProgressBar, Text } from "react-native-paper";

// Sample Risk Data (point-in-time snapshot)
const riskData = [
  {
    system: "Cardio (Heart & Vessels)",
    risks: [
      { name: "Heart Disease", percentage: 60, severity: "moderate" },
      { name: "High Blood Pressure", percentage: 40, severity: "low" },
    ],
  },
  {
    system: "Endocrine (Metabolism)",
    risks: [
      { name: "Early Onset Diabetes", percentage: 75, severity: "high" },
      { name: "Obesity", percentage: 50, severity: "moderate" },
    ],
  },
  {
    system: "Musculoskeletal",
    risks: [
      { name: "Osteoarthritis", percentage: 30, severity: "low" },
      { name: "Lower Back Pain", percentage: 45, severity: "low" },
    ],
  },
  {
    system: "Neuro (Brain & Nerves)",
    risks: [
      { name: "Migraine", percentage: 25, severity: "low" },
      { name: "Cognitive Decline", percentage: 55, severity: "moderate" },
    ],
  },
  {
    system: "Respiratory",
    risks: [
      { name: "Asthma", percentage: 20, severity: "low" },
      { name: "Sleep Apnea", percentage: 40, severity: "moderate" },
    ],
  },
];

export default function RiskMeterScreen() {
  const router = useRouter();

  const getRiskColor = (percentage) => {
    if (percentage >= 70) return "#F44336"; // high risk - red
    if (percentage >= 40) return "#FF9800"; // moderate - orange
    return "#4CAF50"; // low risk - green
  };

  const getRiskCircleColor = (percentage) => {
    if (percentage >= 70) return "#F44336"; // red
    if (percentage >= 40) return "#FF9800"; // orange
    return "#4CAF50"; // green
  };

  const renderRiskCard = (system, risks) => (
    <Card key={system} style={styles.riskCard}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.systemTitle}>
          {system}
        </Text>
        {risks.map((risk, index) => (
          <View key={index} style={styles.riskItem}>
            <View style={styles.riskLabel}>
              <Text style={styles.riskName}>{risk.name}</Text>
              <View
                style={[
                  styles.riskCircle,
                  { backgroundColor: getRiskCircleColor(risk.percentage) },
                ]}
              />
            </View>
            <ProgressBar
              progress={risk.percentage / 100}
              color={getRiskColor(risk.percentage)}
              style={styles.riskProgress}
            />
            <Text variant="bodySmall" style={styles.riskPercentage}>
              {risk.percentage}% risk ({risk.severity})
            </Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );

  return (
    <AppScreen>
      <LinearGradient
        colors={["#f7f9fc", "#e8f2ff"]}
        style={styles.backgroundGradient}
      />
        <View style={styles.circle1} />
            <View style={styles.circle2} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            Risk-o-meter
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Snapshot of your body’s current health risks by system
          </Text>
        </View>

        {riskData.map((item) => renderRiskCard(item.system, item.risks))}

        <View style={styles.actions} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  riskCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 8,
    borderWidth: 2,
    borderColor: "#eee",
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    color: "#607D8B",
  },
  riskCard: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
  },
  systemTitle: {
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  riskItem: {
    marginBottom: 12,
  },
  riskLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  riskName: {
    fontWeight: "500",
    color: Colors.text,
  },

  riskProgress: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#f0f0f0",
    marginBottom: 4,
  },
  riskPercentage: {
    color: "#607D8B",
  },
  actions: {
    marginBottom: 32,
  },
  actionButton: {
    borderRadius: 12,
  },
});
