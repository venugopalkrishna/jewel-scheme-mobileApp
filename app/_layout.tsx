// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import "react-native-reanimated";

// import { useColorScheme } from "@/hooks/useColorScheme";

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

// app/_layout.tsx
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const IsLoggedIn = useAuth();
  const segments = useSegments();
  const router = useRouter();
  // registerNNPushToken(32667, "buA6zsNTsskAZ8MllfVkM0");

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

  //     // ✅ Register device with Native Notify (your App ID & Token)
  //     registerNNPushToken(32667, "buA6zsNTsskAZ8MllfVkM0");
  //   };

  //   registerForPushNotifications();
  // }, []);

  useEffect(() => {
    const inPublic =
      segments[0]?.startsWith("(drawer)") || segments[0]?.startsWith("explore");
    if (!IsLoggedIn && inPublic) {
      // router.replace("/(public)/login");
    }
  }, [segments, IsLoggedIn]);

  return children;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AuthGuard>
          <PaperProvider>
            <ImageBackground
              source={require("../assets/images/splash-icon.png")}
              style={styles.background}
              resizeMode="cover"
            >
              <View style={styles.margintop}></View>
              <Toast />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="(drawer)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="explore" options={{ headerShown: false }} />
              </Stack>
            </ImageBackground>
          </PaperProvider>
        </AuthGuard>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  margintop: {
    padding: 18,
    backgroundColor: "#000",
  },
});
