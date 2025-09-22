import SignUp from "@/components/UserAuthentication/SignUp";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const SingupPage = () => {
  return (
    <ImageBackground
      source={require("../assets/images/splash-icon.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <SignUp />
    </ImageBackground>
  );
};

export default SingupPage;

const styles = StyleSheet.create({ container: { flex: 1 } });
