import { CREATE_JEWEL } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card } from "react-native-paper";

const SchemeName = () => {
  const [schemeName, setSchemeName] = useState<any>([]);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchTenantAndData = async () => {
      try {
        // ✅ Get tenantName from AsyncStorage
        const storedTenant = await AsyncStorage.getItem("tenantName");

        // ✅ Only make API call if tenantName exists
        if (storedTenant) {
          const res = await axios.get(
            `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhereandOrder?tableName=SCHEME_NAME&where=SCHEMETYPE='${
              params?.SchemeType ? params?.SchemeType : ""
            }'&order=SCHEME_SERIALNO`,
            { headers: { tenantName: storedTenant } }
          );
          setSchemeName(res.data);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchTenantAndData();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhereandOrder?tableName=SCHEME_NAME&where=SCHEMETYPE='${
  //         params?.SchemeType ? params?.SchemeType : ""
  //       }'&order=SCHEME_SERIALNO`,
  //       { headers: { tenantName: tenantName } }
  //     )
  //     .then((res) => {
  //       setSchemeName(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../../../assets/images/splash-icon.png")}
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
            {schemeName?.[0]?.SchemeType ?? ""}
          </Text>
          {schemeName.length > 0 ? (
            <ScrollView contentContainerStyle={{ padding: 10 }}>
              {schemeName?.map((item: any, index: any) => (
                <Card key={index} style={styles.card}>
                  {/* Header */}
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderLeft}>
                      {index + 1}. {item?.SchemeName}
                    </Text>
                    <Text style={styles.cardHeaderRight}>
                      {item?.SchemeMode}
                    </Text>
                  </View>

                  {/* Body */}
                  <View style={styles.cardBody}>
                    {[
                      { label: "Amount", value: `₹${item?.SchemeAmount}` },
                      { label: "Scheme Value", value: `₹${item?.SchemeValue}` },
                      {
                        label: "Duration",
                        value: `${item?.SchemeDuration} months`,
                      },
                      { label: "Bonus Value", value: `₹${item?.BonusAmount}` },
                    ].map((row, i) => (
                      <View key={i} style={styles.row}>
                        <Text style={styles.label}>{row.label}</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>{row.value}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Join Button */}
                  <Pressable
                    style={styles.joinButton}
                    onPress={() =>
                      router.push({
                        pathname: `/explore/new-purchase-plans/join-purchase-plan`,
                        params: { ...item },
                      })
                    }
                  >
                    <Text style={styles.joinButtonText}>Join</Text>
                  </Pressable>
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
            source={require("../../../../assets/images/icon.png")} // replace with your logo
            style={styles.footerLogo}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SchemeName;

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
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
