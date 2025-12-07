// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React from "react";
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const PaymentHistory = () => {
//   const router = useRouter();
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.replace("/")}>
//             <Ionicons name="arrow-back" size={24} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>PAYMENT HISTORY</Text>
//           <View style={{ width: 24 }} />
//         </View>
//       </ScrollView>
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>© Timesera 2025 ( V-1.0.5 )</Text>
//         <Image
//           source={require("../../assets/images/icon.png")} // replace with your logo
//           style={styles.footerLogo}
//           resizeMode="contain"
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PaymentHistory;

// const styles = StyleSheet.create({
//   safeArea: {
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: 80, // ensures scroll area above footer
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 45,
//     backgroundColor: "#002D6B",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//   },
//   footerText: {
//     color: "#fff",
//     fontSize: 12,
//   },
//   footerLogo: {
//     width: 18,
//     height: 18,
//     marginLeft: 6,
//   },
// });

import { CREATE_JEWEL } from "@/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PaymentHistory() {
  const [PaymentHistoryData, setPaymentHistoryData] = useState<any>([]);

  const formatDate = (date: any) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
  };

  useEffect(() => {
    const getPaymentHistory = async () => {
      try {
        const userName = await AsyncStorage.getItem("userName");
        const storedTenant = await AsyncStorage.getItem("tenantName");
        if (storedTenant) {
          const res = await axios.get(
            `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhereandOrder?tableName=CASHFREE_PAYMENT_TRANS&where=USERID='${userName}'&order=id%20desc`,
            { headers: { tenantName: storedTenant } }
          );
          const responseData = res.data;
          setPaymentHistoryData(responseData);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    getPaymentHistory();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.pageTitle}>Payment History</Text> */}

      {PaymentHistoryData?.length === 0 ? (
        <Text style={styles.noHistory}>No payment history found.</Text>
      ) : (
        PaymentHistoryData?.map((item: any, index: number) => (
          <View key={index} style={styles.card}>
            {/* Amount */}
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Amount Paid</Text>
              <Text style={styles.amount}>₹{item?.Amount}</Text>
            </View>

            {/* Status */}
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Status</Text>
              <View
                style={[
                  styles.statusBadge,
                  item.Status === "PAID"
                    ? styles.success
                    : item?.Status === "ACTIVE"
                    ? styles.failed
                    : styles.pending,
                ]}
              >
                <Ionicons
                  name={
                    item.Status === "PAID"
                      ? "checkmark-circle"
                      : item.Status === "ACTIVE"
                      ? "close-circle"
                      : "alert-circle"
                  }
                  size={16}
                  color="#fff"
                />
                <Text style={styles.statusText}>
                  {item?.Status === "ACTIVE" ? "Failed" : "Sucesss"}
                </Text>
              </View>
            </View>

            {/* Installment ID */}
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Installment ID</Text>
              <Text style={styles.value}>{item?.INSTALLMENTNO?.trim()}</Text>
            </View>

            {/* Card Number */}
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Card Number</Text>
              <Text style={styles.value}>
                {/* •••• •••• ••••  */}
                {item.CardNo}
              </Text>
            </View>

            {/* Payment Date */}
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Payment Date</Text>
              <Text style={styles.value}>
                {dayjs(item?.CreatedDate).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f1f0e5ff",
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000",
  },
  noHistory: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#777",
  },

  // CARD
  card: {
    backgroundColor: "#e8f2e0ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    // width: "95%",
  },

  label: {
    color: "#154D71",
    fontSize: 12,
    fontWeight: "600",
  },

  value: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  // STATUS BADGES
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  success: { backgroundColor: "#0C9A4B" },
  failed: { backgroundColor: "#C62828" },
  pending: { backgroundColor: "#D89614" },
});
