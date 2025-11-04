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

const PaidAmount = () => {
  const router = useRouter();
  const [paidAmountData, setPaidAmountData] = useState<any[]>([]);

  const receiptData = () => {
    const data = [
      {
        RecNo: 17.0,
        RecDate: "2025-10-28T07:33:37.343",
        Rectime: "2025-10-28T07:33:37.343",
        EmpCode: "string",
        SchemeGroup: "1000 SCHEME",
        SchemeName: "1000 SCHEME",
        GoldRate: 0.0,
        CardNo: "17",
        Phno: "999",
        SchemeMember: "TIMESRA",
        Add1: "123",
        add2: "456",
        add3: "789",
        SchemeAmount: 1000.0,
        SchemeDuration: 10.0,
        BonusAmount: 0.0,
        Amount: 1000.0,
        SchemeValue: 10000.0,
        SchemeJDate: "2025-10-28T07:33:37.343",
        RecAmount: 1000.0,
        GoldWt: 0.0,
        Mode: "CASH",
        Accno: "string",
        Chequeno: "string",
        Incharger: "App",
        Narr: "-",
        UNAME: "TIMESRA",
        SchemeType: "LAKSHMI KATAKSHAM GOLD SCHEME",
        SchemeMode: "string",
        SBMonths: 0.0,
        GiftVoucher: 0.0,
        Collect_Point: "string",
        PAYMODE: "string",
        MODETYPE: "string",
        ACCNAME: "string",
        FYEAR: "25-26",
        INSTNO: 1.0,
        PREGOLDWT: 0.0,
        CLOUD_UPLOAD: true,
        CASH: 1000.0,
        CARD: 0.0,
        UPI: 0.0,
        ONLINE: 0.0,
        CHEQUE: 0.0,
        AREA: "NELLORE",
        SchemeENDDate: "1900-01-01T00:00:00",
        APP_USERID: "venugopal",
      },
      {
        RecNo: 18.0,
        RecDate: "2025-10-28T07:33:37.343",
        Rectime: "2025-10-28T07:33:37.343",
        EmpCode: "string",
        SchemeGroup: "1000 SCHEME",
        SchemeName: "1000 SCHEME",
        GoldRate: 0.0,
        CardNo: "17",
        Phno: "999",
        SchemeMember: "TIMESRA",
        Add1: "123",
        add2: "456",
        add3: "789",
        SchemeAmount: 1000.0,
        SchemeDuration: 10.0,
        BonusAmount: 0.0,
        Amount: 1000.0,
        SchemeValue: 10000.0,
        SchemeJDate: "2025-10-28T07:33:37.343",
        RecAmount: 1000.0,
        GoldWt: 0.0,
        Mode: "CASH",
        Accno: "string",
        Chequeno: "string",
        Incharger: "App",
        Narr: "-",
        UNAME: "TIMESRA",
        SchemeType: "LAKSHMI KATAKSHAM GOLD SCHEME",
        SchemeMode: "string",
        SBMonths: 0.0,
        GiftVoucher: 0.0,
        Collect_Point: "string",
        PAYMODE: "string",
        MODETYPE: "string",
        ACCNAME: "string",
        FYEAR: "25-26",
        INSTNO: 1.0,
        PREGOLDWT: 0.0,
        CLOUD_UPLOAD: true,
        CASH: 1000.0,
        CARD: 0.0,
        UPI: 0.0,
        ONLINE: 0.0,
        CHEQUE: 0.0,
        AREA: "NELLORE",
        SchemeENDDate: "1900-01-01T00:00:00",
        APP_USERID: "venugopal",
      },
    ];
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
  };

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
          showsVerticalScrollIndicator={false}
        >
          {paidAmountData.length > 0 ? (
            <ScrollView contentContainerStyle={{ padding: 10 }}>
              {paidAmountData.map((item, index) => (
                <View key={index} style={styles.schemeBox}>
                  <Text style={styles.cnoText1}>
                    CNO :{" "}
                    <Text style={styles.cnoText}>{item?.CardNo || 0}</Text>
                  </Text>
                  <View style={styles.line} />

                  <View style={styles.row}>
                    <Text style={styles.label}>SchemeGroup</Text>
                    <Text style={styles.colon}>:</Text>
                    <Text style={styles.value}>{item?.SchemeGroup || "-"}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.label}>SchemeName</Text>
                    <Text style={styles.colon}>:</Text>
                    <Text style={styles.value}>{item?.SchemeName || "-"}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.label}>SchemeAmount</Text>
                    <Text style={styles.colon}>:</Text>
                    <Text style={styles.value}>
                      {item?.SchemeAmount ? item.SchemeAmount.toFixed(2) : "-"}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.label}>SchemeDuration</Text>
                    <Text style={styles.colon}>:</Text>
                    <Text style={styles.value}>
                      {item?.SchemeDuration || "-"}
                    </Text>
                  </View>
                  <View style={styles.line} />

                  <View style={styles.row}>
                    <Text style={styles.label}>Pay Months</Text>
                    <Text style={styles.colon}>:</Text>
                    <Text style={styles.value}>{item?.Count || "-"}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Paid Amount</Text>
                    <Text style={styles.colon}>:</Text>
                    <Text style={styles.value}>{item?.TotalAmount || "-"}</Text>
                  </View>
                </View>
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

  label: {
    width: 130,
    fontSize: 15,
    fontFamily: "serif",
  },

  colon: {
    width: 10,
    fontSize: 15,
    fontFamily: "serif",
  },

  value: {
    fontSize: 15,
    fontFamily: "serif",
    flexShrink: 1,
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
