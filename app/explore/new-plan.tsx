import { CREATE_JEWEL } from "@/api";
import GradientText from "@/utilities/LinearGradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const NewPlans = () => {
  const router = useRouter();
  const [schemeTypeData, setSchemeData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTenantAndData = async () => {
      try {
        const storedTenant = await AsyncStorage.getItem("tenantName");
        if (storedTenant) {
          const res = await axios.get(
            `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithOrder?tableName=SCHEME_TYPE&order=SNO`,
            { headers: { tenantName: storedTenant } }
          );
          setSchemeData(res.data || []);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchTenantAndData();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/splash-icon.png")}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ padding: 10 }}>
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
      </ScrollView>
    </ImageBackground>
  );
};

export default NewPlans;

const styles = StyleSheet.create({
  container: { flex: 1 },

  card: {
    backgroundColor: "#154D71",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },

  cardTitle: {
    fontSize: 16,
    fontFamily: "serif",
    marginBottom: 4,
  },

  cardSubtitle: {
    color: "#fff",
    fontSize: 14,
  },
});
