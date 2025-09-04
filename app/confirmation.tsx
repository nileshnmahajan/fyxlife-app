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
  TouchableOpacity,
  View
} from "react-native";
import { Text } from "react-native-paper";

const { width, height } = Dimensions.get('window');

export default function ConfirmationScreen() {
  const { name, age, gender, activityLevel } = useLocalSearchParams();
  const router = useRouter();
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Celebration sequence
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
      // Progress animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const confettiScale = confettiAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1]
  });

  const confettiOpacity = confettiAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  });

  const progressRotation = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const getWelcomeMessage = () => {
    if (activityLevel === "very-active") return "Fitness champion!";
    if (activityLevel === "active") return "Active lifestyle enthusiast!";
    if (activityLevel === "moderate") return "Wellness seeker!";
    if (activityLevel === "light") return "Health conscious individual!";
    return "Wellness journey beginner!";
  };

  const getActivityIcon = () => {
    if (activityLevel === "very-active") return "🏆";
    if (activityLevel === "active") return "⚡";
    if (activityLevel === "moderate") return "💪";
    if (activityLevel === "light") return "🚶";
    return "🌱";
  };

  return (
    <AppScreen style={{ padding: 0 }}>
      {/* Enhanced background gradient */}
      <LinearGradient
        colors={['#f7f9fc', '#e8f2ff', '#f0f9ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
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
          {/* Success icon with circular progress */}
          <View style={styles.successIconContainer}>
            <Animated.View 
              style={[
                styles.progressCircle,
                {
                  transform: [{ rotate: progressRotation }]
                }
              ]}
            />
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✓</Text>
            </View>
          </View>

          {/* Title with better hierarchy */}
          <Text variant="headlineSmall" style={styles.title}>
            Welcome to Fyxlife
          </Text>
          <Text variant="headlineSmall" style={styles.name}>
            {name || "User"}!
          </Text>

          {/* Subtitle */}
          <Text variant="bodyLarge" style={styles.subtitle}>
            {getWelcomeMessage()}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitleSecondary}>
            Your personalized wellness journey begins now.
          </Text>

          {/* Enhanced profile summary */}
          <View style={styles.profileSummary}>
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <Text style={styles.summaryIcon}>🎂</Text>
              </View>
              <Text variant="labelSmall" style={styles.summaryLabel}>Age</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>{age || '--'}</Text>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <Text style={styles.summaryIcon}>
                  {gender === 'male' ? '♂' : gender === 'female' ? '♀' : '⚧'}
                </Text>
              </View>
              <Text variant="labelSmall" style={styles.summaryLabel}>Gender</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {gender === 'male' ? 'Male' : 
                 gender === 'female' ? 'Female' : 
                 gender === 'other' ? 'Other' : '--'}
              </Text>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <Text style={styles.summaryIcon}>{getActivityIcon()}</Text>
              </View>
              <Text variant="labelSmall" style={styles.summaryLabel}>Activity</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {activityLevel === 'sedentary' ? 'Sedentary' :
                 activityLevel === 'light' ? 'Light' :
                 activityLevel === 'moderate' ? 'Moderate' :
                 activityLevel === 'active' ? 'Active' :
                 activityLevel === 'very-active' ? 'Very Active' : '--'}
              </Text>
            </View>
          </View>

          {/* Enhanced CTA Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={() => router.replace("/dashboard")}
              style={styles.button}
            >
              <Text style={styles.buttonLabel}>Launch Dashboard</Text>
              <View style={styles.buttonIcon}>
                <Text style={styles.buttonIconText}>→</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

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
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(108, 99, 255, 0.08)",
    top: -100,
    left: -100,
  },
  circle2: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(77, 182, 172, 0.06)",
    bottom: -80,
    right: -80,
  },
  circle3: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
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
    fontSize: 36,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 12,
  },
  successIconContainer: {
    marginBottom: 0,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 60,
    borderWidth: 4,
    borderLeftColor: Colors.primary,
    borderTopColor: Colors.primary,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  successIcon: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
    color: Colors.text,
    fontSize: 25,
  },
  name: {
    color: Colors.primary,
    fontWeight: '800',
    textAlign: "center",
    marginBottom: 20,
    fontSize: 26,
  },
  subtitle: {
    textAlign: "center",
    color: Colors.primary,
    marginBottom: 4,
    lineHeight: 24,
    fontWeight: '600',
    fontSize: 18,
  },
  subtitleSecondary: {
    textAlign: "center",
    color: "#607D8B",
    marginBottom: 32,
    lineHeight: 22,
  },
  profileSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryIcon: {
    fontSize: 18,
  },
  summaryLabel: {
    color: '#607D8B',
    marginBottom: 4,
    fontWeight: '500',
  },
  summaryValue: {
    color: Colors.text,
    fontWeight: '700',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginRight: 10,
  },
  buttonIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  note: {
    textAlign: 'center',
    color: '#90A4AE',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});