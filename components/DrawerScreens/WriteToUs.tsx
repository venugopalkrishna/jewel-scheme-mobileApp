import { CREATE_JEWEL } from "@/api";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";

export default function WriteToUs() {
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
        `${CREATE_JEWEL}/api/Scheme/SchemeFeedBackInsert`,
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
        Write To Us
      </Text> */}

      <Text style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>
        Have a question, feedback, or need help with your Gold Jewellery Scheme
        account? Send us a message — our team will get back to you within 24
        hours.
      </Text>

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
        {/* Name */}
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>
          Your Name
        </Text>
        <TextInput
          placeholder="Enter your full name"
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
            backgroundColor: "#fff",
          }}
        />
        {errors.name ? (
          <Text style={{ color: "red", marginBottom: 8 }}>{errors.name}</Text>
        ) : null}

        {/* Email */}
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>
          Email Address
        </Text>
        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#777"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          style={{
            height: 45,
            borderWidth: 1,
            borderColor: "#154D71",
            borderRadius: 8,
            marginBottom: 12,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
          }}
        />
        {errors.email ? (
          <Text style={{ color: "red", marginBottom: 8 }}>{errors.email}</Text>
        ) : null}

        {/* Message */}
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>
          Message
        </Text>
        <TextInput
          placeholder="Write your message here"
          placeholderTextColor="#777"
          multiline
          numberOfLines={5}
          value={form.message}
          onChangeText={(value) => handleChange("message", value)}
          style={{
            borderWidth: 1,
            borderColor: "#154D71",
            borderRadius: 8,
            paddingHorizontal: 10,
            height: 150,
            textAlignVertical: "top",
            marginBottom: 15,
            backgroundColor: "#fff",
          }}
        />
        {errors.message ? (
          <Text style={{ color: "red", marginBottom: 8 }}>
            {errors.message}
          </Text>
        ) : null}

        {/* Submit Button */}
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
        // wrapperStyle={{
        //   position: "absolute",
        //   alignSelf: "center", // ⬅️ Centers Snackbar horizontally
        //   top: 10,
        //   alignContent: "center",
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
        wrapperStyle={{
          top: 50,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Sent Successfully!
        </Text>
      </Snackbar>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
