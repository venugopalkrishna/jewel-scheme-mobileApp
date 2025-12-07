import Login from "@/components/UserAuthentication/Login";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { CREATE_JEWEL } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import { Snackbar } from "react-native-paper";

const MyProfileSettings = () => {
  const { login, isLogged, logout } = useAuth();
  const router = useRouter();
  const [image, setImage] = useState<any>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [oldPassword, setOldPassword] = useState<any>();
  const [newPassword, setNewPassword] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();
  const [passwordVerified, setPasswordVerified] = useState(false); // Old password check
  const [matchNewPasswords, setMatchNewPasswords] = useState(false); // New + confirm match
  const [errors, setErrors] = useState({ oldPassword: "", newPassword: "" });
  const [visible, setVisible] = useState(false);
  const version = Constants?.expoConfig?.version;

  // Pick from Gallery

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square crop for profile pic
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Capture from Camera
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getUserAPI = async () => {
    try {
      const userName = await AsyncStorage.getItem("userName");

      // Call your backend API endpoint
      const res: any = await axios.get(
        `${CREATE_JEWEL}/api/Tenant/GetSchemeUserDetails?userName=${userName}`
      );
      const details = res.data[0];
      setUserDetails(details);
    } catch (error) {
      console.error("Account deletion error:", error);
      throw error;
    }
  };

  const signUp = async () => {
    setVisible(true);
    setShowPasswordChange(false);

    try {
      const payload = {
        loginuser: userDetails?.LOGINUSER,
        pwd: confirmPassword,
        mobileno: userDetails?.MOBILENO,
        firmname: userDetails?.FIRMNAME,
        dbName: userDetails?.DBName,
        clientName: userDetails?.ClientName,
        emailid: userDetails?.EMAILID,
        dob: userDetails?.DOB,
        doa: userDetails?.DOA,
        addresS1: userDetails?.ADDRESS1,
        addresS2: userDetails?.ADDRESS2,
        pincode: userDetails?.PINCODE,
        state: userDetails?.STATE,
        cityname: userDetails?.CITYNAME,
        profileimage: "",
        fullname: userDetails?.FULLNAME,
      };

      const tenantName = await AsyncStorage.getItem("tenantName");

      const response = await axios.post(
        `${CREATE_JEWEL}/api/Tenant/UpdateSchemeUser`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            tenantName: tenantName,
          },
        }
      );
      // Toast.show({
      //   type: "success",
      //   text1: "Payment Successful",
      //   text2: "Your amount has been processed 🎉",
      // });

      setTimeout(() => {
        router.replace("/");
      }, 2000);
      if (response?.data) {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateNewPasswords = (newPass: any, confirmPass: any) => {
    if (newPass && confirmPass && newPass === confirmPass) {
      setMatchNewPasswords(true);
      setErrors((prev) => ({ ...prev, newPassword: "" }));
    } else {
      setMatchNewPasswords(false);
      setErrors((prev) => ({ ...prev, newPassword: "Passwords do not match" }));
    }
  };

  useEffect(() => {
    getUserAPI();
  }, []);

  useEffect(() => {
    setErrors({ oldPassword, newPassword });
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {isLogged == true ? (
          <SafeAreaView style={styles.safeArea}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace("/")}>
                  <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>MY PROFILE SETTINGS</Text>
                <View style={{ width: 24 }} />
              </View>

              {/* Profile Section */}
              <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                  {/* {image ? (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 100, height: 100, borderRadius: 75 }}
                    />
                  ) : ( */}
                  <FontAwesome5
                    name="user-alt"
                    size={60}
                    color="#000"
                    styles={styles.profileIcon}
                  />
                  {/* )} */}
                  {/* 
                  <TouchableOpacity
                    style={styles.leftIcon}
                    onPress={openCamera}
                  >
                    <Ionicons name="camera" size={22} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rightIcon}
                    onPress={pickImage}
                  >
                    <Ionicons name="image" size={22} color="#007AFF" />
                  </TouchableOpacity> */}
                </View>
              </View>

              {/* Options */}

              <View style={{ padding: 20 }}>
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => {
                    router.push("/edit-profile");
                  }}
                >
                  <MaterialIcons name="edit" size={20} color="#000" />
                  <Text style={styles.optionText}>Edit Profile</Text>
                  <Ionicons name="chevron-forward" size={20} color="#000" />
                </TouchableOpacity>
                {/* Change Password Row */}
                <TouchableOpacity
                  style={styles.optionRowPassword}
                  onPress={() => setShowPasswordChange(!showPasswordChange)}
                >
                  <Ionicons name="eye-outline" size={20} color="#000" />

                  <Text style={styles.optionTextPassword}>Change Password</Text>

                  <Ionicons
                    name={
                      showPasswordChange ? "chevron-down" : "chevron-forward"
                    }
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>

                {/* Password Fields Below */}
                {showPasswordChange && (
                  <View>
                    {/* OLD PASSWORD */}
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Old Password"
                        placeholderTextColor="#154D71"
                        secureTextEntry={!showOld}
                        onChangeText={(value) => {
                          setOldPassword(value);

                          if (value === userDetails?.PWD) {
                            setPasswordVerified(true);
                            setErrors({ ...errors, oldPassword: "" });
                          } else {
                            setPasswordVerified(false);
                            setErrors({
                              ...errors,
                              oldPassword: "Enter correct old password",
                            });
                          }
                        }}
                      />
                      {errors.oldPassword ? (
                        <Text style={{ color: "red" }}>
                          {errors.oldPassword}
                        </Text>
                      ) : null}
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowOld(!showOld)}
                      >
                        <MaterialIcons
                          name={showOld ? "visibility" : "visibility-off"}
                          size={22}
                          color="#154D71"
                        />
                      </TouchableOpacity>
                    </View>

                    {/* NEW PASSWORD */}
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter New Password"
                        placeholderTextColor="#154D71"
                        secureTextEntry={!showNew}
                        onChangeText={(value) => {
                          setNewPassword(value);
                          validateNewPasswords(value, confirmPassword);
                        }}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowNew(!showNew)}
                      >
                        <MaterialIcons
                          name={showNew ? "visibility" : "visibility-off"}
                          size={22}
                          color="#154D71"
                        />
                      </TouchableOpacity>
                    </View>

                    {/* CONFIRM PASSWORD */}
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        placeholderTextColor="#154D71"
                        secureTextEntry={!showConfirm}
                        onChangeText={(value) => {
                          setConfirmPassword(value);
                          validateNewPasswords(newPassword, value);
                        }}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowConfirm(!showConfirm)}
                      >
                        <MaterialIcons
                          name={showConfirm ? "visibility" : "visibility-off"}
                          size={22}
                          color="#154D71"
                        />
                      </TouchableOpacity>

                      {errors.newPassword ? (
                        <Text style={{ color: "red" }}>
                          {errors.newPassword}
                        </Text>
                      ) : null}
                    </View>

                    {passwordVerified &&
                      matchNewPasswords &&
                      newPassword &&
                      confirmPassword && (
                        <TouchableOpacity
                          style={styles.updateBtn}
                          onPress={() => {
                            signUp();
                          }}
                        >
                          <Text style={styles.updateBtnText}>
                            Update Password
                          </Text>
                        </TouchableOpacity>
                      )}
                  </View>
                )}

                <Snackbar
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                  duration={2000}
                  style={{
                    backgroundColor: "#00C853", // green background
                    borderRadius: 10,
                  }}
                  wrapperStyle={{
                    top: 50, // position from bottom
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Updated Successfully!
                  </Text>
                </Snackbar>
              </View>
            </ScrollView>

            {/* Fixed Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                © Timesera 2025 ( V-{version} )
              </Text>
              <Image
                source={require("../../assets/images/icon.png")} // replace with your logo
                style={styles.footerLogo}
                resizeMode="contain"
              />
            </View>
          </SafeAreaView>
        ) : (
          <ImageBackground
            source={require("../../assets/images/splash-icon.png")}
            style={styles.logoutContainer}
          >
            <Login />
          </ImageBackground>
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default MyProfileSettings;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // ensures scroll area above footer
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatarContainer: {
    backgroundColor: "#f5f5f5",
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 25,
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftIcon: {
    position: "absolute",
    left: 20,
    top: "50%",
  },
  rightIcon: {
    position: "absolute",
    right: 20,
    top: "50%",
  },
  optionsContainer: {
    width: "90%",
    alignSelf: "center",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    justifyContent: "space-between",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginLeft: 12,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: "#002D6B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
  },
  footerLogo: {
    width: 18,
    height: 18,
    marginLeft: 6,
  },
  logoutContainer: {
    flex: 1, // take full screen
  },
  profileIcon: {
    backgroundColor: "#0d7480ff",
    color: "red",
    padding: 300,
  },
  optionRowPassword: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 10,
    justifyContent: "space-between",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  optionTextPassword: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },

  passwordContainer: {
    gap: 12,
    marginLeft: 5,
    marginBottom: 10,
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
  updateBtn: {
    backgroundColor: "#0f0755ff",
    paddingVertical: 12,
    borderRadius: 10, // 👈 Your border radius
    width: "100%", // 👈 Full width OR set fixed width like 200
    alignSelf: "center", // 👈 Controls placement
    marginTop: 15,
  },

  updateBtnText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
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
});
