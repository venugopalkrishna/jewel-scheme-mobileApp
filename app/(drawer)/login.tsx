import Login from "@/components/UserAuthentication/Login";
import Logout from "@/components/UserAuthentication/Logout";
import { useRouter } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function LoginLogout() {
  const { login, isLogged, logout } = useAuth();
  const router = useRouter();

  return isLogged == true ? (
    <ImageBackground
      source={require("../../assets/images/splash-icon.png")}
      style={styles.logoutContainer}
    >
      <Logout />
    </ImageBackground>
  ) : (
    <ImageBackground
      source={require("../../assets/images/splash-icon.png")}
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
