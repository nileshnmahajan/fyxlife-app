// screens/UserInfoScreen.js
import AppScreen from "@/components/InputScreen";
import { Colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  RadioButton,
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
        "userInfo",
        JSON.stringify({
          name,
          age,
          phone,
          gender,
          activityLevel,
          height,
          weight,
        })
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

      <View style={styles.container}>
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text variant="labelMedium" style={styles.progressLabel}>
              Profile Completion
            </Text>
            <Text variant="labelMedium" style={styles.progressPercentage}>
              {Math.round(formCompletion() * 100)}%
            </Text>
          </View>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[styles.progressFill, { width: progressWidth }]}
            />
          </View>
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
              <Text variant="labelLarge" style={styles.inputLabel}>
                Full Name
              </Text>
              <TextInput
                mode="flat"
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                style={styles.input}
                underlineColor="transparent"
                activeUnderlineColor={Colors.primary}
                left={
                  <TextInput.Icon
                    icon="account"
                    color={Colors.primary}
                    size={20}
                  />
                }
                theme={{
                  colors: {
                    primary: Colors.primary,
                    background: "#fff",
                  },
                  roundness: 12,
                }}
              />
            </View>

            {/* Age Input */}
            <View style={styles.inputContainer}>
              <Text variant="labelLarge" style={styles.inputLabel}>
                Age
              </Text>
              <TextInput
                mode="flat"
                value={age}
                onChangeText={setAge}
                placeholder="Enter your age"
                keyboardType="numeric"
                style={styles.input}
                underlineColor="transparent"
                activeUnderlineColor={Colors.primary}
                left={
                  <TextInput.Icon
                    icon="cake"
                    color={Colors.primary}
                    size={20}
                  />
                }
                theme={{
                  colors: {
                    primary: Colors.primary,
                    background: "#fff",
                  },
                  roundness: 12,
                }}
              />
              <Text variant="bodySmall" style={styles.inputHint}>
                Age in years
              </Text>
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text variant="labelLarge" style={styles.inputLabel}>
                Phone Number
              </Text>
              <TextInput
                mode="flat"
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                style={styles.input}
                underlineColor="transparent"
                activeUnderlineColor={Colors.primary}
                left={
                  <TextInput.Icon
                    icon="phone"
                    color={Colors.primary}
                    size={20}
                  />
                }
                theme={{
                  colors: {
                    primary: Colors.primary,
                    background: "#fff",
                  },
                  roundness: 12,
                }}
              />
            </View>

            {/* Gender Selection */}
            <View style={styles.inputContainer}>
              <Text variant="labelLarge" style={styles.inputLabel}>
                Gender
              </Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === "male" && styles.genderOptionSelected,
                  ]}
                  onPress={() => setGender("male")}
                  activeOpacity={0.8}
                >
                  <View style={styles.genderIconContainer}>
                    <Text
                      style={[
                        styles.genderIcon,
                        gender === "male" && styles.genderIconSelected,
                      ]}
                    >
                      ♂
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.genderText,
                      gender === "male" && styles.genderTextSelected,
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === "female" && styles.genderOptionSelected,
                  ]}
                  onPress={() => setGender("female")}
                  activeOpacity={0.8}
                >
                  <View style={styles.genderIconContainer}>
                    <Text
                      style={[
                        styles.genderIcon,
                        gender === "female" && styles.genderIconSelected,
                      ]}
                    >
                      ♀
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.genderText,
                      gender === "female" && styles.genderTextSelected,
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === "other" && styles.genderOptionSelected,
                  ]}
                  onPress={() => setGender("other")}
                  activeOpacity={0.8}
                >
                  <View style={styles.genderIconContainer}>
                    <Text
                      style={[
                        styles.genderIcon,
                        gender === "other" && styles.genderIconSelected,
                      ]}
                    >
                      ⚧
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.genderText,
                      gender === "other" && styles.genderTextSelected,
                    ]}
                  >
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Activity Level */}
            <View style={styles.inputContainer}>
              <Text variant="labelLarge" style={styles.inputLabel}>
                Activity Level
              </Text>
              <View style={styles.activityContainer}>
                <RadioButton.Group
                  onValueChange={setActivityLevel}
                  value={activityLevel}
                >
                  <TouchableOpacity
                    style={[
                      styles.activityOption,
                      activityLevel === "sedentary" &&
                        styles.activityOptionSelected,
                    ]}
                    onPress={() => setActivityLevel("sedentary")}
                    activeOpacity={0.8}
                  >
                    <View style={styles.activityRadio}>
                      <RadioButton value="sedentary" color={Colors.primary} />
                      <Text variant="bodyMedium" style={styles.activityText}>
                        Sedentary
                      </Text>
                    </View>
                    <Text
                      variant="bodySmall"
                      style={styles.activityDescription}
                    >
                      Little to no exercise
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.activityOption,
                      activityLevel === "light" &&
                        styles.activityOptionSelected,
                    ]}
                    onPress={() => setActivityLevel("light")}
                    activeOpacity={0.8}
                  >
                    <View style={styles.activityRadio}>
                      <RadioButton value="light" color={Colors.primary} />
                      <Text variant="bodyMedium" style={styles.activityText}>
                        Light
                      </Text>
                    </View>
                    <Text
                      variant="bodySmall"
                      style={styles.activityDescription}
                    >
                      1-3 days/week
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.activityOption,
                      activityLevel === "moderate" &&
                        styles.activityOptionSelected,
                    ]}
                    onPress={() => setActivityLevel("moderate")}
                    activeOpacity={0.8}
                  >
                    <View style={styles.activityRadio}>
                      <RadioButton value="moderate" color={Colors.primary} />
                      <Text variant="bodyMedium" style={styles.activityText}>
                        Moderate
                      </Text>
                    </View>
                    <Text
                      variant="bodySmall"
                      style={styles.activityDescription}
                    >
                      3-5 days/week
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.activityOption,
                      activityLevel === "active" &&
                        styles.activityOptionSelected,
                    ]}
                    onPress={() => setActivityLevel("active")}
                    activeOpacity={0.8}
                  >
                    <View style={styles.activityRadio}>
                      <RadioButton value="active" color={Colors.primary} />
                      <Text variant="bodyMedium" style={styles.activityText}>
                        Active
                      </Text>
                    </View>
                    <Text
                      variant="bodySmall"
                      style={styles.activityDescription}
                    >
                      6-7 days/week
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.activityOption,
                      activityLevel === "very-active" &&
                        styles.activityOptionSelected,
                    ]}
                    onPress={() => setActivityLevel("very-active")}
                    activeOpacity={0.8}
                  >
                    <View style={styles.activityRadio}>
                      <RadioButton value="very-active" color={Colors.primary} />
                      <Text variant="bodyMedium" style={styles.activityText}>
                        Very Active
                      </Text>
                    </View>
                    <Text
                      variant="bodySmall"
                      style={styles.activityDescription}
                    >
                      Professional athlete
                    </Text>
                  </TouchableOpacity>
                </RadioButton.Group>
              </View>
            </View>

            {/* Optional Fields */}
            <View style={styles.optionalSection}>
              <View style={styles.optionalHeader}>
                <Text variant="titleMedium" style={styles.optionalTitle}>
                  Optional Information
                </Text>
                <View style={styles.optionalDivider} />
              </View>
              <Text variant="bodyMedium" style={styles.optionalSubtitle}>
                Help us personalize your experience even more
              </Text>

              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text variant="labelMedium" style={styles.inputLabel}>
                    Height (cm)
                  </Text>
                  <TextInput
                    mode="flat"
                    value={height}
                    onChangeText={setHeight}
                    placeholder="e.g. 175"
                    keyboardType="numeric"
                    style={styles.input}
                    underlineColor="transparent"
                    activeUnderlineColor={Colors.primary}
                    theme={{
                      colors: {
                        primary: Colors.primary,
                        background: "#fff",
                      },
                      roundness: 12,
                    }}
                  />
                </View>

                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text variant="labelMedium" style={styles.inputLabel}>
                    Weight (kg)
                  </Text>
                  <TextInput
                    mode="flat"
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="e.g. 68"
                    keyboardType="numeric"
                    style={styles.input}
                    underlineColor="transparent"
                    activeUnderlineColor={Colors.primary}
                    theme={{
                      colors: {
                        primary: Colors.primary,
                        background: "#fff",
                      },
                      roundness: 12,
                    }}
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
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                "Continue to Your Plan"
              )}
            </Button>
          </Animated.View>
        </ScrollView>
      </View>
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
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    color: Colors.text,
    fontWeight: "600",
  },
  progressPercentage: {
    color: Colors.primary,
    fontWeight: "700",
  },
  progressBackground: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
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
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    marginBottom: 8,
    color: Colors.text,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
  },
  inputHint: {
    color: "#607D8B",
    marginTop: 4,
    marginLeft: 12,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  genderOption: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#f8f9fa",
    width: "30%",
    borderWidth: 2,
    borderColor: "transparent",
  },
  genderOptionSelected: {
    backgroundColor: "rgba(108, 99, 255, 0.1)",
    borderColor: Colors.primary,
  },
  genderIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(108, 99, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  genderIcon: {
    fontSize: 20,
    color: Colors.text,
  },
  genderIconSelected: {
    color: Colors.primary,
  },
  genderText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  genderTextSelected: {
    color: Colors.primary,
    fontWeight: "600",
  },
  activityContainer: {
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  activityOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityOptionSelected: {
    backgroundColor: "rgba(108, 99, 255, 0.05)",
  },
  activityRadio: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  activityText: {
    marginLeft: 8,
    fontWeight: "500",
  },
  activityDescription: {
    color: "#607D8B",
    marginLeft: 48,
  },
  optionalSection: {
    marginTop: 24,
    marginBottom: 32,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
  },
  optionalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  optionalTitle: {
    fontWeight: "700",
    color: Colors.text,
    marginRight: 12,
  },
  optionalDivider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
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
    borderRadius: 16,
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
