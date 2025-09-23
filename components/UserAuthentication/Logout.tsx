import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Logout = () => {
  const router = useRouter();
  const { logout, setIsLoggedIn } = useAuth();
  // useEffect(() => {
  //   if (localStorage.getItem("tenantName")) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [localStorage.getItem("tenantName")]);
  const logOut = () => {
    logout();
    router.replace("/");
    localStorage.removeItem("tenantName");
    localStorage.clear();
    window.location.reload();
  };
  const goToHome = () => {
    router.push("/"); // Navigate to home without logout
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
  textContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
