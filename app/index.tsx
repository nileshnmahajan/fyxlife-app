// screens/WelcomeScreen.js
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Animate elements on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  return (

      <View style={styles.container}>
        {/* Background decorative elements */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        
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
          {/* Illustration with animation */}
          <Animated.View style={styles.imageContainer}>
            <Image
              source={require("../assets/logo-2.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Title with gradient effect */}
          <Text variant="headlineLarge" style={styles.title}>
            Welcome to <Text style={styles.brand}>Fyxlife</Text>
          </Text>

          {/* Subtitle */}
          <Text variant="bodyLarge" style={styles.subtitle}>
            Track your fitness, nourish your body, and find your calm.  
            Your personalized wellness journey starts here.
          </Text>

          {/* Benefits list */}
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>📊</Text>
              <Text style={styles.benefitText}>Track progress</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🎯</Text>
              <Text style={styles.benefitText}>Set goals</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>❤️</Text>
              <Text style={styles.benefitText}>Improve health</Text>
            </View>
          </View>

          {/* CTA Button with animation */}
          <Animated.View 
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Button
              mode="contained"
              onPress={() => router.push("/user-info")}
              // onPress={() => router.push("/dashboard")}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              contentStyle={styles.buttonContent}
              icon="arrow-right"
            >
              Get Started
            </Button>
            
            <Text style={styles.noteText}>
              Join thousands on their wellness journey
            </Text>
          </Animated.View>
        </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    padding: 24,
    overflow: "hidden",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(77, 182, 172, 0.06)",
    bottom: -80,
    right: -80,
  },
  imageContainer: {
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    color: Colors.text,
  },
  brand: {
    color: Colors.primary,
    fontWeight: "900",
  },
  subtitle: {
    textAlign: "center",
    color: "#607D8B",
    marginBottom: 40,
    lineHeight: 22,
    fontSize: 16,
  },
  benefitsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 48,
  },
  benefitItem: {
    alignItems: "center",
    flex: 1,
  },
  benefitIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 12,
    color: Colors.text,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    borderRadius: 16,
    paddingVertical: 6,
    width: "80%",
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
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
  noteText: {
    marginTop: 16,
    fontSize: 12,
    color: "#90A4AE",
  },
});