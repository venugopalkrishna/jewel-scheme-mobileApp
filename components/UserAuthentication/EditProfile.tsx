import { CREATE_JEWEL } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EditProfile = () => {
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

  //   const userCheckAPI = async () => {
  //     try {
  //       const userName = await AsyncStorage.getItem("userName");

  //       // Call your backend API endpoint
  //       const res = await axios.get(
  //         `${CREATE_JEWEL}/api/Tenant/CheckSchemeUserExits?userName=${form?.lastName}`
  //       );
  //       setUserCheck(res?.data);
  //     } catch (error) {
  //       console.error("Account deletion error:", error);
  //       throw error;
  //     }
  //   };

  //   useEffect(() => {
  //     if (form?.lastName) {
  //       userCheckAPI();
  //     }
  //   }, [form?.lastName]);

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
    }
    // else if (checkUser === true) {
    //   newErrors.lastName = "Username already exists.";
    // }

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
        `${CREATE_JEWEL}/api/Tenant/UpdateSchemeUser`,
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/(drawer)/myProfileSettings")}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>EDIT PROFILE</Text>
          <View style={{ width: 24 }} />
        </View>
      </ScrollView>
      <View style={styles.profileContainer}>
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

        {/* Signup Button */}
        <TouchableOpacity style={styles.singupcontainer} onPress={signUp}>
          <Text style={styles.singupText}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© Timesera 2025 ( V-1.0.5 )</Text>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.footerLogo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
    // <ScrollView contentContainerStyle={styles.container}>

    //   {/* Username */}
    //   <TextInput
    //     style={styles.input}
    //     placeholder="User Name"
    //     placeholderTextColor={"#154D71"}
    //     value={form.lastName}
    //     onChangeText={(value) => handleChange("lastName", value)}
    //   />
    //   {errors.lastName ? (
    //     <Text style={styles.error}>{errors.lastName}</Text>
    //   ) : null}

    //   {/* Phone Number */}
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Phone Number"
    //     placeholderTextColor={"#154D71"}
    //     value={form.phone}
    //     onChangeText={(value) => handleChange("phone", value)}
    //     keyboardType="phone-pad"
    //   />
    //   {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}

    //   <View style={styles.inputContainer}>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Password"
    //       placeholderTextColor={"#154D71"}
    //       secureTextEntry={!showPassword}
    //       value={form.password}
    //       onChangeText={(value) => handleChange("password", value)}
    //     />
    //     <TouchableOpacity
    //       style={styles.icon}
    //       onPress={() => setShowPassword(!showPassword)}
    //     >
    //       {form.password?.length ? (
    //         <Ionicons
    //           name={showPassword ? "eye-off" : "eye"}
    //           size={22}
    //           color="#154D71"
    //         />
    //       ) : null}
    //     </TouchableOpacity>
    //   </View>
    //   {errors.password ? (
    //     <Text style={styles.error}>{errors.password}</Text>
    //   ) : null}

    //   {/* Confirm Password */}
    //   <View style={styles.inputContainer}>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Confirm Password"
    //       placeholderTextColor={"#154D71"}
    //       secureTextEntry={!showPassword}
    //       value={form.confirmPassword}
    //       onChangeText={(value) => handleChange("confirmPassword", value)}
    //     />
    //     <TouchableOpacity
    //       style={styles.icon}
    //       onPress={() => setShowPassword(!showPassword)}
    //     >
    //       {form.confirmPassword?.length ? (
    //         <Ionicons
    //           name={showPassword ? "eye-off" : "eye"}
    //           size={22}
    //           color="#154D71"
    //         />
    //       ) : null}
    //     </TouchableOpacity>
    //   </View>
    //   {errors.confirmPassword ? (
    //     <Text style={styles.error}>{errors.confirmPassword}</Text>
    //   ) : null}

    //   {/* Signup Button */}
    //   <TouchableOpacity style={styles.singupcontainer} onPress={signUp}>
    //     <Text style={styles.singupText}>Signup</Text>
    //   </TouchableOpacity>

    // </ScrollView>
  );
};

export default EditProfile;

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
