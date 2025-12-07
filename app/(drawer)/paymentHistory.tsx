import PaymentHistory from "@/components/DrawerScreens/PaymentHistory";
import Login from "@/components/UserAuthentication/Login";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
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

import Constants from "expo-constants";

const PaymentHistoryPage = () => {
  const { login, isLogged, logout } = useAuth();
  const router = useRouter();
  const version = Constants?.expoConfig?.version;

  // Example mock data
  const paymentData = []; // <-- replace with your actual payment data

  return (
    <>
      {isLogged == true ? (
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>PAYMENT HISTORY</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Main content */}
          {/* {paymentData.length > 0 ? ( */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Render your data here */}
            <PaymentHistory />
          </ScrollView>
          {/* ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Data Available</Text>
            </View>
          )} */}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © Timesera 2025 ( V-{version})
            </Text>
            <Image
              source={require("../../assets/images/icon.png")}
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

export default PaymentHistoryPage;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f1f0e5ff",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 5, // space above footer
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
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
    flex: 1,
  },
});
