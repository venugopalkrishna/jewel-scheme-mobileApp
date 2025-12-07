import { CREATE_JEWEL } from "@/api";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from "cashfree-pg-api-contract";
import dayjs from "dayjs";

import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CFPaymentGatewayService } from "react-native-cashfree-pg-sdk";
import { ActivityIndicator, Card } from "react-native-paper";
// import { CFPaymentGatewayService } from "react-native-cashfree-pg-sdk";
const PayEma = () => {
  const router = useRouter();
  const [schemeDetData, setSchemeDetData] = useState<any>([]);
  const [payableCard, setPayableCard] = useState<any>();
  const [cardItem, setCardItem] = useState<any>();
  const [payInstallment, setInstallment] = useState<any>();

  const version = Constants?.expoConfig?.version;
  const [expanded, setExpanded] = React.useState(false);
  // const params = useLocalSearchParams();
  const [cardNo, setCardNo] = useState<any>();
  const [receiptNo, setReceiptNo] = useState<any>();
  const [profileData, setProfileData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [schemeData, setSchemeData] = useState<any>();
  const [expandedCard, setExpandedCard] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(Number);
  const cardItemRef = useRef(null);
  const payInstallmentRef = useRef(null);

  const addRecieptNo = async () => {
    const storedTenant = await AsyncStorage.getItem("tenantName");
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Scheme/GetSchemeMaxNumberInTable?tableName=RECEIPT_MAST&column=RECNO`,
        { headers: { tenantName: storedTenant } }
      );
      const data: number = response?.data[0]?.Column1 || 0;
      setReceiptNo(data);
      console.log("add receipt");

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
  const addRecieptMast = async (
    card: any,
    receipt: number,
    installment: any
  ) => {
    const userName = await AsyncStorage.getItem("userName");
    const payload = {
      recNo: receipt + 1,
      recDate: new Date().toISOString(),
      rectime: new Date().toISOString(),
      empCode: "",
      schemeGroup: card?.SchemeGroup || "",
      schemeName: card?.SchemeName || "",
      goldRate: 0,
      cardNo: String(card?.CardNo), // ✅ Convert to string
      phno: profileData?.MOBILENO ? profileData?.MOBILENO : "",
      schemeMember: profileData?.FULLNAME ? profileData?.FULLNAME : "",
      add1: profileData?.ADDRESS1 ? profileData?.ADDRESS1 : "",
      add2: profileData?.ADDRESS2 ? profileData?.ADDRESS2 : "",
      add3: profileData?.add3 || "",
      schemeAmount: card?.SchemeAmount || 0,
      schemeDuration: card?.SchemeDuration || 0,
      bonusAmount: card?.BonusAmount || 0,
      amount: card?.SchemeAmount || 0,
      recAmount: card?.SchemeAmount || 0,
      goldWt: 0,
      schemeValue: card?.SchemeValue || 0,
      schemeJDate: card?.SchemeJoinDate || new Date().toISOString(),
      schemeENDDate: card?.SchemeEndDate || new Date().toISOString(),
      incharger: "App",
      narr: "-",
      uname: profileData?.LOGINUSER ? profileData?.LOGINUSER : "",
      schemeType: card?.SchemeType || "",
      fyear: "25-26",
      instno: installment?.sno,
      pregoldwt: 0,
      cash: card?.SchemeAmount || 0,
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

  const addRecieptPayment = async (
    card: any,
    receipt: number,
    installment: any
  ) => {
    const userName = await AsyncStorage.getItem("userName");
    const tablePayloads = [
      // tableData.map((record, index) => (
      {
        recno: receipt + 1,
        recdate: new Date().toISOString(),
        scmgroup: card?.SchemeGroup || "string",
        scmname: card?.SchemeName || "string",
        scmmember: profileData?.FULLNAME || "string",
        cardno: String(card?.CardNo),
        sno: installment?.sno,
        paymode: "CASH",
        accno: "1234",
        descr: "string",
        particulars: "string",
        amt: Number(card?.SchemeAmount) || 0,
        recamt: Number(card?.SchemeAmount),
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
      console.log("receipt payment");
    } catch (err) {
      console.log(err);
    }
  };
  const addMemberDetails = async (
    card: any,
    receipt: number,
    installment: any
  ) => {
    const userName = await AsyncStorage.getItem("userName");
    const memberCardPayload = {
      recNo: receipt + 1,
      recDate: dayjs(new Date()).format("MM/DD/YYY"),
      pStatus: true,
      cardNO: Number(card?.CardNo),
      sno: installment?.sno, // Use installmentNo as sno
    };
    const storedTenant = await AsyncStorage.getItem("tenantName");
    try {
      const response = await axios.post(
        `${CREATE_JEWEL}/api/Scheme/UpdateMemberCardDetails`,
        memberCardPayload,
        {
          headers: {
            tenantName: storedTenant,
          },
        }
      );
      console.log("member details");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(dayjs(new Date()).format("MM/DD/YYYY"), "date");

  const addMember = async (card: any, receipt: number, installment: any) => {
    const userName = await AsyncStorage.getItem("userName");
    const payload = {
      // schemeGroup: card?.SchemeGroup ? card?.SchemeGroup : "",
      // schemeName: card?.SchemeName ? card?.SchemeName : "",
      // schemeMember: profileData?.SCHEMEMEMBER ? profileData?.SCHEMEMEMBER : "",
      // add1: profileData?.add1 ? profileData?.add1 : "",
      // add2: profileData?.add2 ? profileData?.add2 : "",
      // add3: profileData?.add3 ? profileData?.add3 : "",
      // add4: profileData?.add4 ? profileData?.add4 : "",
      // area: profileData?.area ? profileData?.area : "",
      // pincode: profileData?.pincode ? profileData?.pincode : "",
      // email: profileData?.email ? profileData?.email : "",
      // phone: profileData?.phone ? profileData?.phone : "",
      // schemeAmount: card?.SchemeAmount ? card?.SchemeAmount : 0,
      // schemeDuration: card?.SchemeDuration ? card?.SchemeDuration : 0,
      // bonusAmount: card?.BonusAmount ? card?.BonusAmount : 0,
      // schemeValue: card?.SchemeValue ? card?.SchemeValue : 0,
      // recentPaidDate: new Date().toISOString(),
      // schemeEnding: false,
      // schemeDropping: false,
      // dropping_Cause: "",
      // schemeBDAmt: 0,
      // schemeMode: "CASH",
      // bonusMonth: 0,
      // giftVoucher: 0,
      // schemeType: card?.SchemeType ? card?.SchemeType : "",
      // gender: profileData?.gender ? profileData?.gender : "",
      // state: profileData?.state ? profileData?.state : "",
      // district: profileData?.district ? profileData?.district : "",
      // mobile1: profileData?.MOBILENO ? profileData?.MOBILENO : "",
      // mobile2: profileData?.mobile2 ? profileData?.mobile2 : "",
      // fax: profileData?.fax ? profileData?.fax : "",
      // dob: profileData?.DOB ? profileData?.DOB : "",
      // annversary: profileData?.DOA ? profileData?.DOA : "",
      // schemeJoinDate: card?.SchemeJoinDate
      //   ? card?.SchemeJoinDate
      //   : new Date().toISOString(),
      // webSite: profileData?.webSite ? profileData?.webSite : "",
      // entryDate: new Date().toISOString(),
      // entryTime: new Date().toISOString(),
      // uName: profileData?.SchemeMember ? profileData?.SchemeMember : "",
      // schemeEndDate: card?.SchemeEndDate
      //   ? card?.SchemeEndDate
      //   : new Date().toISOString(),
      // billNo: 0,
      // billDate: new Date().toISOString(),
      // jewelType: "",
      // saleCode: "",
      // giftVocher_Status: false,
      // giftVocher_BillNo: 0,
      // giftVocher_BillDate: new Date().toISOString(),
      // giftVocher_JewelType: "",
      // giftVocher_SaleCode: 0,
      // nominee: profileData?.nominee ? profileData?.nominee : "",
      // nmobileno: profileData?.nmobileno ? profileData?.nmobileno : "",
      // empname: "App",
      // commamt: 0,
      // collecT_POINT: "",
      // incharge: "",
      // schemecompletion: false,
      // cno: Number(card?.CardNo) || 0,
      // duemonths: 0,
      // cloud_upload: true,
      InstallNo: installment?.sno, // ✅ newly added
      recNo: receipt + 1 || 0,
      recDate: dayjs(new Date()).format("MM/DD/YYY"),
      recAmt: card?.SchemeAmount || 0,
      cardNO: Number(card?.CardNo),
      // statecode: profileData?.statecode ? profileData?.statecode : "",
      // station: profileData?.station ? profileData?.station : "",
      // apP_USERID: userName || "",
    };
    try {
      const storedTenant = await AsyncStorage.getItem("tenantName");
      const response = await axios.post(
        `${CREATE_JEWEL}/api/Scheme/UpdateSchemeMemberInstallment`,
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
    .setNavigationBarBackgroundColor("#FF4B2B")
    .setNavigationBarTextColor("#FFFFFF")
    .setButtonBackgroundColor("#FFC107")
    .setButtonTextColor("#FFFFFF")
    .setPrimaryTextColor("#212121")
    .setSecondaryTextColor("#757575")
    .build();

  const paymentStatusVerification = async (
    orderId: any,
    cardItem: any,
    payInstallment: any
  ) => {
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/PaymentProcess/VerifyPayment/${orderId}`
      );
      const data = await response?.data;
      if (data?.status === "PAID") {
        const receipt = await addRecieptNo();

        await addMember(cardItem, receipt, payInstallment);
        await addRecieptMast(cardItem, receipt, payInstallment);
        await addMemberDetails(cardItem, receipt, payInstallment);
        await addRecieptPayment(cardItem, receipt, payInstallment);
        router.push({
          pathname: `/explore/success`,
        });
      } else {
        router.push(`/explore/failed`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePaymentCallbacks = useCallback(() => {
    CFPaymentGatewayService.setCallback({
      async onVerify(orderID) {
        try {
          await paymentStatusVerification(
            orderID,
            cardItemRef.current,
            payInstallmentRef.current
          );

          // Alert.alert("Payment Success", `Order ID: ${orderID}`);
          // Alert.alert(
          //   "Success",
          //   "All payment-related data saved successfully."
          // );
        } catch (error) {
          router.push(`/explore/failed`);
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
        paymentStatusVerification(
          orderID,
          cardItemRef.current,
          payInstallmentRef.current
        );

        setLoading(false);
        router.push(`/explore/failed`);
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

  const cashfreePaymentAPI = async (card: any, installment: any) => {
    const userName = await AsyncStorage.getItem("userName");
    const payBody = {
      customerName: profileData?.FULLNAME ? profileData?.FULLNAME : "",
      email: profileData?.EMAILID ? profileData?.EMAILID : "",
      phone: profileData?.MOBILENO ? profileData?.MOBILENO : "",
      amountRupees: card?.SchemeAmount,
      userId: userName,
      cardNo: String(card?.CardNo),
      schemeGroup: card?.SchemeGroup,
      schemeName: card?.SchemeName,
      installmentno: installment?.sno,
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
        console.log("start payment");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateApi = async (card: any, installment: any) => {
    try {
      console.log("create api");

      // const card = await addCardNo();
    } catch (err) {
      console.log("Error in processing:", err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const schemeMemberDet = async (card: number) => {
    setSchemeDetData([]);
    try {
      const userName = await AsyncStorage.getItem("userName");
      const storedTenant = await AsyncStorage.getItem("tenantName");
      if (storedTenant) {
        const res = await axios.get(
          `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhere?tableName=MEMBER_CARD_DET&where=APP_USERID='${userName}' AND CARDNO='${card}'&order=sno `,
          { headers: { tenantName: storedTenant } }
        );

        const data = res.data || [];
        setSchemeDetData(data);

        const today = new Date();
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);
        // Normalize dates (remove time zone/time differences)
        const normalizeDate = (date: Date) =>
          new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const todayNormalized = normalizeDate(today);
        const next30DaysNormalized = normalizeDate(next30Days);

        const filteredData = data.filter((item: any) => {
          if (!item.MONTH) return false;

          const itemDate = new Date(item.MONTH);
          const itemNormalized = normalizeDate(itemDate);

          return itemNormalized <= next30DaysNormalized;
        });

        // setSchemeDetData((prev: any) => [...prev, ...filteredData]);
      }
    } catch (err) {
      console.log("Error fetching MEMBER_CARD_DET:", err);
    }
  };

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
        setSchemeData(memberData);
      }
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const toggleExpand = (index: any) => {
    setExpandedCard((prev: any) => (prev === index ? null : index));
  };

  const getEmiStatus = (dueDateString: string) => {
    if (!dueDateString) return { text: "Invalid Date", type: "invalid" };

    let due;

    // CASE 1: API returns "DD/MM/YYYY"
    if (dueDateString.includes("/")) {
      const [day, month, year] = dueDateString.split("/");
      due = new Date(`${year}-${month}-${day}`);
    }
    // CASE 2: API returns "YYYY-MM-DD"
    else {
      due = new Date(dueDateString);
    }

    if (isNaN(due.getTime())) {
      return { text: "Invalid Date", type: "invalid" };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 0) {
      return { text: `(${diffDays} days left)`, type: "future" };
    } else if (diffDays === 0) {
      return { text: "Due Today", type: "today" };
    } else {
      return { text: `Overdue by ${Math.abs(diffDays)} days`, type: "overdue" };
    }
  };

  useEffect(() => {
    schemeMemberAPI();
    // schemeMemberDetAPI();
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
          {schemeData?.length > 0 ? (
            schemeData?.map((item: any, index: number) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    toggleExpand(index);
                    schemeMemberDet(item?.CardNo);
                    console.log(item?.CardNo, "card no");
                  }}
                >
                  <Card style={styles.card}>
                    {/* Header */}
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderLeft}>
                        {index + 1}. {item?.SchemeName}
                      </Text>
                      <Text style={styles.cardHeaderRight}>Gold Scheme</Text>
                    </View>

                    {/* Body Placeholder */}
                    <View style={styles.cardBody}>
                      {/* <Text
                          style={{
                            textAlign: "center",
                            color: "red",
                            fontWeight: "500",
                          }}
                        >
                          Show EMI
                        </Text> */}
                      {/* <AntDesign
                          name="down"
                          size={24}
                          color="grey"
                          style={{ textAlign: "center" }}
                        /> */}
                      {expandedCard === index ? (
                        <AntDesign
                          name="up"
                          size={24}
                          color="grey"
                          style={{
                            textAlign: "center",
                            padding: 10,
                            borderRadius: 50,
                          }}
                        />
                      ) : (
                        <AntDesign
                          name="down"
                          size={24}
                          color="grey"
                          style={{ textAlign: "center" }}
                        />
                      )}
                    </View>

                    {/* ---------------- EXPANDED SECTION ---------------- */}
                    {expandedCard === index && (
                      <View style={styles.expandSection}>
                        {schemeDetData?.map(
                          (dataitem: any, dataindex: number) => {
                            const emiStatus = getEmiStatus(dataitem?.MONTH);
                            return (
                              <View key={dataindex} style={styles.emiRow}>
                                {/* If paid */}
                                {dataitem?.PSTATUS === true ? (
                                  <View>
                                    <View style={styles.detailRow}>
                                      <Text style={styles.label}>
                                        Scheme Join Date
                                      </Text>
                                      <Text style={styles.colon}>:</Text>
                                      <Text style={styles.value}>
                                        {dayjs(
                                          dataitem?.SCHEMEJOINDATE
                                        )?.format("DD/MM/YYYY")}
                                      </Text>
                                    </View>
                                    {/* Month */}
                                    <View style={styles.detailRow}>
                                      <Text style={styles.label}>Due Date</Text>
                                      <Text style={styles.colon}>:</Text>
                                      <Text style={styles.value}>
                                        {dayjs(dataitem?.MONTH).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </Text>
                                    </View>

                                    {/* EMI Status */}
                                    <View style={styles.detailRow}>
                                      <Text style={styles.label}>
                                        Payment Status
                                      </Text>
                                      <Text style={styles.colon}>:</Text>
                                      <Text
                                        style={{
                                          color: "green",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Paid
                                      </Text>
                                    </View>
                                  </View>
                                ) : (
                                  <>
                                    <View style={styles.detailRow}>
                                      <Text style={styles.label}>
                                        Scheme Join Date
                                      </Text>
                                      <Text style={styles.colon}>:</Text>
                                      <Text style={styles.value}>
                                        {dayjs(
                                          dataitem?.SCHEMEJOINDATE
                                        )?.format("DD/MM/YYYY")}
                                      </Text>
                                    </View>
                                    {/* Month */}
                                    <View style={styles.detailRow}>
                                      <Text style={styles.label}>Due Date</Text>
                                      <Text style={styles.colon}>:</Text>
                                      <Text style={styles.value}>
                                        {dayjs(dataitem?.MONTH).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </Text>
                                    </View>

                                    {/* EMI Status */}
                                    <View style={styles.detailRow}>
                                      <Text style={styles.label}>Next EMI</Text>
                                      <Text style={styles.colon}>:</Text>

                                      <Text
                                        style={[
                                          styles.value,
                                          emiStatus.type === "future" && {
                                            color: "#777",
                                          },
                                          emiStatus.type === "today" && {
                                            color: "#ff9900",
                                          },
                                          emiStatus.type === "overdue" && {
                                            color: "red",
                                          },
                                        ]}
                                      >
                                        {emiStatus?.text}
                                      </Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                      <Text style={styles.label}>
                                        Payment Status
                                      </Text>
                                      <Text style={styles.colon}>:</Text>
                                      <Text
                                        style={{
                                          color: "red",
                                          fontWeight: "500",
                                        }}
                                      >
                                        Not yet done
                                      </Text>
                                    </View>

                                    {/* PAY EMI BUTTON only if due or overdue */}
                                    {(emiStatus.type === "today" ||
                                      emiStatus.type === "overdue") && (
                                      <Pressable
                                        disabled={loading}
                                        style={styles.payButton}
                                        onPress={() => {
                                          // setLoading(true);
                                          setCardItem(item);
                                          setInstallment(dataitem);
                                          cardItemRef.current = item;
                                          payInstallmentRef.current = dataitem;
                                          // setLoadingIndex(dataindex);
                                          console.log(dataitem, "data item");
                                          console.log(item, "item");
                                          cashfreePaymentAPI(item, dataitem);

                                          // handleCreateApi(item, dataitem);
                                          // if (result.success) {
                                          //   handlePaymentCallbacks(); // call ONLY after API success
                                          // }
                                        }}
                                      >
                                        {loadingIndex === dataindex ? (
                                          <ActivityIndicator
                                            animating={true}
                                            color={"#fff"}
                                          />
                                        ) : (
                                          <Text style={styles.payButtonText}>
                                            Pay EMI
                                          </Text>
                                        )}
                                      </Pressable>
                                    )}

                                    {/* Not Yet Due */}
                                    {emiStatus.type === "future" && (
                                      <Text style={styles.notDueText}>
                                        Not Yet Due
                                      </Text>
                                    )}
                                  </>
                                )}
                              </View>
                            );
                          }
                        )}
                      </View>
                    )}
                  </Card>
                </Pressable>
              );
            })
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

export default PayEma;

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
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    // backgroundColor: "#6FC1A7",
    backgroundColor: "#d2dcc0ff",
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardHeaderLeft: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  cardHeaderRight: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },

  cardBody: {
    // paddingVertical: 4,
  },

  expandSection: {
    // marginTop: 10,
    padding: 12,
    // backgroundColor: "#F8F9FA",
    backgroundColor: "#c8dfd8ff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    gap: 12,
  },

  emiRow: {
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  label: {
    width: 130,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  colon: {
    marginHorizontal: 5,
    fontSize: 14,
    color: "#333",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
  },

  paidText: {
    fontSize: 15,
    color: "green",
    fontWeight: "700",
  },

  notDueText: {
    marginTop: 8,
    color: "#777",
    fontStyle: "italic",
    fontWeight: "bold",
  },

  payButton: {
    marginTop: 8,
    // backgroundColor: "#0077FF",
    backgroundColor: "#154D71",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // noDataContainer: {
  //   padding: 20,
  //   alignItems: "center",
  // },
  // noDataText: {
  //   fontSize: 16,
  //   color: "#999",
  // },
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
