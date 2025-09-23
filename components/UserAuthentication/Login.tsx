// import {
//   LogiWithOTP,
//   MobileInput,
//   PasswordInput,
// } from "@/components/InputFields";
import { CREATE_JEWEL } from "@/api";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Checkbox } from "react-native-paper";
import { MobileInput, PasswordInput } from "../Utilities/InputFields";

export default function Login() {
  const { login, setIsLoggedIn } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  // useEffect(() => {
  //   if (localStorage.getItem("tenantName")) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [localStorage.getItem("tenantName")]);

  const loginAPI = async () => {
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Tenant/CheckValidSchemeUser?userName=${form?.userName}&password=${form?.password}`
      );
      console.log(response?.data, "data");

      if (response?.data) {
        // Store login status
        localStorage.setItem("tenantName", response?.data);
        login();
        router.push("/(drawer)");
      } else {
        console.log("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <MenuHeader /> */}
      {/* Back button at top-left */}
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity
          style={styles.backbuttonInsidewrapper}
          onPress={() => {
            router.push("/(drawer)");
          }}
        >
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Centered input fields + login button */}
      <View style={styles.inputFields}>
        {/* <View style={styles.otpContainer}>
          <LogiWithOTP />
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              backgroundColor: "#5e849bff",
              borderRadius: 8,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>SendOTP</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center" }}>Or</Text> */}
        <MobileInput
          value={form.userName}
          onChangeText={(text) => setForm({ ...form, userName: text })}
        />
        <PasswordInput
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <View style={styles.row}>
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
            <Text style={styles.label}>Remember me</Text>
          </TouchableOpacity>
          {/* <Text
            style={styles.forgot}
            onPress={() => {
              router.push("/forgot");
            }}
          >
            Forgot Password?
          </Text> */}
        </View>

        <View style={styles.loginButton}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              loginAPI();
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Avatar.Icon
            size={44}
            icon="account-plus"
            style={{ backgroundColor: "#154E71" }}
          />
        </TouchableOpacity>
        <Text style={styles.createAccountText}>Create an Account</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // take full screen
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    // backgroundColor: "#fff",
    // backgroundColor: "red",
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
  inputFields: {
    width: "80%",
    alignItems: "center",
    gap: 20, // for RN 0.71+, else use marginBottom
  },
  loginButton: {
    marginTop: 20,
    width: "100%", // control width
    alignSelf: "center", // center horizontally
  },
  customButton: {
    backgroundColor: "#154D71",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backbuttonInsidewrapper: {
    borderRadius: 12,
    backgroundColor: "#154D71",
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 15,
  },
  label: {
    fontSize: 14,
    color: "#154D71",
  },
  forgot: {
    fontSize: 14,
    color: "#154D71",
  },
  createAccountText: {
    color: "#154D71",
  },
  otpContainer: {},
});
