import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const PaymentHistory = () => {
  const router = useRouter();
  return (
    <View>
      <Text>PaymentHistory</Text>
      <Button onPress={() => router.push("/explore/details-now")}>
        Button
      </Button>
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({});
