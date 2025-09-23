import { CREATE_JEWEL } from "@/api";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const NewPlans = () => {
  const router = useRouter();
  const [schemeNames, setSchemeName] = useState();
  const [shchemeType, setSchemeTypes] = useState();
  const tenantName = localStorage.getItem("tenantName");

  useEffect(() => {
    axios
      .get(
        `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableName?tableName=SCHEME_TYPE`,
        { headers: { tenantName: tenantName } }
      )
      .then((res: any) => {
        setSchemeName(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

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
