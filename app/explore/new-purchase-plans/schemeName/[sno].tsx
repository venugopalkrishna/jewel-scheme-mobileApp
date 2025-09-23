import { CREATE_JEWEL } from "@/api";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

const SchemeName = () => {
  const [schemeName, setSchemeName] = useState<any>([]);
  const router = useRouter();
  const params = useLocalSearchParams();
  const tenantName = localStorage.getItem("tenantName");

  console.log(params, "params");

  useEffect(() => {
    axios
      .get(
        `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhereandOrder?tableName=SCHEME_NAME&where=SCHEMETYPE='${
          params?.SchemeType ? params?.SchemeType : ""
        }'&order=SCHEME_SERIALNO`,
        { headers: { tenantName: tenantName } }
      )
      .then((res) => {
        setSchemeName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <ScrollView>
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

      {schemeName?.map((item: any, index: any) => (
        <React.Fragment key={index}>
          <Card style={{ backgroundColor: "#edf8f4ff", margin: 10 }}>
            {/* Subtitle Section */}
            <View
              style={{
                // marginVertical: 6,
                flexDirection: "row",
                justifyContent: "space-between",
                // marginHorizontal: 4,
                backgroundColor: "#5ec4a2ff",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                paddingVertical: 4,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  // backgroundColor: "#F3C623",
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 8,
                  textAlign: "center",
                  overflow: "hidden",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
                {"."}
                {item?.SchemeName}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  paddingHorizontal: 10,

                  textAlign: "right",
                  overflow: "hidden",
                }}
              >
                {item?.SchemeMode}
              </Text>
            </View>

            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginVertical: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    borderColor: "#27548A",
                    borderWidth: 2,
                    // padding: 6,
                    width: 100,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                      textAlign: "center",
                      borderBottomWidth: 2,
                      borderColor: "#27548A",
                      backgroundColor: "#000",
                    }}
                  >
                    Amount
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 18,
                      paddingTop: 6,
                    }}
                  >
                    {item?.SchemeAmount}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    width: 100,
                    borderColor: "#27548A",
                    borderWidth: 2,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      borderBottomWidth: 2,
                      borderColor: "#27548A",
                      fontWeight: "bold",
                      backgroundColor: "#000",
                      color: "#fff",
                    }}
                  >
                    Duration
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      borderBottomWidth: 2,
                      borderColor: "#27548A",
                      fontWeight: "bold",
                    }}
                  >
                    {item?.SchemeDuration}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: "#27548A",
                    }}
                  >
                    months
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  // marginVertical:4 ,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: "#d9f4ebff",
                    padding: 6,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "#27548A", fontWeight: "bold" }}>
                    Total Value :{" "}
                  </Text>
                  <Text style={{ color: "#27548A", fontWeight: "bold" }}>
                    {item?.SchemeValue}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: "#d9f4ebff",
                    padding: 6,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "#27548A", fontWeight: "bold" }}>
                    Bonus Value :{" "}
                  </Text>
                  <Text style={{ color: "#27548A", fontWeight: "bold" }}>
                    {item?.BonusAmount}
                  </Text>
                </View>
              </View>

              {/* Button */}
              <Pressable
                style={{
                  backgroundColor: "#154D71",
                  alignSelf: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 6,
                }}
                onPress={() => {
                  router.push({
                    pathname: `/explore/new-purchase-plans/join-purchase-plan`,
                    params: { ...item },
                  });
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "bold",

                    width: 80,
                  }}
                >
                  Join
                </Text>
              </Pressable>
            </Card.Content>
          </Card>
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

export default SchemeName;

const styles = StyleSheet.create({
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
