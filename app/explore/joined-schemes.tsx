import { CREATE_JEWEL } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import dayjs from "dayjs";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card } from "react-native-paper";

const JoinedSchemes = () => {
  const [schemeMemberData, setSchemeMemberData] = useState<any>([]);
  const [paidAmountData, setPaidAmountData] = useState<any[]>([]);
  const version = Constants?.expoConfig?.version;

  const router = useRouter();
  const params = useLocalSearchParams();

  const paymentReceiptAPI = async (card: number) => {
    try {
      const userName = await AsyncStorage.getItem("userName");
      const storedTenant = await AsyncStorage.getItem("tenantName");

      if (storedTenant) {
        const res = await axios.get(
          `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhere?tableName=RECEIPT_MAST&where=APP_USERID='${userName}' AND CARDNO='${card}'`,
          { headers: { tenantName: storedTenant } }
        );

        const data = res.data || [];

        if (data.length > 0) {
          // Calculate count and total RecAmount
          const count = data.length;
          const totalAmount = data.reduce(
            (sum: number, item: any) => sum + (item.RecAmount || 0),
            0
          );

          // Take the first record as a base, add Count & TotalAmount
          const updatedData = {
            ...data[0],
            Count: count,
            TotalAmount: totalAmount.toFixed(2),
          };

          // Store only a single merged object for this card
          setPaidAmountData((prev: any) => [...prev, updatedData]);
        } else {
          console.log("No receipt data found for Card:", card);
        }
      }
    } catch (err) {
      console.log("Error fetching RECEIPT_MAST:", err);
    }
  };

  useEffect(() => {
    const schemeMemberAPI = async () => {
      try {
        const userName = await AsyncStorage.getItem("userName");
        const storedTenant = await AsyncStorage.getItem("tenantName");
        if (storedTenant) {
          const res = await axios.get(
            `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhereandOrder?tableName=SCHEME_MEMBER&where=APP_USERID='${userName}'&order=CNO`,
            { headers: { tenantName: storedTenant } }
          );
          const memberData = res.data;
          for (const item of memberData) {
            if (item.CNO) {
              await paymentReceiptAPI(item.CNO);
            }
          }
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    schemeMemberAPI();
    // receiptData();
  }, []);

  useEffect(() => {
    const fetchTenantAndData = async () => {
      try {
        const userName = await AsyncStorage.getItem("userName");
        const storedTenant = await AsyncStorage.getItem("tenantName");
        if (storedTenant) {
          const res = await axios.get(
            `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhereandOrder?tableName=SCHEME_MEMBER&where=APP_USERID='${userName}'&order=CNO`,
            { headers: { tenantName: storedTenant } }
          );
          setSchemeMemberData(res.data || []);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchTenantAndData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/backgroundImage2.jpg")}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              color: "#154D71",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {/* {schemeName?.[0]?.SchemeType ?? "My Schemes"} */}
          </Text>
          {schemeMemberData?.length > 0
            ? schemeMemberData
                .filter((item: any) => item.SchemeGroup === params?.SchemeGroup) // <-- filter here

                .map((item: any, index: any) => (
                  <Card key={index} style={styles.card}>
                    {/* Header */}
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderLeft}>
                        {index + 1}. {item.SchemeGroup}
                      </Text>

                      <Text style={styles.cardHeaderRight}>{item?.CardNo}</Text>
                    </View>

                    {/* Body */}
                    <View style={styles.cardBody}>
                      {[
                        {
                          label: "Join Date",
                          value: `${dayjs(item?.SchemeJoinDate)?.format(
                            "DD/MM/YYYY"
                          )}`,
                        },
                        {
                          label: "Scheme Name",
                          value: `${item?.SchemeName}`,
                        },
                        {
                          label: "Duration",
                          value: `${item.SchemeDuration} months`,
                        },
                        {
                          label: "Due Amount",
                          value: `₹${item.SchemeAmount}`,
                        },
                      ].map((row, i) => (
                        <View key={i} style={styles.row}>
                          <Text style={styles.label}>{row.label}</Text>
                          <Text style={styles.colon}>:</Text>
                          <Text style={styles.value}>{row.value}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Button */}
                  </Card>
                ))
            : null}
        </ScrollView>
        {/* <ScrollView contentContainerStyle={{ padding: 10 }}>
          
        </ScrollView> */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Timesera 2025 ( V-{version})</Text>
          <Image
            source={require("../../assets/images/icon.png")} // replace with your logo
            style={styles.footerLogo}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default JoinedSchemes;

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 30 },
  safeArea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    // paddingBottom: 80,
  },
  headerText: {
    color: "#154D71",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 8,
    elevation: 4,
    overflow: "hidden",
  },
  cardHeader: {
    backgroundColor: "#6FC1A7",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cardHeaderLeft: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  cardHeaderRight: {
    color: "#fff",
    fontSize: 14,
    backgroundColor: "#703c04ff",
    padding: 7,
    borderRadius: 50,
    fontWeight: "bold",
  },
  cardBody: {
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  label: {
    flex: 1.3,
    color: "#444",
    fontSize: 14,
  },
  colon: {
    color: "#000",
    fontWeight: "bold",
    marginRight: 8,
  },
  // divider: {
  //   height: 20,
  //   width: 1,
  //   backgroundColor: "#ccc",
  //   marginRight: 8,
  // },
  value: {
    flex: 1.7,
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "right",
  },
  joinButton: {
    backgroundColor: "#154D71",
    alignSelf: "center",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 28,
    marginVertical: 10,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
  },
  noDataText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: "#002D6B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
  },
  footerLogo: {
    width: 18,
    height: 18,
    marginLeft: 6,
  },
});
