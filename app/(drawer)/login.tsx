import Login from "@/components/UserAuthentication/Login";
import Logout from "@/components/UserAuthentication/Logout";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function LoginLogout() {
  const { login, isLogged, logout } = useAuth();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  return isLogged == true ? (
    <ImageBackground
      source={require("../../assets/images/backgroundImage2.jpg")}
      style={styles.logoutContainer}
    >
      <Logout />
    </ImageBackground>
  ) : (
    // <UserLogoutDialogue
    //   setShowDialog={setShowDialog}
    //   visible={showDialog}
    //   onclose={() => {
    //     setShowDialog(false);
    //   }}
    //   // onPress={() => setShowDialog(true)} // 👈 open the dialog
    // />
    <ImageBackground
      source={require("../../assets/images/backgroundImage2.jpg")}
      style={styles.logoutContainer}
    >
      <Login />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1, // take full screen
  },
});
