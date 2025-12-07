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
import Constants from "expo-constants";
import { CFPaymentGatewayService } from "react-native-cashfree-pg-sdk";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Card } from "react-native-paper";

const JoinPurchasePlan = () => {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);
  const params = useLocalSearchParams();
  const [cardNo, setCardNo] = useState<any>();
  const [receiptNo, setReceiptNo] = useState<any>();
  const [profileData, setProfileData] = useState<any>();
  const version = Constants?.expoConfig?.version;
  const [loading, setLoading] = useState(false);
  console.log(params, "params");

  const addCardNo = async () => {
    const storedTenant = await AsyncStorage.getItem("tenantName");
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Scheme/GetSchemeMaxNumberInTable?tableName=SCHEME_MEMBER&column=CNO`,
        { headers: { tenantName: storedTenant } }
      );
      const data: number = (await response?.data[0]?.Column1) || 0;
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
      const data: number = (await response?.data[0]?.Column1) || 0;
      setReceiptNo(data);
      return data;
    } catch (err) {
      console.log(err);
      return 0;
    }
  };

  const getProfile = async () => {
    const storedTenant = await AsyncStorage.getItem("tenantName");
    const userName = await AsyncStorage.getItem("userName");
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Tenant/GetSchemeUserDetails?userName=${userName}
`,
        {
          headers: {
            tenantName: storedTenant,
          },
        }
      );
      const data: any = await response?.data[0];
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
      empCode: "",
      schemeGroup: params?.SchemeGroup ? params?.SchemeGroup : "",
      schemeName: params?.SchemeName ? params?.SchemeName : "",
      goldRate: 0,
      cardNo: String(card + 1), // ✅ Convert to string
      phno: profileData?.MOBILENO ? profileData?.MOBILENO : "",
      schemeMember: profileData?.FULLNAME ? profileData?.FULLNAME : "",
      add1: profileData?.ADDRESS1 ? profileData?.LOGINUSER : "",
      add2: profileData?.ADDRESS2 ? profileData?.ADDRESS2 : "",
      add3: profileData?.add3 || "",
      schemeAmount: params?.SchemeAmount ? Number(params?.SchemeAmount) : 0,
      schemeDuration: params?.SchemeDuration
        ? Number(params?.SchemeDuration)
        : 0,
      bonusAmount: params?.BonusAmount ? Number(params?.BonusAmount) : 0,
      amount: params?.SchemeAmount ? Number(params?.SchemeAmount) : 0,
      recAmount: params?.SchemeAmount ? Number(params?.SchemeAmount) : 0,
      goldWt: 0,
      schemeValue: params?.SchemeValue ? Number(params?.SchemeValue) : 0,
      schemeJDate: params?.SchemeJoinDate
        ? params?.SchemeJoinDate
        : new Date().toISOString(),
      schemeENDDate: params?.SchemeEndDate || new Date().toISOString(),
      incharger: "App",
      narr: "-",
      uname: profileData?.LOGINUSER ? profileData?.LOGINUSER : "",
      schemeType: params?.SchemeType ? params?.SchemeType : "",
      fyear: "25-26",
      instno: 1,
      pregoldwt: 0,
      cash: params?.SchemeAmount ? Number(params?.SchemeAmount) : 0,
      card: 0,
      upi: 0,
      online: 0,
      cheque: 0,
      area: profileData?.CITYNAME ? profileData?.CITYNAME : "",
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
      console.log("add receipt mast");
    } catch (err) {
      console.log(err);
    }
  };

  const addRecieptPayment = async (card: number, receipt: number) => {
    const userName = await AsyncStorage.getItem("userName");
    const tablePayloads = [
      {
        recno: receipt + 1,
        recdate: new Date().toISOString(),
        scmgroup: params?.SchemeGroup ? params?.SchemeGroup : "",
        scmname: params?.SchemeName ? params?.SchemeName : "",
        scmmember: profileData?.FULLNAME ? profileData?.FULLNAME : "",
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
      console.log("add receipt payment");
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
      month: new Date().toISOString(), // Use SchemeJoinDate for month
      schemetype: params?.SchemeType ? params?.SchemeType : "",
      schemegroup: params?.SchemeGroup ? params?.SchemeGroup : "",
      schemename: params?.SchemeName ? params?.SchemeName : "",
      schememember: profileData?.FULLNAME ? profileData?.FULLNAME : "",
      adD1: profileData?.add1 ? profileData?.add1 : "",
      adD2: profileData?.add2 ? profileData?.add2 : "",
      adD3: profileData?.add3 ? profileData?.add3 : "",
      adD4: profileData?.add4 ? profileData?.add4 : "",
      area: profileData?.CITYNAME ? profileData?.CITYNAME : "",
      schemeamount: params?.SchemeAmount ? Number(params?.SchemeAmount) : 0,
      schemeduration: params?.SchemeDuration
        ? Number(params?.SchemeDuration)
        : 0,
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
      console.log("add Member details");
    } catch (err) {
      console.log(err);
    }
  };

  const paymentStatusVerification = async (orderId: any) => {
    setLoading(false);
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/PaymentProcess/VerifyPayment/${orderId}`
      );
      const data = await response?.data;
      if (data?.status === "PAID") {
        const card = await addCardNo();
        const receipt = await addRecieptNo();

        await addMember(card, receipt);
        await addRecieptMast(card, receipt);
        await addRecieptPayment(card, receipt);
        await addMemberDetails(card, receipt);

        router.push(`/explore/success`);
      } else {
        router.push(`/explore/failed`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(profileData, "profiledata");

  const addMember = async (card: number, receipt: number) => {
    const userName = await AsyncStorage.getItem("userName");
    const payload = {
      schemeGroup: params?.SchemeGroup ? params?.SchemeGroup : "",
      schemeName: params?.SchemeName ? params?.SchemeName : "",
      schemeMember: profileData?.FULLNAME ? profileData?.FULLNAME : "",
      add1: profileData?.add1 ? profileData?.add1 : "",
      add2: profileData?.add2 ? profileData?.add2 : "",
      add3: profileData?.add3 ? profileData?.add3 : "",
      add4: profileData?.add4 ? profileData?.add4 : "",
      area: profileData?.CITYNAME ? profileData?.CITYNAME : "",
      pincode: profileData?.PINCODE ? profileData?.PINCODE : "",
      email: profileData?.EMAILID ? profileData?.EMAILID : "",
      phone: profileData?.MOBILENO ? profileData?.MOBILENO : "",
      cardNo: String(card + 1) || "",
      schemeAmount: params?.SchemeAmount ? Number(params?.SchemeAmount) : 0,
      schemeDuration: params?.SchemeDuration
        ? Number(params?.SchemeDuration)
        : 0,
      bonusAmount: params?.BonusAmount ? Number(params?.BonusAmount) : 0,
      schemeValue: params?.SchemeValue ? Number(params?.SchemeValue) : 0,
      recentPaidDate: new Date().toISOString(),
      schemeEnding: false,
      schemeDropping: false,
      dropping_Cause: "",
      schemeBDAmt: 0,
      schemeMode: "CASH",
      bonusMonth: 0,
      giftVoucher: 0,
      schemeType: params?.SchemeType ? params?.SchemeType : "",
      gender: profileData?.gender ? profileData?.gender : "",
      state: profileData?.STATE ? profileData?.STATE : "",
      district: profileData?.CITYNAME ? profileData?.CITYNAME : "",
      mobile1: profileData?.MOBILENO ? profileData?.MOBILENO : "",
      mobile2: profileData?.mobile2 ? profileData?.mobile2 : "",
      fax: profileData?.fax ? profileData?.fax : "",
      // dob: profileData?.DOB ? profileData?.DOB : new Date().toISOString(),
      dob: new Date().toISOString(),
      annversary: new Date().toISOString(),
      // annversary: profileData?.DOA ? profileData?.DOA : "",
      schemeJoinDate: params?.SchemeJoinDate
        ? params?.SchemeJoinDate
        : new Date().toISOString(),
      webSite: profileData?.webSite ? profileData?.webSite : "",
      entryDate: new Date().toISOString(),
      entryTime: new Date().toISOString(),
      uName: profileData?.LOGINUSER ? profileData?.LOGINUSER : "",
      schemeEndDate: params?.SchemeEndDate
        ? params?.SchemeEndDate
        : new Date().toISOString(),
      billNo: 0,
      billDate: new Date().toISOString(),
      jewelType: "",
      saleCode: "",
      giftVocher_Status: false,
      giftVocher_BillNo: 0,
      giftVocher_BillDate: new Date().toISOString(),
      giftVocher_JewelType: "",
      giftVocher_SaleCode: 0,
      nominee: profileData?.nominee ? profileData?.nominee : "",
      nmobileno: profileData?.nmobileno ? profileData?.nmobileno : "",
      empname: "App",
      commamt: 0,
      recno: receipt + 1 || 0,
      recdate: new Date().toISOString(),
      recamt: params?.SchemeAmount || 0,
      collecT_POINT: "",
      incharge: "",
      schemecompletion: false,
      duemonths: 0,
      cno: Number(card + 1) || 0,
      cloud_upload: true,
      installno: 1, // ✅ newly added
      statecode: profileData?.statecode ? profileData?.statecode : "",
      station: profileData?.station ? profileData?.station : "",
      apP_USERID: userName || "",
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
      console.log("add member");
    } catch (err) {
      console.log(err);
    }
  };

  const theme = new CFThemeBuilder()
    // .setNavigationBarBackgroundColor("#FF4B2B")
    .setNavigationBarBackgroundColor("#154D71")
    .setNavigationBarTextColor("#FFFFFF")
    .setButtonBackgroundColor("#FFC107")
    .setButtonTextColor("#FFFFFF")
    .setPrimaryTextColor("#212121")
    .setSecondaryTextColor("#757575")
    .build();

  const handlePaymentCallbacks = useCallback(() => {
    CFPaymentGatewayService.setCallback({
      async onVerify(orderID) {
        try {
          await paymentStatusVerification(orderID);
          // router.push(`/explore/success`);
          // Alert.alert("Payment Success", `Order ID: ${orderID}`);

          // Alert.alert(
          //   "Success",
          //   "All payment-related data saved successfully."
          // );
        } catch (error) {
          // console.error("Error in payment callback:", error);
          // Alert.alert(
          //   "Error",
          //   "Something went wrong while saving payment data."
          // );
          // const cleanUrl = window.location.origin + "/";
          // window.history.replaceState({}, document.title, cleanUrl);
        }
      },

      onError(error, orderID) {
        paymentStatusVerification(orderID);
        console.error("Payment Error:", error);
        // router.push(`/explore/failed`);
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
    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  }, [handlePaymentCallbacks]);

  const cashfreePaymentAPI = async (card: number) => {
    const userName = await AsyncStorage.getItem("userName");
    const payBody = {
      customerName: profileData?.FULLNAME ? profileData?.FULLNAME : "",
      email: profileData?.EMAILID ? profileData?.EMAILID : "",
      phone: profileData?.MOBILENO ? profileData?.MOBILENO : "",
      amountRupees: params?.SchemeAmount ? Number(params?.SchemeAmount) : 0,
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
        console.log("payment started");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateApi = async () => {
    setLoading(true);
    try {
      const card = await addCardNo();

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
        source={require("../../../assets/images/backgroundImage2.jpg")}
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
            <Pressable
              style={styles.payButton}
              onPress={async () => {
                setLoading(true);
                const card: any = await addCardNo();
                await cashfreePaymentAPI(card);
              }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator animating={true} color={"#fff"} />
              ) : (
                <Text style={styles.payText}>Pay</Text>
              )}
            </Pressable>
          </Card>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Timesera 2025 ( V-{version})</Text>
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
