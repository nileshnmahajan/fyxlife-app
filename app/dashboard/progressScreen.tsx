// screens/ProgressScreen.js
import AppScreen from "@/components/AppScreen";
import { Colors } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, ProgressBar, Text } from "react-native-paper";

// Sample data - in a real app, this would come from your storage/API
const progressData = {
  daily: {
    completed: 2,
    total: 3,
    goals: [
      { name: "30 min workout", completed: true, type: "move" },
      { name: "5 healthy meals", completed: true, type: "eat" },
      { name: "15 min meditation", completed: false, type: "calm" },
    ],
  },
  weekly: {
    completed: 12,
    total: 21,
    trend: "up", // up, down, or same
  },
  monthly: {
    completed: 40,
    total: 90,
    trend: "up",
  },
  plan: {
    dailyTarget: 3,
    weeklyTarget: 20,
    monthlyTarget: 100,
    onTrack: true,
  },
};

export default function ProgressScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const getProgressPercentage = (completed, total) => {
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 50) return "#FF9800";
    return "#F44336";
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      default:
        return "➡️";
    }
  };

  const renderDailyGoals = () => {
    return progressData.daily.goals.map((goal, index) => (
      <View key={index} style={styles.goalItem}>
        <View
          style={[
            styles.goalIcon,
            {
              backgroundColor: goal.completed
                ? Colors.primary + "20"
                : "#f5f5f5",
            },
          ]}
        >
          <Text
            style={[
              styles.goalIconText,
              { color: goal.completed ? Colors.primary : "#9e9e9e" },
            ]}
          >
            {goal.type === "move" ? "🏃" : goal.type === "eat" ? "🍽" : "😌"}
          </Text>
        </View>
        <View style={styles.goalContent}>
          <Text variant="bodyMedium" style={styles.goalText}>
            {goal.name}
          </Text>
          <Text
            variant="bodySmall"
            style={[
              styles.goalStatus,
              { color: goal.completed ? "#4CAF50" : "#F44336" },
            ]}
          >
            {goal.completed ? "Completed" : "Pending"}
          </Text>
        </View>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: goal.completed ? "#4CAF50" : "#f5f5f5" },
          ]}
        />
      </View>
    ));
  };

  const renderProgressCard = (title, completed, total, target, trend) => {
    const percentage = getProgressPercentage(completed, total);
    const targetPercentage = target
      ? getProgressPercentage(completed, target)
      : null;
    const isOverTarget = target && completed > target;

    return (
      <Card style={styles.progressCard}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text variant="titleMedium" style={styles.cardTitle}>
              {title}
            </Text>
            {trend && (
              <Text style={styles.trendText}>{getTrendIcon(trend)}</Text>
            )}
          </View>

          <View style={styles.progressNumbers}>
            <Text variant="headlineMedium" style={styles.completedText}>
              {completed}
            </Text>
            <Text variant="bodyMedium" style={styles.totalText}>
              / {total} goals
            </Text>
          </View>

          <ProgressBar
            progress={percentage / 100}
            color={getStatusColor(percentage)}
            style={styles.progressBar}
          />

          <View style={styles.percentageRow}>
            <Text variant="bodySmall" style={styles.percentageText}>
              {Math.round(percentage)}% completed
            </Text>
            {target && (
              <Text
                variant="bodySmall"
                style={[
                  styles.targetText,
                  { color: isOverTarget ? "#4CAF50" : "#FF9800" },
                ]}
              >
                {isOverTarget
                  ? `${completed - target} above`
                  : `${target - completed} below`}{" "}
                target
              </Text>
            )}
          </View>

          {target && (
            <View style={styles.targetProgress}>
              <Text variant="bodySmall" style={styles.targetLabel}>
                Target: {target} goals ({Math.round(targetPercentage)}%)
              </Text>
              <ProgressBar
                progress={targetPercentage / 100}
                color={isOverTarget ? "#4CAF50" : "#FF9800"}
                style={styles.targetProgressBar}
              />
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

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
            Progress Summary
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Track your goals completion against your plan
          </Text>
        </View>

        {/* Today's Progress */}
        {renderProgressCard(
          "Today's Progress",
          progressData.daily.completed,
          progressData.daily.total,
          progressData.plan.dailyTarget,
          null
        )}

        {/* Today's Goals List */}
        <Card style={styles.goalsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.goalsTitle}>
              Today's Goals
            </Text>
            {renderDailyGoals()}
          </Card.Content>
        </Card>

        {/* Weekly Progress */}
        {renderProgressCard(
          "This Week",
          progressData.weekly.completed,
          progressData.weekly.total,
          progressData.plan.weeklyTarget,
          progressData.weekly.trend
        )}

        {/* Monthly Progress */}
        {renderProgressCard(
          "This Month",
          progressData.monthly.completed,
          progressData.monthly.total,
          progressData.plan.monthlyTarget,
          progressData.monthly.trend
        )}

        {/* Overall Status */}
        <Card style={styles.statusCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.statusTitle}>
              Overall Status
            </Text>
            <View style={styles.statusContent}>
              <View
                style={[
                  styles.statusIndicatorLarge,
                  {
                    backgroundColor: progressData.plan.onTrack
                      ? "#4CAF50"
                      : "#FF9800",
                  },
                ]}
              >
                <Text style={styles.statusEmoji}>
                  {progressData.plan.onTrack ? "🎯" : "⚠️"}
                </Text>
              </View>
              <View style={styles.statusText}>
                <Text variant="bodyLarge" style={styles.statusMessage}>
                  {progressData.plan.onTrack
                    ? "On track with your plan!"
                    : "Slightly behind your plan"}
                </Text>
                <Text variant="bodySmall" style={styles.statusDescription}>
                  {progressData.plan.onTrack
                    ? "Keep up the good work! You're meeting your daily targets."
                    : "Try to complete at least 3 goals daily to stay on track."}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

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
    backgroundColor: "rgba(108, 99, 255, 0.09)",
    bottom: -80,
    left: -80,
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
  progressCard: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: "600",
    color: Colors.text,
  },
  trendText: {
    fontSize: 20,
  },
  progressNumbers: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
  },
  completedText: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  totalText: {
    color: "#607D8B",
    marginLeft: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
  },
  percentageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  percentageText: {
    color: Colors.text,
    fontWeight: "500",
  },
  targetText: {
    fontWeight: "500",
  },
  targetProgress: {
    marginTop: 8,
  },
  targetLabel: {
    color: "#607D8B",
    marginBottom: 4,
  },
  targetProgressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#f0f0f0",
  },
  goalsCard: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
  },
  goalsTitle: {
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  goalIconText: {
    fontSize: 16,
  },
  goalContent: {
    flex: 1,
  },
  goalText: {
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 2,
  },
  goalStatus: {
    fontWeight: "500",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusCard: {
    marginBottom: 24,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
  },
  statusTitle: {
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  statusContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicatorLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  statusEmoji: {
    fontSize: 24,
  },
  statusText: {
    flex: 1,
  },
  statusMessage: {
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  statusDescription: {
    color: "#607D8B",
  },
  actions: {
    marginBottom: 32,
  },
  actionButton: {
    borderRadius: 12,
  },
});
