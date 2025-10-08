import Header from "@/components/Homepages/Header";
import AccountDeletionDialog from "@/components/UserAuthentication/AccountDeletion";
import { useAuth } from "@/context/AuthContext";
import {
  AntDesign,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export default function Layout() {
  const { login, isLogged } = useAuth();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: "white", // 👈 active icon/text color
          drawerInactiveTintColor: "#05071aff", // 👈 inactive icon/text color
          drawerActiveBackgroundColor: "#2a2e5fff", // 👈 optional background
          headerShown: false,
          header: () => <Header />, // ✅ use your custom header here

          drawerLabelStyle: {
            fontSize: 12, // 👈 reduce font size of labels
          },
          drawerItemStyle: {
            marginVertical: 0, // 👈 controls vertical spacing between items
          },
        }}
        drawerContent={(props) => (
          <DrawerContentScrollView
            {...props}
            // style={{ padding: 0, margin: 0, marginTop: -40 }}
          >
            {/* ✅ Custom Header at the top */}
            {/* <View style={styles.headerContainer}>
            <MenuHeader />
          </View> */}

            {/* 👇 Render the actual drawer items */}
            <DrawerItemList {...props} />
            {isLogged && (
              <DrawerItem
                label="Account Deletion"
                icon={({ color }) => (
                  <AntDesign name="delete" size={18} color="red" />
                )}
                onPress={() => setShowDialog(true)} // 👈 open the dialog
              />
            )}
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="login"
          options={{
            title: isLogged == false ? "Login/Signup" : "Logout",
            drawerIcon: ({ color, size }) => (
              <AntDesign
                name={isLogged == false ? "login" : "logout"}
                size={18}
                color={color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="paymentHistory"
          options={{
            title: "Payment History",
            drawerIcon: ({ color, size, focused }) => (
              <MaterialIcons
                name="payment"
                size={18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
        <Drawer.Screen
          name="rateHistory" // 👈 maps to app/public/settings.tsx
          options={{
            title: "Rate History",
            drawerIcon: ({ focused, size, color }) => (
              <MaterialIcons
                name="work-history"
                size={focused ? 18 : 18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
        <Drawer.Screen
          name="offers" // 👈 maps to app/public/settings.tsx
          options={{
            title: "Offers",
            drawerIcon: ({ focused, size, color }) => (
              <MaterialCommunityIcons
                name="offer"
                size={focused ? 18 : 18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
        <Drawer.Screen
          name="newArrivals" // 👈 maps to app/public/settings.tsx
          options={{
            title: "New Arrivals",
            drawerIcon: ({ focused, size, color }) => (
              <Foundation
                name="burst-new"
                size={focused ? 18 : 18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
        <Drawer.Screen
          name="myProfileSettings" // 👈 maps to app/public/settings.tsx
          options={{
            title: "My Profile Settings",
            drawerIcon: ({ focused, size, color }) => (
              <MaterialCommunityIcons
                name="account-settings"
                size={focused ? 18 : 18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
        <Drawer.Screen
          name="invite" // 👈 maps to app/public/settings.tsx
          options={{
            title: "Invite",
            drawerIcon: ({ focused, size, color }) => (
              <AntDesign
                name="shrink"
                size={focused ? 18 : 18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
        <Drawer.Screen
          name="aboutUs" // 👈 maps to app/public/settings.tsx
          options={{
            title: "About Us",
            drawerIcon: ({ focused, size, color }) => (
              <FontAwesome5
                name="flushed"
                size={focused ? 18 : 18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
        <Drawer.Screen
          name="faq" // 👈 maps to app/public/settings.tsx
          options={{
            title: "FAQ",
            drawerIcon: ({ focused, size, color }) => (
              <MaterialCommunityIcons
                name="comment-question-outline"
                size={focused ? 18 : 18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
        <Drawer.Screen
          name="ourPolicies" // 👈 maps to app/public/settings.tsx
          options={{
            title: "Our Policies",
            drawerIcon: ({ focused, size, color }) => (
              <MaterialIcons
                name="policy"
                size={focused ? 18 : 18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
        <Drawer.Screen
          name="contactUs" // 👈 maps to app/public/settings.tsx
          options={{
            title: "Contact Us",
            drawerIcon: ({ focused, size, color }) => (
              <AntDesign
                name="phone"
                size={focused ? 18 : 18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
        <Drawer.Screen
          name="writeToUs" // 👈 maps to app/public/settings.tsx
          options={{
            title: "Write to Us",
            // drawerStyle: { display: "none" },
            drawerIcon: ({ focused, size, color }) => (
              <AntDesign
                name="form"
                size={focused ? 18 : 18}
                color={focused ? "green" : color}
              />
            ),
            // headerShown: true,
          }}
        />
      </Drawer>
      <AccountDeletionDialog
        visible={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "green",
  // },
  headerContainer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
