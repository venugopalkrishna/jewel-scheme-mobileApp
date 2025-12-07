import { CREATE_JEWEL } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
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
const TotalWeight = () => {
  const router = useRouter();
  const [schemeTypeData, setSchemeData] = useState<any[]>([]);
  const [paidAmountData, setPaidAmountData] = useState<any[]>([]);
  const version = Constants?.expoConfig?.version;
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
          setPaidAmountData((prev) => [...prev, updatedData]);
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

  // useEffect(() => {
  //   const fetchTenantAndData = async () => {
  //     try {
  //       const storedTenant = await AsyncStorage.getItem("tenantName");
  //       if (storedTenant) {
  //         const res = await axios.get(
  //           `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithOrder?tableName=SCHEME_TYPE&order=SNO`,
  //           { headers: { tenantName: storedTenant } }
  //         );
  //         // setSchemeData(res.data || []);
  //       }
  //     } catch (err) {
  //       console.log("Error fetching data:", err);
  //     }
  //   };
  //   fetchTenantAndData();
  // }, []);
  const totalGoldWt = paidAmountData.reduce((sum, item) => {
    return sum + (item.GoldWt || 0);
  }, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/backgroundImage2.jpg")}
        style={styles.container}
      >
        {/* <ScrollView contentContainerStyle={{ padding: 10 }}>
        {Array.isArray(schemeTypeData) &&
          schemeTypeData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => {
                router.push({
                  pathname:
                    `/explore/new-purchase-plans/schemeName/[sno]` as any,
                  params: { ...item },
                });
              }}
            >
              <GradientText text={item?.SchemeType} style={styles.cardTitle} />
              <Text style={styles.cardSubtitle}>{item?.SchemeMode}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView> */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {paidAmountData.length > 0 ? (
            <ScrollView contentContainerStyle={{ padding: 10 }}>
              <View
                style={{
                  // flex: 1,
                  // justifyContent: "center",
                  // alignContent: "center",
                  // alignSelf: "center",
                  alignItems: "center",
                  backgroundColor: "#6FC1A7",
                  marginHorizontal: 60,
                  paddingVertical: 20,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
                >
                  Your Total Weight
                </Text>
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
                >
                  {totalGoldWt}
                </Text>
              </View>
            </ScrollView>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Data Available</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Timesera 2025 ( V-{version} )</Text>
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

export default TotalWeight;

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // ensures scroll area above footer
  },

  card: {
    backgroundColor: "#154D71",
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },

  cardTitle: {
    fontSize: 16,
    fontFamily: "serif",
    marginBottom: 15,
  },

  cardSubtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
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
