import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Failed = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const userName = AsyncStorage.getItem("userName");

  // Animation Value
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
    return () => navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -60,
      }}
    >
      <Text style={styles.paymentText}>Payment Failed !</Text>
      {/* <View>
        <Text style={styles.paymentText}>Payment Failed</Text>
      </View> */}
      <View style={styles.container}>
        <Animated.Image
          source={require("../../assets/images/payment-failed1.jpg")}
          style={[
            {
              width: 200,
              height: 200,
            },
            { transform: [{ scale: scaleAnim }] }, // ✅ Apply animation
          ]}
        />
      </View>

      <View style={{ alignItems: "center", marginTop: 20 }}>
        {/* {params?.length ? ( */}
        <View>
          {/* <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>
              {params?.SchemeAmount ? params?.SchemeAmount : "25000"}
            </Text>
          </View> */}

          {/* <View style={styles.row}>
            <Text style={styles.label}>User Name</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{userName}</Text>
          </View> */}

          {/* <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>DKSH34u348uKU768</Text>
          </View> */}
        </View>
      </View>

      <View style={{ marginTop: 10, width: "90%" }}>
        {/* <Text style={{ color: "red", fontWeight: "bold" }}>
          Payments are currently in TEST MODE. No real charges will be made.
        </Text> */}
      </View>

      <View style={{ marginTop: 20, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#42a3bdff",
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 10,
          }}
          onPress={() => {
            router.replace("/");
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Go To Homepage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Failed;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  paymentText: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    color: "#cc2828ff",
  },
  row: {
    flexDirection: "row",
    marginVertical: 3,
    width: "80%",
  },
  label: {
    width: 120,
    fontWeight: "600",
    fontSize: 13,
  },
  colon: {
    width: 15,
    textAlign: "center",
    fontSize: 15,
  },
  value: {
    flexShrink: 1,
    fontSize: 13,
    marginLeft: 5,
  },
});
