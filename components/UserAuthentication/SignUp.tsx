import { CREATE_JEWEL } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const { setIsLoggedIn } = useAuth();

  const [form, setForm] = useState({
    lastName: "", // username
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checkUser, setUserCheck] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const tenantName = await AsyncStorage.getItem("tenantName");
        if (tenantName) {
          setIsLoggedIn(true);
          router.push("/(drawer)");
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Error reading storage:", error);
      }
    };

    checkLogin();
  }, []);

  const userCheckAPI = async () => {
    try {
      const userName = await AsyncStorage.getItem("userName");

      // Call your backend API endpoint
      const res = await axios.get(
        `${CREATE_JEWEL}/api/Tenant/CheckSchemeUserExits?userName=${form?.lastName}`
      );
      setUserCheck(res?.data);
    } catch (error) {
      console.error("Account deletion error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (form?.lastName) {
      userCheckAPI();
    }
  }, [form?.lastName]);

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      lastName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (!form.lastName.trim()) {
      newErrors.lastName = "Username is required.";
      valid = false;
    } else if (checkUser === true) {
      newErrors.lastName = "Username already exists.";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (form.password.length < 4) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
      valid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const signUp = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        loginuser: form.lastName,
        pwd: form.password,
        mobileno: form.phone,
        firmname: "BALA GANESH JEWELLERY",
        dbName: "RETAILTIMES_LOGIN",
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

      if (response?.data) {
        setForm({
          lastName: "",
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
    setErrors({ ...errors, [key]: "" }); // clear error on change
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity
          style={styles.backbuttonInsidewrapper}
          onPress={() => router.push("/(drawer)/login")}
        >
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.creatAccount}>CREATE A NEW ACCOUNT</Text>

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor={"#154D71"}
        value={form.lastName}
        onChangeText={(value) => handleChange("lastName", value)}
      />
      {errors.lastName ? (
        <Text style={styles.error}>{errors.lastName}</Text>
      ) : null}

      {/* Phone Number */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor={"#154D71"}
        value={form.phone}
        onChangeText={(value) => handleChange("phone", value)}
        keyboardType="phone-pad"
      />
      {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}

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
          ) : null}
        </TouchableOpacity>
      </View>
      {errors.password ? (
        <Text style={styles.error}>{errors.password}</Text>
      ) : null}

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
          ) : null}
        </TouchableOpacity>
      </View>
      {errors.confirmPassword ? (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      ) : null}

      {/* Terms Checkbox */}
      <TouchableOpacity style={styles.row} onPress={() => setChecked(!checked)}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          color="#154D71"
          uncheckedColor="#154D71"
        />
        <Text style={styles.termsandConditions}>
          By Registering, you agree to all terms and conditions
        </Text>
      </TouchableOpacity>

      {/* Signup Button */}
      <TouchableOpacity style={styles.singupcontainer} onPress={signUp}>
        <Text style={styles.singupText}>Signup</Text>
      </TouchableOpacity>

      <Text
        style={styles.termsandConditions}
        onPress={() => router.push("/(drawer)/login")}
      >
        Already have an account?
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
    marginBottom: 6,
    fontSize: 16,
    backgroundColor: "#fafafa",
    width: "90%",
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
  creatAccount: {
    color: "#154D71",
    fontSize: 15,
    fontWeight: "500",
    marginVertical: 20,
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
    fontSize: 16,
  },
  termsandConditions: {
    color: "#154D71",
    marginVertical: 15,
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
  },
  error: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 25,
    marginBottom: 8,
  },
  backButtonWrapper: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  backButton: {
    color: "#fff",
  },
  backbuttonInsidewrapper: {
    borderRadius: 12,
    backgroundColor: "#154D71",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
