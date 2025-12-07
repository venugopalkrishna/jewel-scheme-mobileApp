import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Foundation from "@expo/vector-icons/Foundation";

import { CREATE_JEWEL } from "@/api";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const menuItems = [
  {
    title: "New Plans",
    iconType: "Foundation",
    icon: "burst-new",
    route: "new-plan",
  },
  { title: "Due EMI's", iconType: "Ionicons", icon: "card", route: "/pay-ema" },
  {
    title: "My Plans",
    iconType: "AntDesign",
    icon: "carryout",
    route: "/my-plans",
  },
  {
    title: "Paid Installments",
    iconType: "MaterialIcons",
    icon: "paid",
    route: "/paid-amount",
  },
  // {
  //   title: "Total Weight",
  //   iconType: "FontAwesome5",
  //   icon: "weight",
  //   route: "/total-weight",
  // },
  {
    title: "Closed Accounts",
    iconType: "MaterialIcons",
    icon: "logout",
    route: "/closed-accounts",
  },
  // {
  //   title: "Success",
  //   iconType: "FontAwesome",
  //   icon: "check",
  //   route: "/success",
  // },
  // {
  //   title: "Failed",
  //   iconType: "Feather",
  //   icon: "x",
  //   route: "/failed",
  // },
];

const iconMap: Record<string, any> = {
  AntDesign,
  Foundation,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome,
};

export default function MenuGrid() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>([]);

  const renderIcon = (item: any) => {
    const IconComponent = iconMap[item.iconType] || Ionicons; // fallback
    return <IconComponent name={item.icon} size={28} color="#fff" />;
  };
  const { login, isLogged } = useAuth();
  const getUserAPI = async () => {
    try {
      const userName = await AsyncStorage.getItem("userName");

      // Call your backend API endpoint
      const res: any = await axios.get(
        `${CREATE_JEWEL}/api/Tenant/GetSchemeUserDetails?userName=${userName}`
      );
      setUserDetails(res?.data);
    } catch (error) {
      console.error("Account deletion error:", error);
      throw error;
    }
  };

  const reshapeMenuItems = (items: any) => {
    const rows = [];

    // first row → 2 items
    rows.push(items.slice(0, 2));

    // remaining rows → 3 items each
    const remaining = items.slice(2);

    for (let i = 0; i < remaining.length; i += 3) {
      rows.push(remaining.slice(i, i + 3));
    }

    return rows;
  };

  const rows = reshapeMenuItems(menuItems);

  useEffect(() => {
    getUserAPI();
  }, []);

  return (
    <View>
      <Text style={styles.userName}>
        Hello {userDetails ? userDetails[0]?.FULLNAME : ""}
      </Text>
      <FlatList
        data={rows}
        scrollEnabled={false}
        keyExtractor={(item, index) => "row-" + index}
        renderItem={({ item: row }) => (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {row.map((item: any) => (
              <TouchableOpacity
                key={item.title}
                style={{ flex: 1, alignItems: "center", margin: 8 }}
                onPress={() => {
                  if (isLogged) {
                    router.push(`/explore/${item.route}` as any);
                  } else {
                    router.replace("/(drawer)/login");
                  }
                }}
              >
                <Text style={styles.icon}>{renderIcon(item)}</Text>
                <Text style={styles.label}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}

//  <FlatList
//    data={menuItems}
//    numColumns={3}
//    scrollEnabled={false} // ✅ prevents nested vertical scrolling conflict
//    contentContainerStyle={styles.grid}
//    keyExtractor={(item) => item.title}
//    renderItem={({ item }) => (
//      <TouchableOpacity
//        style={styles.item}
//        // onPress={() => {
//        //   if (isLogged) {
//        //     // ✅ already logged in → navigate to route
//        //     // if (item?.route) {
//        //     // router.replace(`/(public)/${item?.route}` as any);
//        //     router.push(`/explore/${item?.route}` as any);

//        //     //   } else {
//        //     //     console.warn(`No route defined for ${item.title}`);
//        //     //   }
//        //   } else {
//        //     // ❌ not logged in → send to login page
//        //     router.replace("/(drawer)/login");
//        //   }
//        // }}
//        onPress={() => {
//          if (isLogged) {
//            router.push(`/explore/${item.route}` as any);
//          } else {
//            router.replace("/(drawer)/login");
//          }
//        }}
//      >
//        <Text style={styles.icon}>{renderIcon(item)}</Text>
//        <Text style={styles.label}>{item.title}</Text>
//        {/* <Text style={styles.caption}>TEXT</Text> */}
//      </TouchableOpacity>
//    )}
//  />;
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
    backgroundColor: "#0e502bff",
    // backgroundColor: "#56c689ff",
    // backgroundColor: "#1d5442ff",
    padding: 8,
    borderRadius: 50,
    color: "#fff",
  },
  caption: {
    fontWeight: "500",
    fontFamily: "sans-serif",
  },
});
