import { CREATE_JEWEL } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import CashfreePG from "react-native-cashfree-pg-sdk";
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from "cashfree-pg-api-contract";
import { CFPaymentGatewayService } from "react-native-cashfree-pg-sdk";
import { ScrollView } from "react-native-gesture-handler";
import { Card, List, RadioButton } from "react-native-paper";

const JoinPurchasePlan = () => {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);
  const params = useLocalSearchParams();
  const [cardNo, setCardNo] = useState<any>();
  const [receiptNo, setReceiptNo] = useState<any>();
  const [profileData, setProfileData] = useState<any>();

  const handlePress = () => setExpanded(!expanded);

  const addCardNo = async () => {
    const storedTenant = await AsyncStorage.getItem("tenantName");
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Scheme/GetSchemeMaxNumberInTable?tableName=SCHEME_MEMBER&column=CNO`,
        { headers: { tenantName: storedTenant } }
      );
      const data: number = response?.data[0]?.Column1 || 0;
      setCardNo(data);
      return data; // return value for immediate use
    } catch (err) {
      console.log(err);
      return 0;
    }
  };

  const addRecieptNo = async () => {
    const storedTenant = await AsyncStorage.getItem("tenantName");
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Scheme/GetSchemeMaxNumberInTable?tableName=RECEIPT_MAST&column=RECNO`,
        { headers: { tenantName: storedTenant } }
      );
      const data: number = response?.data[0]?.Column1 || 0;
      setReceiptNo(data);
      return data;
    } catch (err) {
      console.log(err);
      return 0;
    }
  };

  const getProfile = async () => {
    const storedTenant = await AsyncStorage.getItem("tenantName");
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhere?tableName=SCHEME_MEMBER_PROFILE&where=MOBILENO%3D%27999%27`,
        {
          headers: {
            tenantName: storedTenant,
          },
        }
      );
      const data: any = response?.data[0];
      setProfileData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const addRecieptMast = async (card: number, receipt: number) => {
    const userName = await AsyncStorage.getItem("userName");
    const payload = {
      recNo: receipt + 1,
      recDate: new Date().toISOString(),
      rectime: new Date().toISOString(),
      empCode: "string",
      schemeGroup: params?.SchemeGroup || "string",
      schemeName: params?.SchemeName || "string",
      goldRate: 0,
      cardNo: String(card + 1), // ✅ Convert to string
      phno: profileData?.MOBILENO || "string",
      schemeMember: profileData?.SchemeMember || "string",
      add1: profileData?.add1 || "string",
      add2: profileData?.add2 || "string",
      add3: profileData?.add3 || "string",
      schemeAmount: params?.SchemeAmount || 0,
      schemeDuration: params?.SchemeDuration || 0,
      bonusAmount: params?.BonusAmount || 0,
      amount: params?.SchemeAmount || 0,
      recAmount: params?.SchemeAmount || 0,
      goldWt: 0,
      schemeValue: params?.SchemeValue || 0,
      schemeJDate: params?.SchemeJoinDate || new Date().toISOString(),
      schemeENDDate: params?.SchemeEndDate || new Date().toISOString(),
      incharger: "App",
      narr: "-",
      uname: profileData?.SchemeMember || "string",
      schemeType: params?.SchemeType || "string",
      fyear: "25-26",
      instno: 1,
      pregoldwt: 0,
      cash: params?.SchemeAmount || 0,
      card: 0,
      upi: 0,
      online: 0,
      cheque: 0,
      area: profileData?.area || "",
      clouD_UPLOAD: true,

      // Optional fields
      mode: "CASH",
      accno: "string",
      chequeno: "string",
      schemeMode: "string",
      sbMonths: 0,
      giftVoucher: 0,
      collect_Point: "string",
      paymode: "string",
      modetype: "string",
      accname: "string",
      apP_USERID: userName,
    };
    const storedTenant = await AsyncStorage.getItem("tenantName");
    try {
      const response = await axios.post(
        `${CREATE_JEWEL}/api/Master/ReceiptMastInsert`,
        payload,
        {
          headers: {
            tenantName: storedTenant,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addRecieptPayment = async (card: number, receipt: number) => {
    const userName = await AsyncStorage.getItem("userName");
    const tablePayloads = [
      // tableData.map((record, index) => (
      {
        recno: receipt + 1,
        recdate: new Date().toISOString(),
        scmgroup: params?.SchemeGroup || "string",
        scmname: params?.SchemeName || "string",
        scmmember: profileData?.SchemeMember || "string",
        cardno: String(card + 1),
        sno: 1,
        paymode: "CASH",
        accno: "1234",
        descr: "string",
        particulars: "string",
        amt: Number(params?.SchemeAmount) || 0,
        recamt: Number(params?.SchemeAmount),
        fyear: "25-26",
        clouD_UPLOAD: true,
        apP_USERID: userName,
      },
    ];
    // ));
    const storedTenant = await AsyncStorage.getItem("tenantName");
    try {
      const response = await axios.post(
        `${CREATE_JEWEL}/api/Master/ReceiptPaymentInsert`,
        tablePayloads,
        {
          headers: {
            tenantName: storedTenant,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const addMemberDetails = async (card: number, receipt: number) => {
    const userName = await AsyncStorage.getItem("userName");
    const memberCardPayload = {
      sno: 1, // Use installmentNo as sno
      recno: receipt + 1,
      recdate: new Date().toISOString(),
      pstatus: true,
      cardno: String(card + 1),
      month: "string", // Use SchemeJoinDate for month
      schemetype: params?.SchemeType || "string",
      schemegroup: params?.SchemeGroup || "string",
      schemename: params?.SchemeName || "string",
      schememember: profileData?.SchemeMember || "string",
      adD1: profileData?.add1 || "string",
      adD2: profileData?.add2 || "string",
      adD3: profileData?.add3 || "string",
      adD4: profileData?.add4 || "string",
      area: profileData?.area || "string",
      schemeamount: params?.SchemeAmount || 0,
      schemeduration: params?.SchemeDuration || 0,
      schemejoindate: params?.SchemeJoinDate || new Date().toISOString(),
      schemeenddate: params?.SchemeEndDate || new Date().toISOString(),
      apP_USERID: userName,
      bonusMonth: 0,
    };
    const storedTenant = await AsyncStorage.getItem("tenantName");
    try {
      const response = await axios.post(
        `${CREATE_JEWEL}/api/Scheme/MemberCardDetailsInsert`,
        memberCardPayload,
        {
          headers: {
            tenantName: storedTenant,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addMember = async (card: number, receipt: number) => {
    const userName = await AsyncStorage.getItem("userName");
    const payload = {
      schemeGroup: params?.SchemeGroup || "string",
      schemeName: params?.SchemeName || "string",
      schemeMember: profileData?.SchemeMember || "string",
      add1: profileData?.add1 || "string",
      add2: profileData?.add2 || "string",
      add3: profileData?.add3 || "string",
      add4: profileData?.add4 || "string",
      area: profileData?.area || "string",
      pincode: profileData?.pincode || "string",
      email: profileData?.email || "string",
      phone: profileData?.phone || "string",
      cardNo: String(card + 1) || "string",
      schemeAmount: params?.SchemeAmount || 0,
      schemeDuration: params?.SchemeDuration || 0,
      bonusAmount: params?.BonusAmount || 0,
      schemeValue: params?.SchemeValue || 0,
      recentPaidDate: new Date().toISOString(),
      schemeEnding: false,
      schemeDropping: false,
      dropping_Cause: "string",
      schemeBDAmt: 0,
      schemeMode: "CASH",
      bonusMonth: 0,
      giftVoucher: 0,
      schemeType: params?.SchemeType || "string",
      gender: profileData?.gender || "string",
      state: profileData?.state || "string",
      district: profileData?.district || "string",
      mobile1: profileData?.MOBILENO || "string",
      mobile2: profileData?.mobile2 || "string",
      fax: profileData?.fax || "string",
      dob: profileData?.dob || new Date().toISOString(),
      annversary: profileData?.annversary || new Date().toISOString(),
      schemeJoinDate: params?.SchemeJoinDate || new Date().toISOString(),
      webSite: profileData?.webSite || "string",
      entryDate: new Date().toISOString(),
      entryTime: new Date().toISOString(),
      uName: profileData?.SchemeMember || "string",
      schemeEndDate: params?.SchemeEndDate || new Date().toISOString(),
      billNo: 0,
      billDate: new Date().toISOString(),
      jewelType: "string",
      saleCode: "string",
      giftVocher_Status: false,
      giftVocher_BillNo: 0,
      giftVocher_BillDate: new Date().toISOString(),
      giftVocher_JewelType: "string",
      giftVocher_SaleCode: 0,
      nominee: profileData?.nominee || "string",
      nmobileno: profileData?.nmobileno || "string",
      empname: "App",
      commamt: 0,
      recno: receipt + 1 || 0,
      recdate: new Date().toISOString(),
      recamt: params?.SchemeAmount || 0,
      collecT_POINT: "string",
      incharge: "string",
      schemecompletion: false,
      duemonths: 0,
      cno: Number(card + 1) || 0,
      cloud_upload: true,
      installno: 0, // ✅ newly added
      statecode: profileData?.statecode || "string",
      station: profileData?.station || "string",
      apP_USERID: userName || "string",
    };
    try {
      const storedTenant = await AsyncStorage.getItem("tenantName");
      const response = await axios.post(
        `${CREATE_JEWEL}/api/Scheme/SchemeMemberInsert`,
        payload,
        {
          headers: {
            tenantName: storedTenant,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const theme = new CFThemeBuilder()
    .setNavigationBarBackgroundColor("#FF4B2B")
    .setNavigationBarTextColor("#FFFFFF")
    .setButtonBackgroundColor("#FFC107")
    .setButtonTextColor("#FFFFFF")
    .setPrimaryTextColor("#212121")
    .setSecondaryTextColor("#757575")
    .build();

  // const handlePaymentCallbacks = useCallback(() => {
  //   CFPaymentGatewayService.setCallback({
  //     onVerify(orderID) {
  //       Alert.alert("Payment Success", `Oreder ID: ${orderID}`);
  //     },
  //     onError(error, orderID) {
  //       Alert.alert(
  //         "Payment Failed",
  //         `Error: ${JSON.stringify(error)}\nOrder ID: ${orderID}`
  //       );
  //     },
  //   });
  //   return () => {
  //     CFPaymentGatewayService.removeCallback();
  //   };
  // }, []);
  console.log(params, "params");

  const handlePaymentCallbacks = useCallback(() => {
    CFPaymentGatewayService.setCallback({
      async onVerify(orderID) {
        try {
          // Alert.alert("Payment Success", `Order ID: ${orderID}`);

          // Alert.alert(
          //   "Success",
          //   "All payment-related data saved successfully."
          // );
          router.push("/");
        } catch (error) {
          // console.error("Error in payment callback:", error);
          // Alert.alert(
          //   "Error",
          //   "Something went wrong while saving payment data."
          // );
          // const cleanUrl = window.location.origin + "/";
          // window.history.replaceState({}, document.title, cleanUrl);
          router.push("/");
        }
      },

      onError(error, orderID) {
        // console.error("Payment Error:", error);
        // Alert.alert(
        //   "Payment Failed",
        //   `Error: ${JSON.stringify(error)}\nOrder ID: ${orderID}`
        // );
      },
    });

    // cleanup function on unmount
    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  }, []);

  const startPayment = async (data: any) => {
    try {
      const session = new CFSession(
        data?.paymentSessionId,
        data?.orderId,
        CFEnvironment.SANDBOX
      );

      const components = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAYPAL)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.EMI)
        .add(CFPaymentModes.PAY_LATER)
        .build();

      const dropCheckoutPayment = new CFDropCheckoutPayment(
        session,
        components,
        theme
      );
      CFPaymentGatewayService.doPayment(dropCheckoutPayment);
    } catch (error: any) {
      console.error("Payment initiation error:", error.message);
      Alert.alert("Error", error.message || "Failed to initiate payment.");
    }
  };

  useEffect(() => {
    handlePaymentCallbacks();
  }, [handlePaymentCallbacks]);

  const cashfreePaymentAPI = async (card: number) => {
    const userName = await AsyncStorage.getItem("userName");
    const payBody = {
      customerName: "Test",
      email: "test@gmail.com",
      phone: "9999999999",
      amountRupees: 1,
      // clientId: "TEST10804152ea8f550b36566eb77f3425140801",
      // clientSecret: "cfsk_ma_test_7114389112ead3344231939c07f5efc9_aac301b4",
      userId: userName,
      cardNo: String(card + 1),
      schemeGroup: params?.SchemeGroup,
      schemeName: params?.SchemeName,
      installmentno: "1",
    };
    try {
      const storedTenant = await AsyncStorage.getItem("tenantName");
      const response = await axios.post(
        `${CREATE_JEWEL}/api/PaymentProcess/PaymentProcess`,
        payBody,
        {
          headers: {
            tenantName: storedTenant,
          },
        }
      );
      const data = response.data;
      if (data) {
        startPayment(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateApi = async () => {
    try {
      const card = await addCardNo();
      const receipt = await addRecieptNo();

      await addRecieptMast(card, receipt);
      await addMemberDetails(card, receipt);
      await addRecieptPayment(card, receipt);
      await addMember(card, receipt);
      await cashfreePaymentAPI(card);
    } catch (err) {
      console.log("Error in processing:", err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../../assets/images/splash-icon.png")}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ textAlign: "center", marginTop: 10, fontWeight: 300 }}>
            SWARNATHARA GOLD AMOUNT PURCHASE PLAN
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "#496ba3ff",
              marginTop: 25,
              marginBottom: 0,
            }}
          >
            if you want to join new purhcase plan proceed
          </Text>
          {/* <Card
            style={{ backgroundColor: "#c9c7c4", margin: 20, borderRadius: 3 }}
          >
            <View
              style={
                {
                  // alignItems: "center",
                }
              }
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 15,
                }}
              >
                {params?.SchemeGroup}
              </Text>
            </View>
            <View style={{ flexDirection: "row", margin: 5, marginLeft: 25 }}>
              <Text style={{ width: 130, fontSize: 13 }}>Duration</Text>
              <Text style={{ fontSize: 13 }}>
                {params?.SchemeDuration} months
              </Text>
            </View>
            <View style={{ flexDirection: "row", margin: 5, marginLeft: 25 }}>
              <Text style={{ width: 130, fontSize: 13 }}>Monthly Advance</Text>
              <Text style={{ fontSize: 13 }}>₹{params?.SchemeAmount}</Text>
            </View>
            <View style={{ flexDirection: "row", margin: 5, marginLeft: 25 }}>
              <Text style={{ width: 130, fontSize: 13 }}>Total Payable</Text>
              <Text style={{ fontSize: 13 }}>₹{params?.SchemeValue}</Text>
            </View>
            <View style={{ flexDirection: "row", margin: 5, marginLeft: 25 }}>
              <Text style={{ width: 130, fontSize: 13 }}>First Advance</Text>
              <Text style={{ fontSize: 13 }}>₹{params?.SchemeAmount}</Text>
            </View>

            <Card.Content>
              <List.Accordion
                style={{
                  backgroundColor: "#c9c7c4",
                  marginVertical: 0,
                }}
                title="Terms and Conditions"
                titleStyle={{ fontSize: 12, color: "black" }}
                //   left={(props) => <List.Icon {...props} icon="folder" />}
                expanded={expanded}
                onPress={handlePress}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginHorizontal: 15,
                    marginBottom: 5,
                  }}
                >
                  Swarnadhara Small Savings Scheme
                </Text>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 12,
                    textAlign: "justify",
                    // marginRight: 15,
                    marginBottom: 5,
                  }}
                >
                  Moreover, the Swarnadhara Small Savings Scheme is unique like
                  no other scheme. It offers discounts at the end of the scheme,
                  and many other benefits. We have listed other benefits below.
                  We have also answered your basic questions about the
                  Swarnadhara scheme. Besides, Swarnadhara Small Savings Scheme
                  is unique like any other scheme. It offers a discount at the
                  end of the scheme, and many other benefits. We have listed
                  other benefits below. We have also answered your basic
                  questions about Swarnadhara Scheme.
                </Text>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 12,
                    textAlign: "justify",
                    marginBottom: 5,
                  }}
                >
                  Join Swarnadhara Scheme today. Let the good times begin.
                </Text>
                <Text
                  style={{
                    marginLeft: 15,
                    // fontSize: 12,
                    textAlign: "justify",
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  Benefits
                </Text>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 12,
                    textAlign: "justify",
                    marginBottom: 5,
                  }}
                >
                  Discount on the purchase price of one month's installment of
                  the small savings scheme
                </Text>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 12,
                    textAlign: "justify",
                    marginBottom: 5,
                    // marginHorizontal: 15,
                  }}
                >
                  You can continue with the scheme even if you fail to pay the
                  installment. However, the scheme's maturity period will be
                  delayed accordingly.
                </Text>
              </List.Accordion>
              <View
                style={{
                  flexDirection: "row",
                  //   marginHorizontal: 25,
                  marginTop: 3,
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value="first"
                  // status={checked === "first" ? "checked" : "unchecked"}
                  // onPress={() => setChecked("first")}
                />
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  I agree with Terms and Conditions
                </Text>
              </View>

              <Pressable
                style={{
                  backgroundColor: "#154D71",
                  //   alignSelf: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  //   borderRadius: 6,
                  width: 250,
                  marginLeft: 25,
                  marginTop: 10,
                }}
                onPress={() => {
                  // addCardNo();
                  // addRecieptNo();
                  // setTimeout(() => {
                  //   addRecieptMast();
                  //   addMemberDetails();
                  //   addRecieptPayment();
                  // }, 5000);
                  handleCreateApi();
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "bold",

                    // width: 150,
                  }}
                >
                  Pay
                </Text>
              </Pressable>
            </Card.Content>
          </Card> */}
          <Card style={styles.schemeCard}>
            <View style={styles.schemeHeader}>
              <Text style={styles.schemeTitle}>{params?.SchemeGroup}</Text>
            </View>

            <View style={styles.schemeRow}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{params?.SchemeDuration} months</Text>
            </View>

            <View style={styles.schemeRow}>
              <Text style={styles.label}>Monthly Advance</Text>
              <Text style={styles.value}>₹{params?.SchemeAmount}</Text>
            </View>

            <View style={styles.schemeRow}>
              <Text style={styles.label}>Scheme Value</Text>
              <Text style={styles.value}>₹{params?.SchemeValue}</Text>
            </View>

            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <Text style={styles.firstAdvance}>
                <Text style={{ color: "#2e7d32", fontWeight: "600" }}>
                  First{" "}
                </Text>
                <Text style={{ color: "#3f51b5", fontWeight: "600" }}>
                  Advance ₹{params?.SchemeAmount}
                </Text>
              </Text>
            </View>

            <List.Accordion
              style={styles.accordion}
              title="Terms and Conditions ▾"
              titleStyle={styles.accordionTitle}
              expanded={expanded}
              onPress={handlePress}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginHorizontal: 15,
                  marginBottom: 5,
                }}
              >
                Swarnadhara Small Savings Scheme
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 12,
                  textAlign: "justify",
                  // marginRight: 15,
                  marginBottom: 5,
                }}
              >
                Moreover, the Swarnadhara Small Savings Scheme is unique like no
                other scheme. It offers discounts at the end of the scheme, and
                many other benefits. We have listed other benefits below. We
                have also answered your basic questions about the Swarnadhara
                scheme. Besides, Swarnadhara Small Savings Scheme is unique like
                any other scheme. It offers a discount at the end of the scheme,
                and many other benefits. We have listed other benefits below. We
                have also answered your basic questions about Swarnadhara
                Scheme.
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 12,
                  textAlign: "justify",
                  marginBottom: 5,
                }}
              >
                Join Swarnadhara Scheme today. Let the good times begin.
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  // fontSize: 12,
                  textAlign: "justify",
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                Benefits
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 12,
                  textAlign: "justify",
                  marginBottom: 5,
                }}
              >
                Discount on the purchase price of one month's installment of the
                small savings scheme
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 12,
                  textAlign: "justify",
                  marginBottom: 5,
                  // marginHorizontal: 15,
                }}
              >
                You can continue with the scheme even if you fail to pay the
                installment. However, the scheme's maturity period will be
                delayed accordingly.
              </Text>
            </List.Accordion>

            <View style={styles.agreeRow}>
              <RadioButton value="first" />
              <Text style={styles.agreeText}>
                I agree with Terms and Conditions
              </Text>
            </View>

            <Pressable style={styles.payButton} onPress={handleCreateApi}>
              <Text style={styles.payText}>Pay</Text>
            </Pressable>
          </Card>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Timesera 2025 ( V-1.0.5 )</Text>
          <Image
            source={require("../../../assets/images/icon.png")} // replace with your logo
            style={styles.footerLogo}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default JoinPurchasePlan;

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  schemeCard: {
    backgroundColor: "#d9d7d3",
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginTop: 5,
  },

  schemeHeader: {
    alignItems: "center",
    marginBottom: 6,
  },

  schemeTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginTop: 5,
  },

  schemeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginVertical: 4,
  },

  label: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },

  value: {
    fontSize: 14,
    color: "#000",
    fontWeight: "400",
  },

  firstAdvance: {
    fontSize: 16,
    textAlign: "center",
  },

  accordion: {
    backgroundColor: "#d9d7d3",
    // marginVertical: 5,
  },

  accordionTitle: {
    fontSize: 13,
    color: "#777",
    fontWeight: "500",
    textAlign: "center",
  },

  termsText: {
    fontSize: 12,
    color: "#555",
    textAlign: "justify",
    marginHorizontal: 15,
    marginBottom: 8,
  },

  agreeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },

  agreeText: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
  },

  payButton: {
    backgroundColor: "#0c4461",
    borderRadius: 8,
    alignSelf: "center",
    paddingVertical: 10,
    width: "85%",
    marginTop: 10,
    marginBottom: 5,
  },

  payText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
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
