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
  TouchableOpacity,
  View,
} from "react-native";

const PayEma = () => {
  const router = useRouter();
  const [schemeDetData, setSchemeDetData] = useState<any[]>([]);
  console.log(schemeDetData);

  // const schemeMemberDet = async (card: number) => {
  //   try {
  //     const userName = await AsyncStorage.getItem("userName");
  //     const storedTenant = await AsyncStorage.getItem("tenantName");
  //     if (storedTenant) {
  //       const res = await axios.get(
  //         `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhere?tableName=MEMBER_CARD_DET&where=APP_USERID='${userName}' AND CARDNO='${card}' AND PSTATUS='false'`,
  //         { headers: { tenantName: storedTenant } }
  //       );

  //       const data = res.data || [];
  //       const today = new Date();
  //       const next30Days = new Date();
  //       next30Days.setDate(today.getDate() + 30);

  //       // Filter objects where MONTH is within 30 days from today
  //       const filteredData = data.filter((item: any) => {
  //         if (!item.MONTH) return false;

  //         const itemDate = new Date(item.MONTH); // assuming MONTH is a date string
  //         return itemDate >= today && itemDate <= next30Days;
  //       });

  //       // Append matching data to existing state
  //       setSchemeDetData((prevData) => [...prevData, ...filteredData]);

  //       console.log("Filtered Data for Card:", card, filteredData);
  //     }
  //   } catch (err) {
  //     console.log("Error fetching MEMBER_CARD_DET:", err);
  //   }
  // };

  const schemeMemberDetAPI = () => {
    const pastData = [
      {
        ADD1: "123",
        ADD2: "456",
        ADD3: "789",
        ADD4: "1",
        APP_USERID: "madhubabu",
        AREA: "NELLORE",
        CARDNO: "1",
        MONTH: "2025-09-28",
        PSTATUS: false,
        RECDATE: null,
        RECNO: null,
        SCHEMEAMOUNT: 1000,
        SCHEMEDURATION: 10,
        SCHEMEENDDATE: "1900-01-01T00:00:00",
        SCHEMEGROUP: "1000 SCHEME",
        SCHEMEJOINDATE: "2025-10-28T07:11:55.247",
        SCHEMEMEMBER: "TIMESRA",
        SCHEMENAME: "1000 SCHEME",
        SCHEMETYPE: "LAKSHMI KATAKSHAM GOLD SCHEME",
        sno: 2,
      },
      {
        ADD1: "123",
        ADD2: "456",
        ADD3: "789",
        ADD4: "1",
        APP_USERID: "madhubabu",
        AREA: "NELLORE",
        CARDNO: "1",
        MONTH: "2025-10-28",
        PSTATUS: false,
        RECDATE: null,
        RECNO: null,
        SCHEMEAMOUNT: 1000,
        SCHEMEDURATION: 10,
        SCHEMEENDDATE: "1900-01-01T00:00:00",
        SCHEMEGROUP: "1000 SCHEME",
        SCHEMEJOINDATE: "2025-10-28T07:11:55.247",
        SCHEMEMEMBER: "TIMESRA",
        SCHEMENAME: "1000 SCHEME",
        SCHEMETYPE: "LAKSHMI KATAKSHAM GOLD SCHEME",
        sno: 2,
      },
      {
        ADD1: "123",
        ADD2: "456",
        ADD3: "789",
        ADD4: "1",
        APP_USERID: "madhubabu",
        AREA: "NELLORE",
        CARDNO: "1",
        MONTH: "2025-11-28",
        PSTATUS: false,
        RECDATE: null,
        RECNO: null,
        SCHEMEAMOUNT: 1000,
        SCHEMEDURATION: 10,
        SCHEMEENDDATE: "1900-01-01T00:00:00",
        SCHEMEGROUP: "1000 SCHEME",
        SCHEMEJOINDATE: "2025-10-28T07:11:55.247",
        SCHEMEMEMBER: "TIMESRA",
        SCHEMENAME: "1000 SCHEME",
        SCHEMETYPE: "LAKSHMI KATAKSHAM GOLD SCHEME",
        sno: 2,
      },
    ];
    const data = pastData || [];
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const normalizeDate = (date: Date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const todayNormalized = normalizeDate(today);
    const next30DaysNormalized = normalizeDate(next30Days);

    const filteredData = data.filter((item: any) => {
      if (!item.MONTH) return false;

      const itemDate = new Date(item.MONTH);
      const itemNormalized = normalizeDate(itemDate);

      return itemNormalized <= next30DaysNormalized;
    });

    setSchemeDetData((prev) => [...prev, ...filteredData]);
  };
  const schemeMemberDet = async (card: number) => {
    try {
      const userName = await AsyncStorage.getItem("userName");
      const storedTenant = await AsyncStorage.getItem("tenantName");
      if (storedTenant) {
        const res = await axios.get(
          `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhere?tableName=MEMBER_CARD_DET&where=APP_USERID='${userName}' AND CARDNO='${card}' AND PSTATUS='false'`,
          { headers: { tenantName: storedTenant } }
        );

        const data = res.data || [];
        // const today = new Date();
        // const next30Days = new Date();
        // next30Days.setDate(today.getDate() + 30);

        // // Normalize dates (remove time zone differences)
        // const normalizeDate = (date: Date) =>
        //   new Date(date.getFullYear(), date.getMonth(), date.getDate());

        // const todayNormalized = normalizeDate(today);
        // const next30DaysNormalized = normalizeDate(next30Days);

        // const filteredData = data.filter((item: any) => {
        //   if (!item.MONTH) return false;

        //   const itemDate = new Date(item.MONTH);
        //   const itemNormalized = normalizeDate(itemDate);

        //   // Include only if date is today or within next 30 days
        //   return (
        //     itemNormalized >= todayNormalized &&
        //     itemNormalized <= next30DaysNormalized
        //   );
        // });
        const today = new Date();
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);

        // Normalize dates (remove time zone/time differences)
        const normalizeDate = (date: Date) =>
          new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const todayNormalized = normalizeDate(today);
        const next30DaysNormalized = normalizeDate(next30Days);

        const filteredData = data.filter((item: any) => {
          if (!item.MONTH) return false;

          const itemDate = new Date(item.MONTH);
          const itemNormalized = normalizeDate(itemDate);

          return itemNormalized <= next30DaysNormalized;
        });

        setSchemeDetData((prev) => [...prev, ...filteredData]);

        console.log("Filtered Data for Card:", card, filteredData);
      }
    } catch (err) {
      console.log("Error fetching MEMBER_CARD_DET:", err);
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
              await schemeMemberDet(item.CNO);
            }
          }
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    schemeMemberAPI();
    // schemeMemberDetAPI();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/splash-icon.png")}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {schemeDetData.length > 0 ? (
            <ScrollView contentContainerStyle={{ padding: 10 }}>
              {(() => {
                const today = new Date();
                const firstActiveIndex = schemeDetData.findIndex((item) => {
                  const monthDate = new Date(item.MONTH);
                  return monthDate <= today;
                });

                return schemeDetData.map((item, index) => {
                  const monthDate = new Date(item.MONTH);
                  const diffTime = monthDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  let daysText = "";
                  if (isNaN(diffDays)) {
                    daysText = "-";
                  } else if (diffDays > 0) {
                    daysText = `${diffDays} day${
                      diffDays > 1 ? "s" : ""
                    } to go`;
                  } else if (diffDays === 0) {
                    daysText = "Today";
                  } else {
                    daysText = `${Math.abs(diffDays)} day${
                      Math.abs(diffDays) > 1 ? "s" : ""
                    } ago`;
                  }

                  const isPayActive = index === firstActiveIndex;

                  return (
                    <View key={index} style={styles.schemeBox}>
                      <Text style={styles.cnoText1}>
                        CNO :{" "}
                        <Text style={styles.cnoText}>{item?.CARDNO || 0}</Text>
                      </Text>
                      <View style={styles.line} />

                      <View style={styles.row}>
                        <Text style={styles.label}>SchemeGroup</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>
                          {item?.SCHEMEGROUP || "-"}
                        </Text>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.label}>SchemeName</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>
                          {item?.SCHEMENAME || "-"}
                        </Text>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.label}>SchemeAmount</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>
                          {item?.SCHEMEAMOUNT
                            ? item.SCHEMEAMOUNT.toFixed(2)
                            : "-"}
                        </Text>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.label}>SchemeDuration</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>
                          {item?.SCHEMEDURATION || "-"}
                        </Text>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.label}>Pay Date</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>
                          {item?.MONTH
                            ? new Date(item.MONTH)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "-")
                            : "-"}
                        </Text>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.label}>Day Status</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text
                          style={[
                            styles.value,
                            { color: diffDays < 0 ? "red" : "green" },
                          ]}
                        >
                          {daysText}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={[
                          styles.payButton,
                          { backgroundColor: isPayActive ? "#28a745" : "#aaa" },
                        ]}
                        disabled={!isPayActive}
                        onPress={() => {
                          if (isPayActive) {
                            console.log(
                              "Proceed to pay for card:",
                              item.CARDNO
                            );
                          }
                        }}
                      >
                        <Text style={styles.payButtonText}>
                          {isPayActive ? "Pay Now" : "Not Yet Due"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                });
              })()}
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

export default PayEma;

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
  payButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
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
