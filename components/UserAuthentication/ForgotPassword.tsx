import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MenuHeader from "../DrawerScreens/MenuHeader";
import { LogiWithOTP } from "../Utilities/InputFields";

export default function ForgotPassword() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View>
        <MenuHeader />
      </View>
      <View style={styles.mobileInput}>
        <LogiWithOTP />
      </View>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => {
          router.push(`/(drawer)`);
        }}
      >
        <Text style={styles.button}>Send OTP</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 20, marginTop: 20 }}>
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
    marginTop: 150,
    alignItems: "center",
    // alignSelf: "center",
  },
  mobileInput: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    backgroundColor: "#5e849bff",
    padding: 10,
    alignItems: "center",
    width: "50%",
    marginTop: 20,
    borderRadius: 8,
  },
  button: {
    color: "#fff",
    fontWeight: "bold",
  },
});
