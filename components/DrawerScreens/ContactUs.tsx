import { CREATE_JEWEL } from "@/api";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
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
  const [profileData, setProfileData] = useState<any>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
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

  const getProfile = async () => {
    const storedTenant = await AsyncStorage.getItem("tenantName");
    const userName = await AsyncStorage.getItem("userName");
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Tenant/GetSchemeUserDetails?userName=${userName}
`,
        {
          headers: {
            tenantName: storedTenant,
          },
        },
      );
      const data: any = await response?.data[0];
      setProfileData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter valid email";
      valid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const addFeedBack = async () => {
    if (!validateForm()) return;

    const storedTenant = await AsyncStorage.getItem("tenantName");

    const payload = {
      usermobileno: profileData?.MOBILENO || "",
      emailid: form.email,
      contactsms: form.message,
      username: form.name,
      otherS2: "",
      cdate: 0,
      uid: 0,
      loginuser: profileData?.FULLNAME || "",
      loginmobileno: profileData?.MOBILENO || "",
    };

    try {
      await axios.post(
        `${CREATE_JEWEL}/api/Scheme/SchemeContactusInsert`,
        payload,
        {
          headers: { tenantName: storedTenant },
        },
      );

      // ✅ clear form only after success
      setForm({ name: "", email: "", message: "" });
      setVisible(true);
    } catch (error) {
      Alert.alert("Error", "Failed to send message. Try again.");
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = () => {
    setVisible(true);
    // Add your backend API logic here
  };

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: "" }); // clear error on change
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
          value={form.name}
          onChangeText={(value) => handleChange("name", value)}
          style={{
            height: 45,
            borderWidth: 1,
            borderColor: "#154D71",
            borderRadius: 8,
            marginBottom: 12,
            paddingHorizontal: 10,
          }}
        />
        {errors.name ? (
          <Text style={{ color: "red", marginBottom: 8 }}>{errors.name}</Text>
        ) : null}

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#777"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          style={{
            height: 45,
            borderWidth: 1,
            borderColor: "#154D71",
            borderRadius: 8,
            marginBottom: 12,
            paddingHorizontal: 10,
          }}
        />
        {errors.email ? (
          <Text style={{ color: "red", marginBottom: 8 }}>{errors.email}</Text>
        ) : null}

        <TextInput
          placeholder="Message"
          placeholderTextColor="#777"
          multiline
          numberOfLines={4}
          value={form.message}
          onChangeText={(value) => handleChange("message", value)}
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
        {errors.message ? (
          <Text style={{ color: "red", marginBottom: 8 }}>
            {errors.message}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={addFeedBack}
          style={{
            backgroundColor: "#154D71",
            paddingVertical: 12,
            borderRadius: 10,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name="send"
            size={20}
            color="#fff"
            style={{ marginRight: 6 }}
          />
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Send Message
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
          top: 50,
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
