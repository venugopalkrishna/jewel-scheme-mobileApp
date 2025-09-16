import MaskedView from "@react-native-masked-view/masked-view";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type DrawerParamList = {
  index: undefined;
  settings: undefined;
};

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export default function MenuHeader() {
  //   const [fontsLoaded] = useFonts({
  //     Perpetua: require("../assets/fonts/SpaceMono-Regular.ttf"),
  //   });

  const navigation = useNavigation<NavigationProp>();

  return (
    <LinearGradient
      colors={["#003366", "#1961a9ff", "#051a2eff"]} // three colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }} // horizontal gradient
      style={styles.header}
    >
      {/* Logo */}
      <Image
        source={require("../../assets/images/splash-icon.png")}
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
            colors={["#b6a024ff", "#b9a740ff", "#e3d37dff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.title, { opacity: 0 }]}>TIMESERA</Text>
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
            colors={["#ecdb7eff", "#fff7b2ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.subtitle, { opacity: 0 }]}>
              GOLD{"   "}|{"   "}SILVER{"   "}|{"   "}DIAMOND
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    // borderBottomLeftRadius: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  center: { alignItems: "center" },
  title: {
    color: "#ecdb7eff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  subtitle: {
    color: "#ecdb7eff",
    fontSize: 10,
    padding: 5,
    fontFamily: "serif",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
