import {
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";

// import AdvertisementCarousel from "@/components/Homepages/AdvertisementCarousel";
// import Header from "@/components/Homepages/Header";
import MenuGrid from "@/components/Homepages/MenuGrid";
import NewArrivalsBanner from "@/components/Homepages/NewArrivalsBanner";
import Offers from "@/components/Homepages/Offers";
// import RateCard from "@/components/Homepages/RateCard";
import AdvertisementCarousel from "@/components/Homepages/AdvertisementCarousel";
import Header from "@/components/Homepages/Header";
import RateCard from "@/components/Homepages/RateCard";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { login, setIsLoggedIn } = useAuth();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const tenantName = await AsyncStorage.getItem("tenantName");
        if (tenantName) {
          setIsLoggedIn(true);
          router.push("/(drawer)");
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Error reading storage:", error);
      }
    };

    checkLogin();
  }, []);

  // useEffect(() => {
  //   const registerForPushNotifications = async () => {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") return;

  //     // ✅ Register your device for push notifications (NativeNotify)
  //     registerNNPushToken(32667, "buA6zsNTsskAZ8MllfVkM0");
  //   };

  const openWhatsApp = () => {
    const phoneNumber = "+919440353589"; // Replace with your business number
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };

  const makePhoneCall = () => {
    const phoneNumber = "tel:+919440353589"; // Replace with your number
    Linking.openURL(phoneNumber);
  };
  return (
    <ImageBackground
      source={require("../../assets/images/splash-icon.png")} // local image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}></View>
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={true}>
          {/* <View style={styles.margintop}></View> */}
          <RateCard goldRate={"9296"} silverRate={"127.0"} />
          <AdvertisementCarousel />
          <MenuGrid />
          <Offers />
          <NewArrivalsBanner />
        </ScrollView>
        <TouchableOpacity style={styles.callButton} onPress={makePhoneCall}>
          <Image
            source={require("../../assets/images/call.png")} // use your phone icon
            style={styles.icon1}
          />
        </TouchableOpacity>

        {/* ✅ Floating WhatsApp Button */}
        <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
          <Image
            source={require("../../assets/images/whatsapp.png")} // use your WhatsApp icon
            style={styles.icon}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  background: {
    flex: 1,
    opacity: 1,
  },
  // margintop: {
  //   padding: 18,
  //   backgroundColor: "#000",
  //   // backgroundColor: "transparent",
  // },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(0.5,0.5,0.4,0.4.9)",
    backgroundColor: "transparent",
  },
  callButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  whatsappButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#4AAD50",
    borderRadius: 50,
    // padding: 5,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  icon1: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
