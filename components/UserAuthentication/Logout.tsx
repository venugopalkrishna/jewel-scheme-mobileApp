import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Logout = () => {
  const router = useRouter();
  const { logout, setIsLoggedIn } = useAuth();

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("tenantName");
      await AsyncStorage.removeItem("userName");
      logout();
      setIsLoggedIn(false);
      router.replace("/");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Are you sure you want to logout?</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Confirm Logout" onPress={logOut} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Go To Home" onPress={goToHome} />
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
