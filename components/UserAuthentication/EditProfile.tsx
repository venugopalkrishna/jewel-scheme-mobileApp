import { CREATE_JEWEL } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
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

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import { Snackbar } from "react-native-paper";

const EditProfile = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [showPicker, setShowPicker] = useState(false);
  const [showAnniversaryPicker, setShowAnniversaryPicker] = useState(false);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  // const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [form, setForm] = useState({
    lastName: "", // username
    phone: "",
    password: "",
    confirmPassword: "",
    address1: "",
    address2: "",
    fullName: "",
  });
  const [errors, setErrors] = useState({
    lastName: "",
    phone: "",
    // password: "",
    // confirmPassword: "",
  });

  const [userDetails, setUserDetails] = useState<any>([]);
  const [dob, setDob] = useState<Date | null>(null);
  const [anniversary, setAnniversary] = useState<Date | null>(null);

  const version = Constants?.expoConfig?.version;

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // const userName = await AsyncStorage.getItem("userName");
        const tenantName = await AsyncStorage.getItem("tenantName");
        if (tenantName) {
          setIsLoggedIn(true);

          // router.push("/(drawer)");
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Error reading storage:", error);
      }
    };

    checkLogin();
  }, []);

  const parseDMY = (dateString: any) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`); // ISO → SAFE
  };

  // const parseIndianDate = (dateStr: any) => {
  //   if (!dateStr) return null;
  //   const [day, month, year] = dateStr.split("/");
  //   return new Date(`${year}-${month}-${day}`);
  // };

  const parseIndianDate = (dateStr: string | null) => {
    if (!dateStr) return null;

    // Example: "20/11/2025"
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;

    const [day, month, year] = parts;
    return new Date(`${year}-${month}-${day}`);
  };

  const safeParseDate = (val: any) => {
    if (!val || val === "null" || val === "" || val === " ") return null;

    // Try ISO first
    const iso = Date.parse(val);
    if (!isNaN(iso)) {
      const d = new Date(val);
      // if (d.getFullYear() === 1970) return null;
      return d;
    }

    // DD/MM/YYYY fallback
    if (typeof val === "string" && val.includes("/")) {
      const [day, month, year] = val.split("/");
      return new Date(`${year}-${month}-${day}`);
    }

    return null;
  };

  const getUserAPI = async () => {
    try {
      const userName = await AsyncStorage.getItem("userName");

      // Call your backend API endpoint
      const res: any = await axios.get(
        `${CREATE_JEWEL}/api/Tenant/GetSchemeUserDetails?userName=${userName}`
      );
      const details = res.data[0];
      setUserDetails(res.data);
      setDob(safeParseDate(details?.DOB));
      setAnniversary(safeParseDate(details?.DOA));
    } catch (error) {
      console.error("Account deletion error:", error);
      throw error;
    }
  };

  const fetchAddressFromPincode = async (pin: any) => {
    if (pin.length !== 6) return;

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pin}`
      );
      const data = await response.json();

      if (data[0].Status === "Success") {
        const post = data[0].PostOffice[0];
        setCity(post.District);
        setState(post.State);
      } else {
        setCity("");
        setState("");
        alert("Invalid pincode!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAPI();
  }, []);

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      lastName: "",
      phone: "",
      // password: "",
      confirmPassword: "",
      // address1: "",
      // address2: "",
      // fullName:""
    };

    if (!form.lastName.trim()) {
      newErrors.lastName = "Username is required.";
      valid = false;
    }
    // else if (checkUser === true) {
    //   newErrors.lastName = "Username already exists.";
    // }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
      valid = false;
    }

    // if (!form.password) {
    //   newErrors.password = "Password is required.";
    //   valid = false;
    // } else if (form.password.length < 4) {
    //   newErrors.password = "Password must be at least 6 characters long.";
    //   valid = false;
    // }

    // if (!form.confirmPassword) {
    //   newErrors.confirmPassword = "Confirm your password.";
    //   valid = false;
    // } else if (form.password !== form.confirmPassword) {
    //   newErrors.confirmPassword = "Passwords do not match.";
    //   valid = false;
    // }

    setErrors(newErrors);
    return valid;
  };

  // console.log(
  //   city,
  //   state,
  //   pincode,
  //   address1,
  //   address2,
  //   dob,
  //   anniversary,
  //   "address"
  // );
  // console.log(userDetails[0]?.MOBILENO, "email");

  const signUp = async () => {
    setVisible(true);
    // if (!validateForm()) return;

    try {
      // const payload = {
      //   loginuser: form.lastName,
      //   pwd: form.password,
      //   mobileno: form.phone,
      //   firmname: "BALA GANESH JEWELLERY",
      //   dbName: "RETAILTIMES_LOGIN",
      //   clientName: "BALA GANESH",
      // };
      const payload = {
        loginuser: userDetails[0]?.LOGINUSER,
        pwd: userDetails[0]?.PWD,
        mobileno: userDetails[0]?.MOBILENO,
        firmname: userDetails[0]?.FIRMNAME,
        dbName: userDetails[0]?.DBName,
        clientName: userDetails[0]?.ClientName,
        emailid: userDetails[0]?.EMAILID,
        dob: dob ? dob : "",
        doa: anniversary ? anniversary : "",
        addresS1: address1 ? address1 : "",
        addresS2: address2 ? address2 : "",
        pincode: pincode ? pincode : "",
        state: state ? state : "",
        cityname: city ? city : "",
        profileimage: "",
        fullname: form.fullName ? form.fullName : "",
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
        router.replace("/(drawer)/myProfileSettings");
      }, 2000);
      if (response?.data) {
        // setForm({
        //   lastName: "",
        //   phone: "",
        //   password: "",
        //   confirmPassword: "",
        //   address1: "",
        //   address2: "",
        // });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: "" }); // clear error on change
  };

  useEffect(() => {
    if (userDetails?.length > 0) {
      setAddress1(userDetails[0].ADDRESS1 || "");
      setAddress2(userDetails[0].ADDRESS2 || "");
      setPincode(userDetails[0].PINCODE || "");
      setState(userDetails[0]?.STATE || "");
      setCity(userDetails[0].CITYNAME || "");
      // setFullName(userDetails[0].FULLNAME || "");
      setForm((prev) => ({
        ...prev,
        fullName: userDetails[0].FULLNAME || "",
        // add other fields too if needed
      }));
    }
  }, [userDetails]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.replace("/(drawer)/myProfileSettings")}
              >
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>EDIT PROFILE</Text>
              <View style={{ width: 24 }} />
            </View>
          </ScrollView>
          <View style={styles.profileContainer}>
            {/* Username */}
            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              placeholder="User Name"
              placeholderTextColor={"#154D71"}
              value={userDetails[0]?.LOGINUSER}
              onChangeText={(value) => handleChange("lastName", value)}
              editable={false}
            />

            {errors.lastName ? (
              <Text style={styles.error}>{errors.lastName}</Text>
            ) : null}

            {/* Phone Number */}
            <Text style={styles.label}>Mobile No</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              placeholder="Phone Number"
              placeholderTextColor={"#154D71"}
              value={userDetails[0]?.MOBILENO}
              onChangeText={(value) => handleChange("phone", value)}
              keyboardType="phone-pad"
              editable={false}
              selectTextOnFocus={false}
            />

            {errors.phone ? (
              <Text style={styles.error}>{errors.phone}</Text>
            ) : null}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input]}
              placeholder="User Name"
              placeholderTextColor={"#154D71"}
              value={form.fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              // editable={false}
            />

            {/* <View style={{ gap: 4 }}> */}
            {/* 👇 This is your visible DOB field */}
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              style={styles.datepickerinput}
            >
              <Text style={{ color: dob ? "#000" : "#777" }}>
                {dob ? dob.toLocaleDateString("en-IN") : "Select DOB"}
              </Text>
              {dob && (
                <TouchableOpacity
                  onPress={() => setDob(null)}
                  style={{ backgroundColor: "#fff" }}
                >
                  <MaterialIcons
                    name="clear"
                    size={12}
                    color="#930a0aff"
                    style={{ fontSize: 20, fontWeight: "900" }}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <Text style={styles.label}>Date of Anniversary</Text>
            <TouchableOpacity
              onPress={() => setShowAnniversaryPicker(true)}
              style={styles.datepickerinput}
            >
              <Text style={{ color: anniversary ? "#000" : "#777" }}>
                {anniversary
                  ? anniversary?.toLocaleDateString("en-IN") // 👈 gives MM/DD/YYYY
                  : "Select Anniversary"}
              </Text>
              {anniversary && (
                <TouchableOpacity
                  onPress={() => setAnniversary(null)}
                  style={{ backgroundColor: "#fff" }}
                >
                  <MaterialIcons
                    name="clear"
                    size={12}
                    color="#930a0aff"
                    style={{ fontSize: 20, fontWeight: "900" }}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {/* 👇 Calendar only shows when user clicks */}

            {showPicker && (
              <DateTimePicker
                mode="date"
                display="default"
                value={dob || new Date()}
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  if (event.type === "set" && selectedDate) {
                    setDob(selectedDate);
                  } // 👈 Set selected date
                  setShowPicker(false);
                }}
              />
            )}
            {showAnniversaryPicker && (
              <DateTimePicker
                mode="date"
                display="default"
                value={anniversary || new Date()}
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  if (event.type === "set" && selectedDate) {
                    setAnniversary(selectedDate);
                  } // 👈 Set selected date
                  setShowAnniversaryPicker(false);
                }}
              />
            )}
            <Text style={styles.label}>Address 1</Text>
            <TextInput
              placeholder="Address Line 1"
              value={address1}
              onChangeText={setAddress1}
              style={styles.datepickerinput}
              placeholderTextColor="#777"
            />
            <Text style={styles.label}>Address 2</Text>
            <TextInput
              placeholder="Address Line 2"
              value={address2}
              onChangeText={setAddress2}
              style={styles.datepickerinput}
              placeholderTextColor="#777"
            />
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.datepickerinput}
              placeholder="Enter Pincode"
              value={pincode}
              keyboardType="number-pad"
              placeholderTextColor="#777"
              maxLength={6}
              onChangeText={(text) => {
                setPincode(text);
                if (text.length === 6) fetchAddressFromPincode(text);
              }}
            />

            {loading && <Text>Loading...</Text>}
            <Text style={styles.label}>City</Text>
            <TextInput
              placeholder="City"
              value={city}
              editable={false}
              style={[styles.datepickerinput, styles.disabledInput]}
              placeholderTextColor="#777"
            />
            <Text style={styles.label}>State</Text>
            <TextInput
              placeholder="State"
              value={state}
              editable={false}
              style={[styles.datepickerinput, styles.disabledInput]}
              placeholderTextColor="#777"
            />
            {/* </View> */}

            <View></View>

            {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"#154D71"}
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={(value) => handleChange("password", value)}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {form.password?.length ? (
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#154D71"
              />
            ) : null}
          </TouchableOpacity>
        </View>
        {errors.password ? (
          <Text style={styles.error}>{errors.password}</Text>
        ) : null} */}

            {/* Confirm Password */}
            {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={"#154D71"}
            secureTextEntry={!showPassword}
            value={form.confirmPassword}
            onChangeText={(value) => handleChange("confirmPassword", value)}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {form.confirmPassword?.length ? (
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#154D71"
              />
            ) : null}
          </TouchableOpacity>
        </View>
        {errors.confirmPassword ? (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        ) : null} */}

            {/* Signup Button */}
            <TouchableOpacity
              disabled={visible === true}
              style={styles.singupcontainer}
              onPress={async () => {
                // await deleteUser();
                await signUp();
              }}
            >
              <Text style={styles.singupText}>Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Timesera 2025 ( V-{version} )</Text>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.footerLogo}
            resizeMode="contain"
          />
        </View>

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

        <View style={{ height: 40 }} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  input: {
    height: 50,
    borderWidth: 0.5,
    borderColor: "#154D71",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
    fontSize: 16,
    backgroundColor: "#fafafa",
    width: "90%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  icon: {
    position: "absolute",
    right: 35,
    top: 15,
  },
  creatAccount: {
    color: "#154D71",
    fontSize: 15,
    fontWeight: "500",
    marginVertical: 20,
  },
  singupcontainer: {
    width: "50%",
    paddingVertical: 10,
    backgroundColor: "#154D71",
    borderRadius: 8,
    marginVertical: 12,
    alignSelf: "center",
    marginRight: 20,
  },
  label: {
    color: "#154D71",
    fontWeight: "500",
  },
  singupText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  termsandConditions: {
    color: "#154D71",
    marginVertical: 15,
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
  },
  error: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 25,
    marginBottom: 8,
  },
  backButtonWrapper: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  backButton: {
    color: "#fff",
  },
  backbuttonInsidewrapper: {
    borderRadius: 12,
    backgroundColor: "#154D71",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  safeArea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10, // ensures scroll area above footer
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
    // alignItems: "center",
    // marginVertical: 30,
    marginLeft: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
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
  disabledInput: {
    backgroundColor: "#E6E6E6", // light grey background
    borderColor: "#BDBDBD", // grey border
    color: "#7A7A7A", // muted text color
    width: "90%",
  },
  datepickerinput: {
    height: 45,
    borderWidth: 1,
    borderColor: "#154D71",
    borderRadius: 8,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    width: "90%",
    flexDirection: "row",
    gap: 25,
    // textAlign: "center",
    alignItems: "center",
    marginBottom: 6,
  },
});
