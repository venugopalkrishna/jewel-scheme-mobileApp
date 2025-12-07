import EditProfile from "@/components/UserAuthentication/EditProfile";
import { ImageBackground, StyleSheet } from "react-native";

const EditProfilePage = () => {
  return (
    <ImageBackground
      source={require("../assets/images/backgroundImage2.jpg")}
      style={styles.container}
    >
      <EditProfile />
    </ImageBackground>
  );
};

export default EditProfilePage;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
