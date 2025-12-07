import TermsAndPrivacyScreen from "@/components/DrawerScreens/TermsAndConditions";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const OurPolicies = () => {
  const router = useRouter();
  const version = Constants?.expoConfig?.version;
  return (
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
          <Text style={styles.headerTitle}>OUR POLICIES</Text>
          <View style={{ width: 24 }} />
        </View>
        <View>
          <TermsAndPrivacyScreen />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© Timesera 2025 ( V-{version} )</Text>
        <Image
          source={require("../../assets/images/icon.png")} // replace with your logo
          style={styles.footerLogo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default OurPolicies;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f7fbff",
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
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
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
});
