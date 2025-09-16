import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RateCard({
  goldRate,
  silverRate,
}: {
  goldRate: string;
  silverRate: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TODAY'S RATE</Text>
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={styles.label}>Gold Rate/Gram</Text>
          <Text style={styles.value}>₹{goldRate}</Text>
        </View>
        <Text style={styles.separator}>|</Text>
        {/* </View> */}
        <View style={styles.card}>
          <Text style={styles.label}>Silver Rate/Gram</Text>
          <Text style={styles.value}>₹{silverRate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 25, paddingTop: 25, paddingBottom: 15 },
  heading: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8,
    color: "#143D60",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "#cf9610ff",
    borderWidth: 2,
    // padding: 5,
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  card: {
    // backgroundColor: "#fff",
    // padding: 12,
    // borderRadius: 8,
    // elevation: 3,
    // // minWidth: "40%",
    // alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#143D60",
    textAlign: "center",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
    color: "#880926ff",
  },
  separator: { fontSize: 50, color: "#cf9610ff" },
});
