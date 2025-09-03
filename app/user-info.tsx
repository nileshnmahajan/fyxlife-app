// screens/UserInfoScreen.js
import AppScreen from "@/components/InputScreen";
import { Colors } from "@/constants/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  RadioButton,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";

export default function UserInfoScreen() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Calculate form completion percentage
  const formCompletion = () => {
    const fields = [name, age, phone, gender, activityLevel];
    const filled = fields.filter((field) => field !== "").length;
    return filled / fields.length;
  };

  useEffect(() => {
    // Animate progress bar based on form completion
    Animated.timing(progressAnim, {
      toValue: formCompletion(),
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    // Animate form entrance
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
    ]).start();
  }, [name, age, phone, gender, activityLevel]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Save user info to AsyncStorage
      await AsyncStorage.setItem(
        'userInfo',
        JSON.stringify({ name, age, phone, gender, activityLevel, height, weight })
      );
    } catch (e) {
      // handle error if needed
    }
    // Simulate API call or processing
    setTimeout(() => {
      setIsSubmitting(false);
      router.push({
        pathname: "/confirmation",
        params: {
          name,
          age,
          gender,
          activityLevel,
        },
      });
    }, 1500);
  };

  const isFormValid = () => {
    return name && age && phone && gender && activityLevel;
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <AppScreen style={{ padding: 0 }}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <Animated.View
                style={[styles.progressFill, { width: progressWidth }]}
              />
            </View>
            <Text variant="labelSmall" style={styles.progressText}>
              {Math.round(formCompletion() * 100)}% Complete
            </Text>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text variant="headlineSmall" style={styles.title}>
                Tell us about yourself
              </Text>

              <Text variant="bodyMedium" style={styles.subtitle}>
                We'll use this information to personalize your wellness journey
              </Text>

              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text variant="labelMedium" style={styles.inputLabel}>
                  Full Name
                </Text>
                <TextInput
                  mode="outlined"
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  left={
                    <TextInput.Icon icon="account" color={Colors.primary} />
                  }
                />
              </View>

              {/* Age Input */}
              <View style={styles.inputContainer}>
                <Text variant="labelMedium" style={styles.inputLabel}>
                  Age
                </Text>
                <TextInput
                  mode="outlined"
                  value={age}
                  onChangeText={setAge}
                  placeholder="Enter your age"
                  keyboardType="numeric"
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  left={<TextInput.Icon icon="cake" color={Colors.primary} />}
                />
                <Text variant="bodySmall" style={{ color: '#607D8B', marginTop: 4, marginLeft: 2 }}>
                  Age in years
                </Text>
              </View>

              {/* Phone Input */}
              <View style={styles.inputContainer}>
                <Text variant="labelMedium" style={styles.inputLabel}>
                  Phone Number
                </Text>
                <TextInput
                  mode="outlined"
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  left={<TextInput.Icon icon="phone" color={Colors.primary} />}
                />
              </View>

              {/* Gender Selection */}
              <View style={styles.inputContainer}>
                <Text variant="labelMedium" style={styles.inputLabel}>
                  Gender
                </Text>
                <SegmentedButtons
                  value={gender}
                  onValueChange={setGender}
                  buttons={[
                    {
                      value: "male",
                      label: "Male",
                      icon: "gender-male",
                      style:
                        gender === "male"
                          ? styles.selectedSegment
                          : styles.segment,
                      labelStyle:
                        gender === "male"
                          ? { color: "white" }
                          : { color: Colors.text },
                    },
                    {
                      value: "female",
                      label: "Female",
                      icon: "gender-female",
                      style:
                        gender === "female"
                          ? [
                              styles.selectedSegment,
                              { borderLeftWidth: 0, borderRightWidth: 0 },
                            ]
                          : [
                              styles.segment,
                              { borderLeftWidth: 0, borderRightWidth: 0 },
                            ],
                      labelStyle:
                        gender === "female"
                          ? { color: "white" }
                          : { color: Colors.text },
                    },
                    {
                      value: "other",
                      label: "Other",
                      icon: "gender-male-female",
                      style:
                        gender === "other"
                          ? [styles.selectedSegment, { borderLeftWidth: 0 }]
                          : [styles.segment, { borderLeftWidth: 0 }],
                      labelStyle:
                        gender === "other"
                          ? { color: "white" }
                          : { color: Colors.text },
                    },
                  ]}
                  style={styles.segmentedButtons}
                />
              </View>

              {/* Activity Level */}
              <View style={styles.inputContainer}>
                <Text variant="labelMedium" style={styles.inputLabel}>
                  Activity Level
                </Text>
                <RadioButton.Group
                  onValueChange={setActivityLevel}
                  value={activityLevel}
                >
                  <View style={styles.radioContainer}>
                    <View style={styles.radioOption}>
                      <RadioButton value="sedentary" color={Colors.primary} />
                      <Text
                        variant="bodyMedium"
                        onPress={() => setActivityLevel("sedentary")}
                      >
                        Sedentary (little to no exercise)
                      </Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="light" color={Colors.primary} />
                      <Text
                        variant="bodyMedium"
                        onPress={() => setActivityLevel("light")}
                      >
                        Light (1-3 days/week)
                      </Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="moderate" color={Colors.primary} />
                      <Text
                        variant="bodyMedium"
                        onPress={() => setActivityLevel("moderate")}
                      >
                        Moderate (3-5 days/week)
                      </Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="active" color={Colors.primary} />
                      <Text
                        variant="bodyMedium"
                        onPress={() => setActivityLevel("active")}
                      >
                        Active (6-7 days/week)
                      </Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="very-active" color={Colors.primary} />
                      <Text
                        variant="bodyMedium"
                        onPress={() => setActivityLevel("very-active")}
                      >
                        Very Active (professional athlete)
                      </Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>

              {/* Optional Fields */}
              <View style={styles.optionalSection}>
                <Text variant="titleSmall" style={styles.optionalTitle}>
                  Optional Information
                </Text>
                <Text variant="bodySmall" style={styles.optionalSubtitle}>
                  Help us personalize your experience even more
                </Text>

                <View style={styles.row}>
                  <View style={[styles.inputContainer, styles.halfInput]}>
                    <Text variant="labelMedium" style={styles.inputLabel}>
                      Height (cm)
                    </Text>
                    <TextInput
                      mode="outlined"
                      value={height}
                      onChangeText={setHeight}
                      placeholder="e.g. 175"
                      keyboardType="numeric"
                      style={styles.input}
                      outlineStyle={styles.inputOutline}
                    />
                  </View>

                  <View style={[styles.inputContainer, styles.halfInput]}>
                    <Text variant="labelMedium" style={styles.inputLabel}>
                      Weight (kg)
                    </Text>
                    <TextInput
                      mode="outlined"
                      value={weight}
                      onChangeText={setWeight}
                      placeholder="e.g. 68"
                      keyboardType="numeric"
                      style={styles.input}
                      outlineStyle={styles.inputOutline}
                    />
                  </View>
                </View>
              </View>

              {/* Submit Button */}
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={[styles.button, !isFormValid() && styles.buttonDisabled]}
                labelStyle={styles.buttonLabel}
                disabled={!isFormValid() || isSubmitting}
                contentStyle={styles.buttonContent}
              >
                {isSubmitting ? <ActivityIndicator color="#fff" /> : "Continue"}
              </Button>
            </Animated.View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    // backgroundColor: Colors.background,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    // backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  progressBackground: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    color: Colors.text,
    textAlign: "center",
  },
  scrollView: {
    // flex: 1,
    // backgroundColor:"red"
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  formContainer: {
    width: "100%",
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
    color: Colors.text,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#607D8B",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 8,
    color: Colors.text,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
  },
  inputOutline: {
    borderRadius: 12,
    borderWidth: 1.5,
  },
  segmentedButtons: {
    borderRadius: 12,
    overflow: "hidden",
  },
  segment: {
    // borderRadius: 10,
  },
  selectedSegment: {
    backgroundColor: Colors.primary,
    // borderRadius: 10,
    color: "white",
  },
  radioContainer: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#ccc",
    padding: 8,
    backgroundColor: "#fff",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  optionalSection: {
    marginTop: 16,
    marginBottom: 32,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
  },
  optionalTitle: {
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.text,
  },
  optionalSubtitle: {
    color: "#607D8B",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  button: {
    borderRadius: 12,
    paddingVertical: 6,
    marginTop: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
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
});
