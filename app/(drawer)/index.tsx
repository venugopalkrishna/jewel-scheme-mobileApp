import { ImageBackground, StyleSheet, View } from "react-native";
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
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

export default function HomeScreen() {
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
});
