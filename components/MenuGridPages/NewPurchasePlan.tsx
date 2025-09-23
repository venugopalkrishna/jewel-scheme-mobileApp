import { CREATE_JEWEL } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const NewPlans = () => {
  const router = useRouter();
  const [schemeNames, setSchemeName] = useState();
  const [shchemeType, setSchemeTypes] = useState();

  useEffect(() => {
    const fetchTenantAndData = async () => {
      try {
        // ✅ Get tenantName from AsyncStorage
        const storedTenant = await AsyncStorage.getItem("tenantName");

        // ✅ Only make API call if tenantName exists
        if (storedTenant) {
          const res = await axios.get(
            `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableName?tableName=SCHEME_TYPE`,
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
  //       `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableName?tableName=SCHEME_TYPE`,
  //       { headers: { tenantName: tenantName } }
  //     )
  //     .then((res: any) => {
  //       setSchemeName(res.data);
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/splash-icon.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View>
        <Text>Vamsi</Text>
      </View>
    </ImageBackground>
  );
};

export default NewPlans;

const styles = StyleSheet.create({ container: { flex: 1 } });
