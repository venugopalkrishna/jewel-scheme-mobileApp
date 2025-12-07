import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MenuHeader from "../DrawerScreens/MenuHeader";
import { LogiWithOTP } from "../Utilities/InputFields";

export default function ForgotPassword() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View>
        <MenuHeader />
      </View>
      <View style={[styles.mobileInput, styles.passawordContainer]}>
        <LogiWithOTP />

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => {
            router.push(`/(drawer)`);
          }}
        >
          <Text style={styles.button}>Send OTP</Text>
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            placeholderTextColor="#154D71"
            // secureTextEntry={!showNew}
            // onChangeText={(value) => {
            //   setNewPassword(value);
            //   validateNewPasswords(value, confirmPassword);
            // }}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            // onPress={() => setShowNew(!showNew)}
          >
            <MaterialIcons
              name={showNew ? "visibility" : "visibility-off"}
              size={22}
              color="#154D71"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            placeholderTextColor="#154D71"
            // secureTextEntry={!showConfirm}
            // onChangeText={(value) => {
            //   setConfirmPassword(value);
            //   validateNewPasswords(newPassword, value);
            // }}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            // onPress={() => setShowConfirm(!showConfirm)}
          >
            <MaterialIcons
              name={showConfirm ? "visibility" : "visibility-off"}
              size={22}
              color="#154D71"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: "80%",
          alignSelf: "center",
        }}
      >
        <Text
          onPress={() => {
            router.push(`/(drawer)/login`);
          }}
        >
          Sign in
        </Text>
        <Text>/</Text>
        <Text
          onPress={() => {
            router.push(`/signup`);
          }}
        >
          Sing up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  mobileInput: {
    width: "100%",
    paddingVertical: 50,
  },
  buttonWrapper: {
    backgroundColor: "#5e849bff",
    padding: 10,
    width: "100%",
    borderRadius: 8,
  },
  button: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#154D71", // Your border color
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 15,
    color: "#000", // Input text color
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12, // 🔥 adjusts to align vertically with all fields
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 15,
  },
  passawordContainer: {
    alignSelf: "center",
    // alignItems: "center",
    width: "80%",
  },
});
