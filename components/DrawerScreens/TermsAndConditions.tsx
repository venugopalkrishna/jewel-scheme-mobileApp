import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Professional Terms & Privacy screen component for a Gold Jewellery Scheme App
// - Collapsible sections for Terms & Conditions and Privacy Policy
// - Clean, readable typography and spacing
// - Uses the project's color palette (#154D71) from earlier messages

export default function TermsAndPrivacyScreen() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = [
    {
      id: "terms",
      title: "Terms & Conditions",
      content: `\n
1. Introduction\n
Welcome to Gold Jewellery Scheme App. By creating an account or using our services, you agree to these Terms & Conditions. If you do not agree, please do not use the App.\n\n2. Eligibility\n
You must be 18 years or older to use this App and provide truthful, accurate information during registration.\n\n3. Services We Provide\n
The App allows users to: join our Gold Jewellery Saving Scheme; purchase gold through monthly EMI payments; view market price updates; manage payments, profile details and scheme plan information; and upload documents or photos for verification. We may change or discontinue features at our discretion.\n\n4. Account Responsibility\n
You are responsible for keeping your credentials secure and for all activity performed with your account. Notify us immediately of any unauthorized access.\n\n5. Payments & EMI Scheme\n
Payments are processed via third-party payment gateways. EMI payments must be made on time. Late payments may incur fees or scheme cancellation. Refunds on completed EMI payments are subject to the scheme policy.\n\n6. Gold Redemption\n
Details about maturity, redemption value, and applicable charges are shown in-app. Market rate changes may affect final values.\n\n7. User Conduct\n
You agree not to misuse the App, upload fraudulent documents, impersonate others, or attempt hacking or reverse-engineering. Violations may lead to suspension or legal action.\n\n8. Intellectual Property\n
All content, designs, logos and materials are the property of the App owner. You may not reuse them without permission.\n\n9. Termination\n
We may suspend or terminate accounts for policy violations or suspected fraud. You may delete your account at any time via account settings.\n\n10. Limitation of Liability\n
We are not liable for market price fluctuations, third-party gateway failures, or losses arising from incorrect user-provided information.\n\n11. Changes to Terms\n
We may update these Terms. Continued use signifies acceptance of the updated Terms.\n\n12. Contact\n
Support: timesera9090@gmail.com`,
    },

    {
      id: "privacy",
      title: "Privacy Policy",
      content: `\n
1. Introduction\n
This Privacy Policy explains how Gold Jewellery Scheme App collects, uses, stores and protects your personal information. By using the App you consent to this policy.\n\n2. Information We Collect\n
Personal information: full name, phone number, email, date of birth and address. We collect your phone number solely for account creation and communication.\nPayment information: payment records and transaction metadata (sensitive payment data is handled by third-party gateways and not stored by us).\nUploaded data: photos and documents (KYC, ID proofs).\nApp usage & device data: device model, OS, IP address, and activity logs.\n\n3. How We Use Your Information\n
We use data to create/manage accounts, verify identity (KYC), process EMIs and transactions, provide customer support, and send important notifications (payments, due dates, and service updates). We do not sell your personal data.\n\n4. Sharing of Information\n
We share data only when necessary: with payment gateways, KYC service providers, internal support staff, or law enforcement when required. We do not share data for marketing without your consent.\n\n5. Data Security & Storage\n
We implement industry-standard security measures to protect the data we hold. However, no system is completely secure. Keep your passwords confidential and notify us of any suspicious activity.\n\n6. Your Rights\n
You may access, correct, or request deletion of your personal data. To exercise these rights, contact support. Some data may be retained to meet legal or accounting obligations.\n\n7. Children\n
The App is not intended for children under 18.\n\n8. Changes to Privacy Policy\n
We may update this policy. We will notify you of major changes inside the App.\n\n 9. Test Mode\nPayments process is currently in sandbox/test mode. No actual charges will be made.\n\n 10. Contact\n
Data and privacy inquiries: timesera9090@gmail.com`,
    },
  ];

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Gold Jewellery Scheme — Legal</Text>

      {sections.map((section) => (
        <View key={section.id} style={styles.sectionWrap}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleSection(section.id)}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Ionicons
              name={
                openSection === section.id ? "chevron-down" : "chevron-forward"
              }
              size={20}
              color="#154D71"
            />
          </TouchableOpacity>

          {openSection === section.id && (
            <View style={styles.sectionBody}>
              {section.content.split("\n\n").map((para, idx) => (
                <Text key={idx} style={styles.paragraph}>
                  {para.trim()}
                </Text>
              ))}

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() => {
                    /* accept/acknowledge logic */
                  }}
                >
                  <Text
                    style={styles.primaryBtnText}
                    onPress={() =>
                      setOpenSection((prev) =>
                        prev === section?.id ? null : section?.id
                      )
                    }
                  >
                    Acknowledge
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingVertical: "60%",
    backgroundColor: "#f7fbff",
    // paddingBottom: Platform.OS === "android" ? 320 : 220,
    paddingHorizontal: 20,
    verticalAlign: "middle",
    // alignItems: "center",
  },

  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#154D71",
    marginBottom: 14,
    paddingTop: 20,
  },

  sectionWrap: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e6eef6",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f0f6fb",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f0755",
  },

  sectionBody: {
    padding: 16,
  },

  paragraph: {
    fontSize: 13,
    lineHeight: 20,
    color: "#333",
    marginBottom: 10,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 8,
  },

  primaryBtn: {
    backgroundColor: "#0f0755",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#154D71",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  secondaryBtnText: {
    color: "#154D71",
    fontWeight: "600",
    fontSize: 14,
  },
});
