import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";

type RootStackParamList = {
  "pay-ema": undefined;
  "my-plans": undefined;
  "paid-amount": undefined;
  "joined-schemes": undefined;
  [key: string]: undefined; // fallback for other routes
};

export default function CustomHeader() {
  //   const [fontsLoaded] = useFonts({
  //     Perpetua: require("../assets/fonts/SpaceMono-Regular.ttf"),
  //   });
  const [title, setTitle] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const routeTitles: Record<string, string> = {
    "pay-ema": "Pay EMI",
    "my-plans": "My Plans",
    "paid-amount": "Paid Amount",
    "total-weight": "Total Weight",
    "closed-accounts": "Closed Accounts",
    "new-plan": "New Plans",
    "new-purchase-plans/schemeName/[sno]": "Scheme Join",
    "new-purchase-plans/join-purchase-plan": "Payment",
    "joined-schemes": "Joined Schemes",
  };

  // 👇 Default title if route doesn’t match
  const currentTitle = routeTitles[route.name] || "TIMESERA";

  return (
    <LinearGradient
      colors={["#003366", "#1961a9ff", "#051a2eff"]} // three colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }} // horizontal gradient
      style={styles.header}
    >
      {/* Menu Icon */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="#fff"
          style={styles.menu}
        />
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
              {currentTitle}
            </Text>
          }
        >
          <LinearGradient
            colors={["#b6a024ff", "#b9a740ff", "#e3d37dff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.title, { opacity: 0 }]}>{currentTitle}</Text>
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
          {/* <LinearGradient
            colors={["#ecdb7eff", "#fff7b2ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.subtitle, { opacity: 0 }]}>
              GOLD{"   "}|{"   "}SILVER{"   "}|{"   "}DIAMOND
            </Text>
          </LinearGradient> */}
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
    borderRadius: 50,
  },
  notificaton: { ...commonCircleStyle },
  menu: { ...commonCircleStyle },
});
