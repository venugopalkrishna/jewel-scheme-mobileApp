// import { CREATE_JEWEL } from "@/api";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   Image,
//   ImageBackground,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// const MyPlans = () => {
//   const router = useRouter();
//   const [schemeMemberData, setSchemeMemberData] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchTenantAndData = async () => {
//       try {
//         const userName = await AsyncStorage.getItem("userName");
//         const storedTenant = await AsyncStorage.getItem("tenantName");
//         if (storedTenant) {
//           const res = await axios.get(
//             `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhereandOrder?tableName=SCHEME_MEMBER&where=APP_USERID='${userName}'&order=CNO`,
//             { headers: { tenantName: storedTenant } }
//           );
//           setSchemeMemberData(res.data || []);
//         }
//       } catch (err) {
//         console.log("Error fetching data:", err);
//       }
//     };
//     fetchTenantAndData();
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ImageBackground
//         source={require("../../assets/images/splash-icon.png")}
//         style={styles.container}
//       >
//         {/* <ScrollView contentContainerStyle={{ padding: 10 }}>
//         {Array.isArray(schemeTypeData) &&
//           schemeTypeData.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.card}
//               onPress={() => {
//                 router.push({
//                   pathname:
//                     `/explore/new-purchase-plans/schemeName/[sno]` as any,
//                   params: { ...item },
//                 });
//               }}
//             >
//               <GradientText text={item?.SchemeType} style={styles.cardTitle} />
//               <Text style={styles.cardSubtitle}>{item?.SchemeMode}</Text>
//             </TouchableOpacity>
//           ))}
//       </ScrollView> */}
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {schemeMemberData.length > 0 ? (
//             <ScrollView contentContainerStyle={{ padding: 10 }}>
//               {schemeMemberData.map((item, index) => (
//                 <View key={index} style={styles.schemeBox}>
//                   <Text style={styles.cnoText1}>
//                     CNO : <Text style={styles.cnoText}>{item?.CNO || 0}</Text>
//                   </Text>
//                   <View style={styles.line} />

//                   <View style={styles.row}>
//                     <Text style={styles.label}>SchemeGroup</Text>
//                     <Text style={styles.colon}>:</Text>
//                     <Text style={styles.value}>{item?.SchemeGroup || "-"}</Text>
//                   </View>

//                   <View style={styles.row}>
//                     <Text style={styles.label}>SchemeName</Text>
//                     <Text style={styles.colon}>:</Text>
//                     <Text style={styles.value}>{item?.SchemeName || "-"}</Text>
//                   </View>

//                   <View style={styles.row}>
//                     <Text style={styles.label}>SchemeAmount</Text>
//                     <Text style={styles.colon}>:</Text>
//                     <Text style={styles.value}>
//                       {item?.SchemeAmount ? item.SchemeAmount.toFixed(2) : "-"}
//                     </Text>
//                   </View>

//                   <View style={styles.row}>
//                     <Text style={styles.label}>SchemeDuration</Text>
//                     <Text style={styles.colon}>:</Text>
//                     <Text style={styles.value}>
//                       {item?.SchemeDuration || "-"}
//                     </Text>
//                   </View>

//                   <View style={styles.row}>
//                     <Text style={styles.label}>SchemeJoinDate</Text>
//                     <Text style={styles.colon}>:</Text>
//                     <Text style={styles.value}>
//                       {item?.SchemeJoinDate
//                         ? new Date(item.SchemeJoinDate)
//                             .toLocaleDateString("en-GB")
//                             .replace(/\//g, "-")
//                         : "-"}
//                     </Text>
//                   </View>
//                 </View>
//               ))}
//             </ScrollView>
//           ) : (
//             <View style={styles.noDataContainer}>
//               <Text style={styles.noDataText}>No Data Available</Text>
//             </View>
//           )}
//         </ScrollView>
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>© Timesera 2025 ( V-1.0.5 )</Text>
//           <Image
//             source={require("../../assets/images/icon.png")} // replace with your logo
//             style={styles.footerLogo}
//             resizeMode="contain"
//           />
//         </View>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// export default MyPlans;

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   safeArea: {
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: 80, // ensures scroll area above footer
//   },

//   // card: {
//   //   backgroundColor: "#154D71",
//   //   borderRadius: 12,
//   //   paddingVertical: 25,
//   //   paddingHorizontal: 20,
//   //   marginVertical: 5,
//   //   shadowColor: "#000",
//   //   shadowOffset: { width: 0, height: 2 },
//   //   shadowOpacity: 0.25,
//   //   shadowRadius: 3.84,
//   //   elevation: 5, // Android shadow
//   // },

//   // cardTitle: {
//   //   fontSize: 16,
//   //   fontFamily: "serif",
//   //   marginBottom: 15,
//   // },

//   // cardSubtitle: {
//   //   color: "#fff",
//   //   fontSize: 14,
//   //   marginTop: 10,
//   // },
//   schemeBox: {
//     borderWidth: 2,
//     borderColor: "#000",
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 15,
//     backgroundColor: "#fff",
//   },

//   cnoText: {
//     fontWeight: "bold",
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 6,
//     // textDecorationLine: "underline",
//   },

//   cnoText1: {
//     // fontWeight: "bold",
//     fontSize: 14,
//     textAlign: "center",
//     marginBottom: 6,
//     // textDecorationLine: "underline",
//   },

//   line: {
//     borderBottomWidth: 1,
//     borderColor: "#000",
//     marginBottom: 10,
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 3,
//   },

//   label: {
//     width: 130,
//     fontSize: 15,
//     fontFamily: "serif",
//   },

//   colon: {
//     width: 10,
//     fontSize: 15,
//     fontFamily: "serif",
//   },

//   value: {
//     fontSize: 15,
//     fontFamily: "serif",
//     flexShrink: 1,
//   },
//   noDataContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: 400,
//   },
//   noDataText: {
//     fontSize: 18,
//     color: "#666",
//     fontWeight: "bold",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 30,
//     backgroundColor: "#002D6B",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//   },
//   footerText: {
//     color: "#fff",
//     fontSize: 12,
//   },
//   footerLogo: {
//     width: 18,
//     height: 18,
//     marginLeft: 6,
//   },
// });

import { CREATE_JEWEL } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
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
const MyPlans = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [schemeMemberData, setSchemeMemberData] = useState<any>([]);
  const version = Constants?.expoConfig?.version;

  const uniqueCategories = [
    ...new Map(
      schemeMemberData.map((item: any) => [item?.SchemeGroup, item]),
    ).values(),
  ];

  useEffect(() => {
    const fetchTenantAndData = async () => {
      try {
        const userName = await AsyncStorage.getItem("userName");
        const storedTenant = await AsyncStorage.getItem("tenantName");
        if (storedTenant) {
          const res = await axios.get(
            `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhereandOrder?tableName=SCHEME_MEMBER&where=APP_USERID='${userName}'&order=CNO`,
            { headers: { tenantName: storedTenant } },
          );
          setSchemeMemberData(res.data || []);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchTenantAndData();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/backgroundImage2.jpg")}
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
            {/* {schemeName?.[0]?.SchemeType ?? "My Schemes"} */}
          </Text>
          {uniqueCategories?.length > 0
            ? uniqueCategories?.map((item: any, index: number) => {
                return (
                  <Card style={styles.card} key={index}>
                    {/* Header */}
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderLeft}>
                        {index + 1}. {item?.SchemeName}
                        {/* {1}. {"1000"} */}
                      </Text>
                      {/* <Text style={styles.cardHeaderRight}>{"item?.SchemeMode"}</Text> */}
                      <Text style={styles.cardHeaderRight}>
                        {"Gold scheme"}
                      </Text>
                    </View>

                    {/* Body */}
                    <View style={styles.cardBody}>
                      {[
                        { label: "Amount", value: `₹${item?.SchemeAmount}` },
                        {
                          label: "Scheme Value",
                          value: `₹${item?.SchemeValue}`,
                        },
                        {
                          label: "Duration",
                          value: `${item?.SchemeDuration} months`,
                        },
                        {
                          label: "Bonus Value",
                          value: `₹${item?.BonusAmount}`,
                        },
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
                          pathname: `/explore/joined-schemes`,
                          params: { ...item },
                        })
                      }
                    >
                      <Text style={styles.joinButtonText}>
                        Show Joined Schemes Count
                      </Text>
                    </Pressable>
                  </Card>
                );
              })
            : ""}
        </ScrollView>
        {/* <ScrollView contentContainerStyle={{ padding: 10 }}>
          
        </ScrollView> */}
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

export default MyPlans;

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 30 },
  safeArea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    // paddingBottom: 80,
  },
  headerText: {
    color: "#154D71",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
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
