import { CREATE_JEWEL } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
import { Card } from "react-native-paper";

const PaidAmount = () => {
  const router = useRouter();
  const [paidAmountData, setPaidAmountData] = useState<any[]>([]);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/splash-icon.png")}
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
          showsVerticalScrollIndicator={true}
        >
          {paidAmountData.length > 0 ? (
            <ScrollView contentContainerStyle={{ padding: 10 }}>
              {paidAmountData.map((item, index) => (
                // <View key={index} style={styles.schemeBox}>
                //   <Text style={styles.cnoText1}>
                //     CNO :{" "}
                //     <Text style={styles.cnoText}>{item?.CardNo || 0}</Text>
                //   </Text>
                //   <View style={styles.line} />

                //   <View style={styles.row}>
                //     <Text style={styles.label}>SchemeGroup</Text>
                //     <Text style={styles.colon}>:</Text>
                //     <Text style={styles.value}>{item?.SchemeGroup || "-"}</Text>
                //   </View>

                //   <View style={styles.row}>
                //     <Text style={styles.label}>SchemeName</Text>
                //     <Text style={styles.colon}>:</Text>
                //     <Text style={styles.value}>{item?.SchemeName || "-"}</Text>
                //   </View>

                //   <View style={styles.row}>
                //     <Text style={styles.label}>SchemeAmount</Text>
                //     <Text style={styles.colon}>:</Text>
                //     <Text style={styles.value}>
                //       {item?.SchemeAmount ? item.SchemeAmount.toFixed(2) : "-"}
                //     </Text>
                //   </View>

                //   <View style={styles.row}>
                //     <Text style={styles.label}>SchemeDuration</Text>
                //     <Text style={styles.colon}>:</Text>
                //     <Text style={styles.value}>
                //       {item?.SchemeDuration || "-"}
                //     </Text>
                //   </View>
                //   <View style={styles.line} />

                //   <View style={styles.row}>
                //     <Text style={styles.label}>Pay Months</Text>
                //     <Text style={styles.colon}>:</Text>
                //     <Text style={styles.value}>{item?.Count || "-"}</Text>
                //   </View>
                //   <View style={styles.row}>
                //     <Text style={styles.label}>Paid Amount</Text>
                //     <Text style={styles.colon}>:</Text>
                //     <Text style={styles.value}>{item?.TotalAmount || "-"}</Text>
                //   </View>
                // </View>
                <Card style={styles.card}>
                  {/* Header */}
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderLeft}>
                      {index + 1}. {item?.SchemeGroup}
                    </Text>
                    <Text style={styles.cardHeaderRight}>{item?.CardNo}</Text>
                  </View>

                  {/* Body */}
                  <View style={styles.cardBody}>
                    {[
                      { label: "Amount", value: `₹${item?.SchemeAmount}` },
                      {
                        label: "Duration",
                        value: `${item?.SchemeDuration} months`,
                      },
                      {
                        label: "Pay Months",
                        value: `${item?.Count}`,
                      },
                      {
                        label: "Paid Amount",
                        value: `₹${item?.TotalAmount}`,
                      },
                    ].map((row, i) => (
                      <View
                        key={i}
                        style={[
                          row?.label == "Paid Amount"
                            ? styles.paidAmount
                            : styles.row,
                        ]}
                      >
                        <Text
                          style={[
                            row?.label == "Paid Amount"
                              ? styles.paidAmountLabel
                              : styles.label,
                          ]}
                        >
                          {row.label}
                        </Text>
                        <Text
                          style={[
                            row?.label == "Paid Amount"
                              ? styles.paidAmountColon
                              : styles.colon,
                          ]}
                        >
                          :
                        </Text>
                        <Text
                          style={[
                            row?.label == `Paid Amount`
                              ? styles.paidAmountValue
                              : styles.value,
                          ]}
                        >
                          {row.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Card>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Data Available</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Timesera 2025 ( V-1.0.5 )</Text>
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

export default PaidAmount;

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // ensures scroll area above footer
  },

  // card: {
  //   backgroundColor: "#154D71",
  //   borderRadius: 12,
  //   paddingVertical: 25,
  //   paddingHorizontal: 20,
  //   marginVertical: 5,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5, // Android shadow
  // },

  // cardTitle: {
  //   fontSize: 16,
  //   fontFamily: "serif",
  //   marginBottom: 15,
  // },

  // cardSubtitle: {
  //   color: "#fff",
  //   fontSize: 14,
  //   marginTop: 10,
  // },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    // marginHorizontal: 12,
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
  schemeBox: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },

  cnoText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
    // textDecorationLine: "underline",
  },

  cnoText1: {
    // fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 6,
    // textDecorationLine: "underline",
  },

  line: {
    borderBottomWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },

  paidAmount: {
    backgroundColor: "#157b88ff",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "center",
  },

  label: {
    width: 130,
    fontSize: 15,
    fontFamily: "serif",
  },

  paidAmountLabel: {
    width: 100,
    fontSize: 15,
    fontFamily: "serif",
    color: "#fff",
  },

  colon: {
    width: 10,
    fontSize: 15,
    fontFamily: "serif",
  },
  paidAmountColon: {
    width: 10,
    fontSize: 15,
    fontFamily: "serif",
    color: "#fff",
  },

  value: {
    fontSize: 15,
    fontFamily: "serif",
    flexShrink: 1,
  },
  paidAmountValue: {
    fontSize: 15,
    fontFamily: "serif",
    flexShrink: 1,
    color: "#fff",
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
