import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Foundation from "@expo/vector-icons/Foundation";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const menuItems = [
  {
    title: "New Purchase Plan",
    iconType: "Foundation",
    icon: "burst-new",
    route: "newPlan",
  },
  {
    title: "My Plans",
    iconType: "AntDesign",
    icon: "carryout",
    route: "/my-plans",
  },
  { title: "Pay EMA", iconType: "Ionicons", icon: "card", route: "/pay-ema" },
  {
    title: "Paid Amount",
    iconType: "MaterialIcons",
    icon: "paid",
    route: "/paid-amount",
  },
  {
    title: "Total Weight",
    iconType: "FontAwesome5",
    icon: "weight",
    route: "/total-weight",
  },
  {
    title: "My Wallet",
    iconType: "Ionicons",
    icon: "wallet",
    route: "/my-wallet",
  },
];

const iconMap: Record<string, any> = {
  AntDesign,
  Foundation,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
};

export default function MenuGrid() {
  const router = useRouter();
  const renderIcon = (item: any) => {
    const IconComponent = iconMap[item.iconType] || Ionicons; // fallback
    return <IconComponent name={item.icon} size={28} color="#fff" />;
  };
  const { login, isLogged } = useAuth();

  return (
    <View>
      <Text style={styles.userName}>Hello Vamsi</Text>
      <FlatList
        data={menuItems}
        numColumns={3}
        scrollEnabled={false} // ✅ prevents nested vertical scrolling conflict
        contentContainerStyle={styles.grid}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              // if (isLogged) {
              // ✅ already logged in → navigate to route
              // if (item?.route) {
              // router.replace(`/(public)/${item?.route}` as any);
              router.push(`/explore/${item?.route}` as any);
              console.log(item?.route, "route");

              //   } else {
              //     console.warn(`No route defined for ${item.title}`);
              //   }
              // } else {
              //   // ❌ not logged in → send to login page
              //   // router.replace("/login");
              // }
            }}
          >
            <Text style={styles.icon}>{renderIcon(item)}</Text>
            <Text style={styles.label}>{item.title}</Text>
            <Text style={styles.caption}>TEXT</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { padding: 0 },
  item: {
    flex: 1,
    alignItems: "center",
    margin: 8,
    padding: 5,
    // backgroundColor: "#fff",
    borderRadius: 8,
    // elevation: 2,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
  userName: {
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    color: "#154D71",
  },
  icon: {
    backgroundColor: "#194791ff",
    padding: 8,
    borderRadius: 50,
    color: "#fff",
  },
  caption: {
    fontWeight: "500",
    fontFamily: "sans-serif",
  },
});
