import Login from "@/components/UserAuthentication/Login";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MyProfileSettings = () => {
  const { login, isLogged, logout } = useAuth();
  const router = useRouter();
  return (
    <>
      {isLogged == true ? (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.replace("/")}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>MY PROFILE SETTINGS</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
              <View style={styles.avatarContainer}>
                <FontAwesome5 name="user-alt" size={60} color="#000" />
                <TouchableOpacity style={styles.leftIcon}>
                  <Ionicons name="camera" size={22} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightIcon}>
                  <Ionicons name="image" size={22} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionRow}
                // onPress={() => {
                //   router.replace("/explore/edit-profile");
                // }}
              >
                <MaterialIcons name="edit" size={20} color="#000" />
                <Text style={styles.optionText}>Edit Profile</Text>
                <Ionicons name="chevron-forward" size={20} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionRow}>
                <Ionicons name="eye-outline" size={20} color="#000" />
                <Text style={styles.optionText}>Change Password</Text>
                <Ionicons name="chevron-forward" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Fixed Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>© Timesera 2025 ( V-1.0.5 )</Text>
            <Image
              source={require("../../assets/images/icon.png")} // replace with your logo
              style={styles.footerLogo}
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>
      ) : (
        <ImageBackground
          source={require("../../assets/images/splash-icon.png")}
          style={styles.logoutContainer}
        >
          <Login />
        </ImageBackground>
      )}
    </>
  );
};

export default MyProfileSettings;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // ensures scroll area above footer
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatarContainer: {
    backgroundColor: "#f5f5f5",
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 25,
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftIcon: {
    position: "absolute",
    left: 20,
    top: "50%",
  },
  rightIcon: {
    position: "absolute",
    right: 20,
    top: "50%",
  },
  optionsContainer: {
    width: "90%",
    alignSelf: "center",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    justifyContent: "space-between",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginLeft: 12,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    backgroundColor: "#002D6B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
  },
  footerLogo: {
    width: 18,
    height: 18,
    marginLeft: 6,
  },
  logoutContainer: {
    flex: 1, // take full screen
  },
});
