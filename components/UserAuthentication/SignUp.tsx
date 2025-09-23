import { CREATE_JEWEL } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";

const SignUp = () => {
  const router = useRouter();
  const { login, setIsLoggedIn } = useAuth();
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [language, setLanguage] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const data = [
    { label: "English", value: "en" },
    { label: "Telugu", value: "te" },
    { label: "Hindi", value: "hi" },
    { label: "❌ Clear Selection", value: null }, // 👈 extra option
  ];
  // useEffect(() => {
  //   if (localStorage.getItem("tenantName")) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [localStorage.getItem("tenantName")]);

  const signUp = async () => {
    try {
      const payload = {
        loginuser: form?.lastName,
        pwd: form?.password,
        mobileno: form?.phone,
        firmname: "BALA GANESH JEWELLERY",
        dbName: "APP_ORIGIN_JST",
        clientName: "BALA GANESH",
      };

      const response = await axios.post(
        `${CREATE_JEWEL}/api/Tenant/SchemeUserRegistration`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      console.log(response?.data);

      if (response?.data) {
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/(drawer)/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  console.log(form, "form");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity
          style={styles.backbuttonInsidewrapper}
          onPress={() => {
            router.push("/(drawer)/login");
          }}
        >
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.creatAccount}> CREATE A NEW ACCOUNT</Text>
      {/* Language Dropdown */}
      {/* <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        activeColor="#e6f7ff"
        containerStyle={styles.dropdownContainer}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select Language"
        value={language}
        onChange={(item) => setLanguage(item.value)}
      /> */}
      {/* <Text style={{ marginTop: 20, fontSize: 16 }}>
        Selected Language: {language ? language : "None"}
      </Text> */}
      {/* First Name */}
      {/* <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={"#154D71"}
        value={form.firstName}
        onChangeText={(value) => handleChange("firstName", value)}
      /> */}

      {/* Last Name */}
      <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor={"#154D71"}
        value={form.lastName}
        onChangeText={(value) => handleChange("lastName", value)}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        placeholderTextColor={"#154D71"}
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Phone */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor={"#154D71"}
        value={form.phone}
        onChangeText={(value) => handleChange("phone", value)}
        keyboardType="phone-pad"
      />

      {/* Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#154D71"}
          secureTextEntry={!showPassword}
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          {form.password?.length ? (
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#154D71"
            />
          ) : (
            ""
          )}
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={"#154D71"}
          secureTextEntry={!showPassword}
          value={form.confirmPassword}
          onChangeText={(value) => handleChange("confirmPassword", value)}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          {form.confirmPassword?.length ? (
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#154D71"
            />
          ) : (
            ""
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          setChecked(!checked);
        }}
      >
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          color="#154D71"
          uncheckedColor="#154D71"
        ></Checkbox>
        <Text style={styles.termsandConditions}>
          By Registering, you agree to all terms and conditions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singupcontainer}>
        <Text
          style={styles.singupText}
          onPress={() => {
            signUp();
          }}
        >
          Singup
        </Text>
      </TouchableOpacity>
      <Text
        style={styles.termsandConditions}
        onPress={() => {
          router.push("/(drawer)/login");
        }}
      >
        Already having account?
      </Text>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  input: {
    height: 50,
    borderWidth: 0.5,
    borderColor: "#154D71",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
    width: "90%",
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  dropdownContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "#fefefe",
    paddingVertical: 5,
  },
  placeholderStyle: { fontSize: 16, color: "#154D71" },
  selectedTextStyle: { fontSize: 16, color: "black" },
  itemTextStyle: { fontSize: 16, color: "#333" },
  creatAccount: {
    color: "#154D71",
    fontSize: 13,
    fontWeight: "400",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  icon: {
    position: "absolute",
    right: 35,
    top: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 25,
  },
  label: {
    fontSize: 14,
  },
  singupcontainer: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#154D71",
    borderRadius: 8,
    marginVertical: 12,
  },
  singupText: {
    color: "#fff",
    textAlign: "center",
  },
  termsandConditions: {
    color: "#154D71",
    marginVertical: 15,
  },
  checkbox: {
    color: "red",
  },
  backButtonWrapper: {
    position: "absolute",
    top: 20, // adjust for status bar
    left: 20,
  },
  backButton: {
    color: "#fff",
    // borderRadius: 10,
  },
  backbuttonInsidewrapper: {
    borderRadius: 12,
    backgroundColor: "#154D71",
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: "#fff",
  },
});
