import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is the Gold Jewellery Scheme?",
      a: "Our Gold Jewellery Scheme allows users to save monthly EMIs and purchase gold easily at the end of the scheme period.",
    },
    {
      q: "How can I join the scheme?",
      a: "You can join by creating an account, verifying your details, and selecting a scheme plan that suits your budget.",
    },
    {
      q: "Is my personal data safe?",
      a: "Yes, we follow strict data protection measures and do not share your information without consent.",
    },
    {
      q: "Can I update my personal details later?",
      a: "Yes, you can update your email, address, DOB, and profile photo anytime from your profile settings.",
    },
    {
      q: "How do EMI payments work?",
      a: "You pay a fixed EMI every month. All payments are securely processed through authorized payment gateways.",
    },
    {
      q: "What if I miss an EMI?",
      a: "Missing an EMI may delay the scheme maturity. Please check scheme terms for more details.",
    },
    {
      q: "Can I buy gold directly without a scheme?",
      a: "Yes, members can purchase gold jewellery anytime using available offers inside the app.",
    },
  ];

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 10 }}>
        Frequently Asked Questions
      </Text> */}

      {faqs.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "#fff",
            padding: 14,
            borderRadius: 10,
            marginBottom: 10,
            elevation: 2,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 3,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => toggleFAQ(index)}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#000",
                width: "95%",
              }}
            >
              {item.q}
            </Text>

            <Ionicons
              name={openIndex === index ? "chevron-up" : "chevron-down"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>

          {openIndex === index && (
            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                color: "#444",
                lineHeight: 20,
                textAlign: "justify",
                width: "97%",
              }}
            >
              {item.a}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
