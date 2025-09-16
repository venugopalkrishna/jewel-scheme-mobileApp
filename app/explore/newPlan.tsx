import { CREATE_JEWEL } from "@/api";
import GradientText from "@/utilities/LinearGradient";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";

const NewPlans = () => {
  const router = useRouter();
  const [schemeName, setSchemeName] = useState([]);
  const [schemeTypeData, setSchemeData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithOrder?tableName=SCHEME_TYPE&order=SNO`,
        { headers: { tenantName: "9xtigYG3LOE79Wvow3ymTg==" } }
      )
      .then((res) => {
        setSchemeData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/splash-icon.png")}
      style={styles.container}
    >
      <View>
        {schemeTypeData?.map((item: any, index: any) => (
          <React.Fragment key={index}>
            <Card
              style={{
                backgroundColor: "#154D71",
                margin: 10,
                paddingVertical: 30,
              }}
              onPress={() => {
                router.push({
                  pathname:
                    `/explore/new-purchase-plans/schemeName/[sno]` as any,
                  params: { ...item },
                });
              }}
            >
              <Card.Title
                title={
                  <GradientText
                    text={item?.SchemeType}
                    style={{ fontSize: 14, fontFamily: "serif" }}
                  />
                }
                subtitle={item?.SchemeMode}
                subtitleStyle={{ color: "#fff" }}
              />
            </Card>
          </React.Fragment>
        ))}
      </View>
    </ImageBackground>
  );
};

export default NewPlans;

const styles = StyleSheet.create({
  container: { flex: 1 },

  button: {
    width: "20%",
    padding: 8,
    backgroundColor: "#154D71",
    borderRadius: 8,
    alignSelf: "flex-start", // centers horizontally
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

NewPlans.options = {
  headerShown: true, // must override parent
  title: "New Plans",
  headerStyle: { backgroundColor: "#154D71" },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
  headerTitleAlign: "center",
};
