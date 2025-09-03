// screens/ConfirmationScreen.js
import AppScreen from "@/components/AppScreen";
import { Colors } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View
} from "react-native";
import { Button, Text } from "react-native-paper";

const { width, height } = Dimensions.get('window');

export default function ConfirmationScreen() {
  const { name, age, gender, activityLevel } = useLocalSearchParams();
  const router = useRouter();
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Celebration sequence (no swing/floating, no progress)
    Animated.sequence([
      // Initial confetti burst
      Animated.timing(confettiAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Main content entrance
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
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
      ]),
    ]).start();
  }, []);

  const confettiScale = confettiAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1]
  });

  const confettiOpacity = confettiAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  });



  const getWelcomeMessage = () => {
    if (activityLevel === "very-active") return "Fitness champion!";
    if (activityLevel === "active") return "Active lifestyle enthusiast!";
    if (activityLevel === "moderate") return "Wellness seeker!";
    if (activityLevel === "light") return "Health conscious individual!";
    return "Wellness journey beginner!";
  };

  return (
    <AppScreen style={{ padding: 0 }}>
      {/* Background with gradient */}
      <LinearGradient
        colors={['#f7f9fc', '#e8f2ff', '#f0f9ff']}
        style={styles.backgroundGradient}
      />
      
      {/* Decorative elements */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
      
      {/* Confetti elements */}
      <Animated.View 
        style={[
          styles.confetti1,
          { 
            opacity: confettiOpacity,
            transform: [{ scale: confettiScale }] 
          }
        ]}
      >
        <Text style={styles.confettiText}>🎉</Text>
      </Animated.View>
      <Animated.View 
        style={[
          styles.confetti2,
          { 
            opacity: confettiOpacity,
            transform: [{ scale: confettiScale }] 
          }
        ]}
      >
        <Text style={styles.confettiText}>✨</Text>
      </Animated.View>
      <Animated.View 
        style={[
          styles.confetti3,
          { 
            opacity: confettiOpacity,
            transform: [{ scale: confettiScale }] 
          }
        ]}
      >
        <Text style={styles.confettiText}>🌟</Text>
      </Animated.View>
      <Animated.View 
        style={[
          styles.confetti4,
          { 
            opacity: confettiOpacity,
            transform: [{ scale: confettiScale }] 
          }
        ]}
      >
        <Text style={styles.confettiText}>🥳</Text>
      </Animated.View>

      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {/* Success icon */}
          <View style={styles.successIconContainer}>
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✓</Text>
            </View>
          </View>

          {/* Title */}
          <Text variant="headlineMedium" style={styles.title}>
            Welcome to Fyxlife,{"\n"}
            <Text style={styles.name}>{name || "User"}!</Text>
          </Text>

          {/* Subtitle */}
          <Text variant="bodyLarge" style={styles.subtitle}>
            {getWelcomeMessage()}{"\n"}
            Your personalized wellness journey begins now.
          </Text>

          {/* Profile summary */}
          <View style={styles.profileSummary}>
            <View style={styles.summaryItem}>
              <Text variant="labelSmall" style={styles.summaryLabel}>Age</Text>
              <Text variant="bodyMedium" style={styles.summaryValue}>{age || '--'}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text variant="labelSmall" style={styles.summaryLabel}>Gender</Text>
              <Text variant="bodyMedium" style={styles.summaryValue}>
                {gender === 'male' ? 'Male' : 
                 gender === 'female' ? 'Female' : 
                 gender === 'other' ? 'Other' : '--'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text variant="labelSmall" style={styles.summaryLabel}>Activity</Text>
              <Text variant="bodyMedium" style={styles.summaryValue}>
                {activityLevel === 'sedentary' ? 'Sedentary' :
                 activityLevel === 'light' ? 'Light' :
                 activityLevel === 'moderate' ? 'Moderate' :
                 activityLevel === 'active' ? 'Active' :
                 activityLevel === 'very-active' ? 'Very Active' : '--'}
              </Text>
            </View>
          </View>

          {/* CTA Button */}
          <Button
            mode="contained"
            onPress={() => router.replace("/dashboard")}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}
            icon="rocket-launch"
          >
            Launch Dashboard
          </Button>

          {/* Additional note */}
          <Text variant="bodySmall" style={styles.note}>
            We've prepared personalized recommendations based on your profile
          </Text>
        </Animated.View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  backgroundGradient: {
    position: 'absolute',
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
    top: -80,
    left: -80,
  },
  circle2: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(77, 182, 172, 0.06)",
    bottom: -60,
    right: -60,
  },
  circle3: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 111, 97, 0.05)",
    top: '30%',
    right: '10%',
  },
  confetti1: {
    position: 'absolute',
    top: '15%',
    left: '10%',
  },
  confetti2: {
    position: 'absolute',
    top: '25%',
    right: '15%',
  },
  confetti3: {
    position: 'absolute',
    bottom: '30%',
    left: '20%',
  },
  confetti4: {
    position: 'absolute',
    bottom: '20%',
    right: '10%',
  },
  confettiText: {
    fontSize: 32,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Removed progress bar styles
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  successIconText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: Colors.text,
    lineHeight: 36,
  },
  name: {
    color: Colors.primary,
    fontWeight: '800',
  },
  subtitle: {
    textAlign: "center",
    color: "#607D8B",
    marginBottom: 32,
    lineHeight: 24,
  },
  profileSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#607D8B',
    marginBottom: 4,
  },
  summaryValue: {
    color: Colors.text,
    fontWeight: '600',
  },
  button: {
    borderRadius: 16,
    paddingVertical: 6,
    width: "80%",
    marginBottom: 16,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  note: {
    textAlign: 'center',
    color: '#90A4AE',
    fontStyle: 'italic',
  },
});