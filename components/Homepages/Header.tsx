import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";

type DrawerParamList = {
  index: undefined;
  settings: undefined;
};

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export default function Header() {
  //   const [fontsLoaded] = useFonts({
  //     Perpetua: require("../assets/fonts/SpaceMono-Regular.ttf"),
  //   });

  const navigation = useNavigation<NavigationProp>();
  // const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#2a7538ff", "#3c9957ff", "#15571bff"]} // three colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }} // horizontal gradient
      style={styles.header}
    >
      {/* Menu Icon */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={28} color="#fff" style={styles.menu} />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.image}
      />

      {/* Titles */}
      <View style={styles.center}>
        {/* Title with gradient */}
        <MaskedView
          maskElement={
            <Text style={[styles.title, { backgroundColor: "transparent" }]}>
              TIMESERA
            </Text>
          }
        >
          <LinearGradient
            colors={[" #fff", "#fff", "#fff"]}
            // colors={[" #b6a024ff", "#b9a740ff", "#e3d37dff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.title, { opacity: 1 }]}>TIMESERA</Text>
          </LinearGradient>
        </MaskedView>

        {/* Subtitle with gradient */}
        <MaskedView
          maskElement={
            <Text style={[styles.subtitle, { backgroundColor: "transparent" }]}>
              GOLD{"   "}|{"   "}SILVER{"   "}|{"   "}DIAMOND
            </Text>
          }
        >
          <LinearGradient
            colors={["#d83b02ff", "#231d69ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.subtitle, { opacity: 0 }]}>
              GOLD{"   "}|{"   "}SILVER{"   "}|{"   "}DIAMOND
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>

      {/* Notification Icon */}
      <TouchableOpacity>
        {/* <Ionicons
          name="notifications"
          size={24}
          color="#fff"
          style={styles.notificaton}
        /> */}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const commonCircleStyle = {
  padding: 4,
  backgroundColor: "#fff",
  color: "#1A2A80",
  borderRadius: 50,
  borderColor: "#065315ff",
  borderWidth: 2,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // backgroundColor: "#003366",
  },
  center: { alignItems: "center" },
  title: {
    // color: "#ecdb7eff",
    color: "#e0ddd9ff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  subtitle: {
    color: "#ecdb7eff",
    fontSize: 10,
    padding: 5,
    fontFamily: "serif",
    fontWeight: "bold",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderRadius: 50,
  },
  notificaton: { ...commonCircleStyle },
  menu: { ...commonCircleStyle },
});
