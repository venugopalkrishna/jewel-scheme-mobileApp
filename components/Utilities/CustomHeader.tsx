import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";

export default function CustomHeader() {
  //   const [fontsLoaded] = useFonts({
  //     Perpetua: require("../assets/fonts/SpaceMono-Regular.ttf"),
  //   });

  // const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#003366", "#1961a9ff", "#051a2eff"]} // three colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }} // horizontal gradient
      style={styles.header}
    >
      {/* Menu Icon */}

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

      {/* Notification Icon */}
    </LinearGradient>
  );
}

const commonCircleStyle = {
  padding: 8,
  backgroundColor: "#fff",
  color: "#1A2A80",
  borderRadius: 50,
  borderColor: "#FFC900",
  borderWidth: 2,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // backgroundColor: "#003366",
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
  notificaton: { ...commonCircleStyle },
  menu: { ...commonCircleStyle },
});
