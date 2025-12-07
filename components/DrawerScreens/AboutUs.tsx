import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function AboutUs() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* Header */}
      {/* <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 12 }}>
        About Us
      </Text> */}

      {/* Intro */}
      <Text
        style={{
          fontSize: 15,
          color: "#555",
          lineHeight: 22,
          marginBottom: 22,
        }}
      >
        Welcome to our Gold Jewellery Scheme App — a trusted platform designed
        to help users save monthly and purchase pure gold jewellery with
        confidence and convenience.
      </Text>

      {/* Company Vision */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 12,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 3,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
          Our Vision
        </Text>
        <Text style={{ fontSize: 15, color: "#444", lineHeight: 22 }}>
          Our vision is to make gold ownership simple, affordable, and
          transparent for everyone. We help customers turn small monthly savings
          into valuable gold assets — safely and securely.
        </Text>
      </View>

      {/* What We Offer */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 12,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 3,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
          What We Offer
        </Text>

        <Text
          style={{
            fontSize: 15,
            color: "#444",
            lineHeight: 22,
            marginBottom: 10,
          }}
        >
          • Monthly EMI-based saving schemes to buy gold.
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#444",
            lineHeight: 22,
            marginBottom: 10,
          }}
        >
          • Exclusive discounts and benefits for members.
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#444",
            lineHeight: 22,
            marginBottom: 10,
          }}
        >
          • 100% transparency in pricing and weight.
        </Text>
        <Text style={{ fontSize: 15, color: "#444", lineHeight: 22 }}>
          • Secure digital records of payments, balances, and purchases.
        </Text>
      </View>

      {/* Why Choose Us */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 12,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 3,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
          Why Choose Us?
        </Text>

        <Text
          style={{
            fontSize: 15,
            color: "#444",
            lineHeight: 22,
            marginBottom: 10,
          }}
        >
          • Trusted and reliable platform for gold savings.
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#444",
            lineHeight: 22,
            marginBottom: 10,
          }}
        >
          • User-friendly and secure mobile experience.
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#444",
            lineHeight: 22,
            marginBottom: 10,
          }}
        >
          • Expert support for all scheme- and purchase-related queries.
        </Text>
        <Text style={{ fontSize: 15, color: "#444", lineHeight: 22 }}>
          • Safe, transparent, and efficient processes from start to finish.
        </Text>
      </View>

      {/* Footer Note */}
      <Text
        style={{
          fontSize: 14,
          color: "#666",
          lineHeight: 22,
          marginBottom: 40,
        }}
      >
        Our mission is to make gold buying easier and more accessible for
        everyone. Whether you're investing for future security, buying
        jewellery, or saving monthly — we are here to support your journey.
      </Text>
    </ScrollView>
  );
}
