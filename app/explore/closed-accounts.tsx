import { CREATE_JEWEL } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import dayjs from "dayjs";
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
import { Card } from "react-native-paper";

const ClosedAccounts = () => {
  const router = useRouter();
  const [schemeTypeData, setSchemeData] = useState<any[]>([]);
  const [closedAccounts, setClosedAccountsData] = useState<any[]>([]);
  const version = Constants?.expoConfig?.version;

  const NumberOfClosedAccounts = closedAccounts?.filter(
    (item: any, index: any) => (item = item?.SchemeEnding) === true
  );

  useEffect(() => {
    const fetchTenantAndData = async () => {
      try {
        const storedTenant = await AsyncStorage.getItem("tenantName");
        if (storedTenant) {
          const res = await axios.get(
            `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithOrder?tableName=SCHEME_TYPE&order=SNO`,
            { headers: { tenantName: storedTenant } }
          );
          // setSchemeData(res.data || []);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchTenantAndData();
  }, []);

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
          setClosedAccountsData(memberData);
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
          {NumberOfClosedAccounts.length > 0 ? (
            <ScrollView contentContainerStyle={{ padding: 10 }}>
              {NumberOfClosedAccounts
                // ?.filter((item) => item?.SchemeEnding === true)
                ?.map((item: any, index: any) => (
                  <Card style={styles.card} key={index}>
                    {/* Header */}
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderLeft}>
                        {index + 1}. {item?.SchemeGroup}
                        {/* {1}. {"1000"} */}
                      </Text>
                      {/* <Text style={styles.cardHeaderRight}>{"item?.SchemeMode"}</Text> */}
                      <Text style={styles.cardHeaderRight}>
                        {item?.SchemeName}
                      </Text>
                    </View>

                    {/* Body */}
                    <View style={styles.cardBody}>
                      {[
                        {
                          label: "Join Date",
                          value: `${dayjs(item.SchemeJoinDate)?.format(
                            "DD/MM/YYYY"
                          )}`,
                        },
                        {
                          label: "Total Dues",
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

export default ClosedAccounts;

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
    backgroundColor: "#eef5f3ff",
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
    fontSize: 13,
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
