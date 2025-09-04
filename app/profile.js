import AppScreen from "@/components/AppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, IconButton, Text, TouchableRipple } from "react-native-paper";

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
    setShowLogoutModal(false);
    router.replace("/user-info");
  };

  const handleGoBack = () => {
    router.back();
  };

  const getActivityLevelText = (level) => {
    switch (level) {
      case 'sedentary': return 'Sedentary (little to no exercise)';
      case 'light': return 'Light (1-3 days/week)';
      case 'moderate': return 'Moderate (3-5 days/week)';
      case 'active': return 'Active (6-7 days/week)';
      case 'very-active': return 'Very Active (professional athlete)';
      default: return level;
    }
  };

  const getGenderText = (gender) => {
    switch (gender) {
      case 'male': return 'Male';
      case 'female': return 'Female';
      case 'other': return 'Other';
      default: return gender;
    }
  };

  return (
    <AppScreen style={{ padding: 0 }}>
      {/* Enhanced Background */}
      <LinearGradient
        colors={["#f7f9fc", "#e8f2ff", "#f0f9ff"]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleGoBack}
          style={styles.backButton}
          iconColor="#6366F1"
        />
        <Text variant="headlineSmall" style={styles.title}>
          Profile
        </Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Avatar.Icon
              size={96}
              icon="account"
              color="#fff"
              style={styles.avatar}
            />
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarBadgeText}>👑</Text>
            </View>
          </View>
          <Text variant="titleLarge" style={styles.userName}>
            {userInfo?.name || "User"}
          </Text>
          <Text variant="bodyMedium" style={styles.userStatus}>
            Premium Member
          </Text>
        </View>

        {/* Profile Information Card */}
        <View style={styles.profileCard}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Personal Information
          </Text>
          
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>👤</Text>
              </View>
              <View style={styles.infoContent}>
                <Text variant="labelSmall" style={styles.infoLabel}>Name</Text>
                <Text variant="bodyMedium" style={styles.infoValue}>
                  {userInfo?.name || "Not provided"}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>🎂</Text>
              </View>
              <View style={styles.infoContent}>
                <Text variant="labelSmall" style={styles.infoLabel}>Age</Text>
                <Text variant="bodyMedium" style={styles.infoValue}>
                  {userInfo?.age ? `${userInfo.age} years` : "Not provided"}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>📱</Text>
              </View>
              <View style={styles.infoContent}>
                <Text variant="labelSmall" style={styles.infoLabel}>Phone</Text>
                <Text variant="bodyMedium" style={styles.infoValue}>
                  {userInfo?.phone || "Not provided"}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>
                  {userInfo?.gender === 'male' ? '♂' : 
                   userInfo?.gender === 'female' ? '♀' : '⚧'}
                </Text>
              </View>
              <View style={styles.infoContent}>
                <Text variant="labelSmall" style={styles.infoLabel}>Gender</Text>
                <Text variant="bodyMedium" style={styles.infoValue}>
                  {userInfo?.gender ? getGenderText(userInfo.gender) : "Not provided"}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>💪</Text>
              </View>
              <View style={styles.infoContent}>
                <Text variant="labelSmall" style={styles.infoLabel}>Activity Level</Text>
                <Text variant="bodyMedium" style={styles.infoValue}>
                  {userInfo?.activityLevel ? getActivityLevelText(userInfo.activityLevel) : "Not provided"}
                </Text>
              </View>
            </View>

            {userInfo?.height && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoItem}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>📏</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text variant="labelSmall" style={styles.infoLabel}>Height</Text>
                    <Text variant="bodyMedium" style={styles.infoValue}>
                      {userInfo.height} cm
                    </Text>
                  </View>
                </View>
              </>
            )}

            {userInfo?.weight && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoItem}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>⚖️</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text variant="labelSmall" style={styles.infoLabel}>Weight</Text>
                    <Text variant="bodyMedium" style={styles.infoValue}>
                      {userInfo.weight} kg
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableRipple
          onPress={() => setShowLogoutModal(true)}
          style={styles.logoutButton}
          rippleColor="rgba(220, 38, 38, 0.1)"
        >
          <View style={styles.logoutContent}>
            <View style={styles.logoutIcon}>
              <Text style={styles.logoutIconText}>🚪</Text>
            </View>
            <Text variant="bodyLarge" style={styles.logoutText}>
              Logout
            </Text>
          </View>
        </TouchableRipple>

        {/* App Version */}
        <Text style={styles.version}>
          App Version: {Constants.expoConfig?.version || Constants.manifest?.version || "1.0.0"}
        </Text>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text variant="titleLarge" style={styles.modalTitle}>
                Confirm Logout
              </Text>
            </View>
            
            <View style={styles.modalBody}>
              <View style={styles.modalIcon}>
                <Text style={styles.modalIconText}>⚠️</Text>
              </View>
              <Text variant="bodyMedium" style={styles.modalMessage}>
                Are you sure you want to logout?{'\n'}
                You'll need to sign in again to access your data.
              </Text>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmButtonText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(108, 99, 255, 0.08)",
    top: -120,
    right: -120,
    zIndex: 1,
  },
  circle2: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(77, 182, 172, 0.06)",
    bottom: -100,
    left: -100,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    zIndex: 2,
  },
  backButton: {
    margin: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    color: '#1F2937',
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 32,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: "#6366F1",
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarBadgeText: {
    fontSize: 16,
  },
  userName: {
    fontWeight: "700",
    color: '#1F2937',
    marginBottom: 4,
  },
  userStatus: {
    color: '#6366F1',
    fontWeight: '500',
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  cardTitle: {
    fontWeight: "700",
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoList: {
    // Single column layout
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
    fontSize: 12,
  },
  infoValue: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logoutIcon: {
    marginRight: 12,
  },
  logoutIconText: {
    fontSize: 20,
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '600',
  },
  version: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  modalBody: {
    padding: 24,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalIconText: {
    fontSize: 48,
  },
  modalMessage: {
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  confirmButton: {
    backgroundColor: '#DC2626',
  },
  cancelButtonText: {
    color: '#4B5563',
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});