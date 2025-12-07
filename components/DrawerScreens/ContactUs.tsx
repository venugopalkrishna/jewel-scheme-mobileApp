import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";

export default function ContactUsPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const handleCall = () => {
    Linking.openURL("tel:+919949713019"); // Replace with your business number
  };

  const handleEmail = () => {
    Linking.openURL("mailto:support@goldschemeapp.com"); // Replace with your support email
  };

  const handleWhatsApp = () => {
    Linking.openURL("https://wa.me/919949713019"); // Replace with your WhatsApp number
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 10 }}>
        Contact Us
      </Text> */}

      <Text style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>
        We are here to help you with anything related to your gold jewellery
        scheme, EMI payments, membership, or app usage.
      </Text>

      {/* Contact Options */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 14,
          borderRadius: 10,
          marginBottom: 16,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 3,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
          onPress={handleCall}
        >
          <Ionicons name="call" size={22} color="#154D71" />
          <Text style={{ marginLeft: 10, fontSize: 16, color: "#000" }}>
            +91 9949713019
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
          onPress={handleEmail}
        >
          <MaterialIcons name="email" size={22} color="#154D71" />
          <Text style={{ marginLeft: 10, fontSize: 16, color: "#000" }}>
            timesera9090@gmail.com
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={handleWhatsApp}
        >
          <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
          <Text style={{ marginLeft: 10, fontSize: 16, color: "#000" }}>
            WhatsApp Us
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contact Form */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 10,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
          Send us a message
        </Text>

        <TextInput
          placeholder="Your Name"
          placeholderTextColor="#777"
          style={{
            height: 45,
            borderWidth: 1,
            borderColor: "#154D71",
            borderRadius: 8,
            marginBottom: 12,
            paddingHorizontal: 10,
          }}
        />

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#777"
          keyboardType="email-address"
          style={{
            height: 45,
            borderWidth: 1,
            borderColor: "#154D71",
            borderRadius: 8,
            marginBottom: 12,
            paddingHorizontal: 10,
          }}
        />

        <TextInput
          placeholder="Message"
          placeholderTextColor="#777"
          multiline
          numberOfLines={4}
          style={{
            borderWidth: 1,
            borderColor: "#154D71",
            borderRadius: 8,
            paddingHorizontal: 10,
            height: 120,
            textAlignVertical: "top",
            marginBottom: 15,
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#154D71",
            paddingVertical: 12,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={() => {
            setVisible(true);
            setTimeout(() => {
              router.replace("/");
            });
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
        style={{
          backgroundColor: "#00C853", // green background
          borderRadius: 10,
        }}
        wrapperStyle={{
          top: 50, // position from bottom
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Submitted Successfully!
        </Text>
      </Snackbar>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
