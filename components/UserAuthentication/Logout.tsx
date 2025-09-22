import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Logout = () => {
  const router = useRouter();
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <View>
        <Text>Are you sure you want to logout?</Text>
      </View>
      <View>
        <Button
          title="Confirm Logout"
          onPress={() => {
            logout(); // clear auth
            router.replace("/"); // go to login
          }}
        />
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  logoutButton: {
    padding: 15,
    backgroundColor: "#000",
    borderRadius: 10,
  },
  container: {
    // backgroundColor: "red",
    flex: 1,
  },
});
