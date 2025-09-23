import { CREATE_JEWEL } from "@/api";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, List, RadioButton, TextInput } from "react-native-paper";

const JoinPurchasePlan = () => {
  const [expanded, setExpanded] = React.useState(false);
  const params = useLocalSearchParams();
  const [cardNo, setCardNo] = useState<any>();
  const [receiptNo, setReceiptNo] = useState<any>();
  const [profileData, setProfileData] = useState<any>();

  const handlePress = () => setExpanded(!expanded);
  console.log(cardNo, "cardNo");
  console.log(params, "params");
  console.log(profileData, "profileData");
  const tenantName = localStorage.getItem("tenantName");

  const addCardNo = async () => {
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Scheme/GetSchemeMaxNumberInTable?tableName=SCHEME_MEMBER&column=CNO`,
        { headers: { tenantName: tenantName } }
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
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Scheme/GetSchemeMaxNumberInTable?tableName=RECEIPT_MAST&column=RECNO`,
        { headers: { tenantName: tenantName } }
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
    try {
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhere?tableName=SCHEME_MEMBER_PROFILE&where=MOBILENO%3D%27999%27`,
        {
          headers: {
            tenantName: tenantName,
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
    };
    console.log(payload, "payload");

    try {
      const response = await axios.post(
        `${CREATE_JEWEL}/api/Master/ReceiptMastInsert`,
        payload,
        {
          headers: {
            tenantName: tenantName,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addRecieptPayment = async (card: number, receipt: number) => {
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
        accno: "string",
        descr: "string",
        particulars: "string",
        amt: Number(params?.SchemeAmount) || 0,
        recamt: Number(params?.SchemeAmount),
        fyear: "25-26",
        clouD_UPLOAD: true,
      },
    ];
    // ));
    try {
      const response = await axios.post(
        `${CREATE_JEWEL}/api/Master/ReceiptPaymentInsert`,
        tablePayloads,
        {
          headers: {
            tenantName: tenantName,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const addMemberDetails = async (card: number, receipt: number) => {
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
      bonusMonth: 0,
    };
    try {
      const response = await axios.post(
        `${CREATE_JEWEL}/api/Scheme/MemberCardDetailsInsert`,
        memberCardPayload,
        {
          headers: {
            tenantName: tenantName,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleCreateApi = async () => {
    try {
      const card = await addCardNo();
      const receipt = await addRecieptNo();

      // Now these values are set, safe to call dependent functions
      await addRecieptMast(card, receipt);
      await addMemberDetails(card, receipt);
      await addRecieptPayment(card, receipt);
    } catch (err) {
      console.log("Error in processing:", err);
    }
  };

  return (
    <ScrollView>
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
      <Card style={{ backgroundColor: "#fff", margin: 20, borderRadius: 3 }}>
        {/* Custom Title Section */}
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
            {/* Gold Purchase Plan - 500 */}
            {params?.SchemeGroup}
          </Text>
        </View>
        <View style={{ flexDirection: "row", margin: 5, marginLeft: 25 }}>
          <Text style={{ width: 130, fontSize: 13 }}>Duration</Text>
          <Text style={{ fontSize: 13 }}>{params?.SchemeDuration} months</Text>
        </View>
        <View style={{ flexDirection: "row", margin: 5, marginLeft: 25 }}>
          <Text style={{ width: 130, fontSize: 13 }}>Monthly Advance</Text>
          <Text style={{ fontSize: 13 }}>₹{params?.SchemeAmount}</Text>
        </View>
        <View style={{ flexDirection: "row", margin: 5, marginLeft: 25 }}>
          <Text style={{ width: 130, fontSize: 13 }}>Total Payable</Text>
          <Text style={{ fontSize: 13 }}>₹{params?.SchemeValue}</Text>
        </View>

        <View>
          <TextInput
            value={"Vamsi"}
            style={{
              backgroundColor: "#fff",
              borderColor: "grey",
              borderWidth: 0.5,
              marginHorizontal: 25,
              marginBottom: 3,
            }}
            editable={true} // prevents editing
            caretHidden={true} //
          />
          <TextInput
            // value={"Vamsi"}
            placeholder="Referral Code (Optional)"
            placeholderTextColor={"grey"}
            style={{
              backgroundColor: "#fff",
              borderColor: "grey",
              borderWidth: 0.5,
              marginHorizontal: 25,
              //   opacity: 2,
            }}
          />
        </View>

        {/* Content */}
        <Card.Content>
          <List.Accordion
            style={{
              backgroundColor: "#fff",
              marginVertical: 0,
            }}
            title="Terms and Conditions"
            titleStyle={{ fontSize: 12 }}
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
              Moreover, the Swarnadhara Small Savings Scheme is unique like no
              other scheme. It offers discounts at the end of the scheme, and
              many other benefits. We have listed other benefits below. We have
              also answered your basic questions about the Swarnadhara scheme.
              Besides, Swarnadhara Small Savings Scheme is unique like any other
              scheme. It offers a discount at the end of the scheme, and many
              other benefits. We have listed other benefits below. We have also
              answered your basic questions about Swarnadhara Scheme.
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
              installment. However, the scheme's maturity period will be delayed
              accordingly.
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
          {/* Button */}

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
      </Card>
    </ScrollView>
  );
};

export default JoinPurchasePlan;
