import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";

export default function WriteToUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    setVisible(true);
    // Add your backend API logic here
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 10 }}>
        Write To Us
      </Text> */}

      <Text style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>
        Have a question, feedback, or need help with your Gold Jewellery Scheme
        account? Send us a message — our team will get back to you within 24
        hours.
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 10,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 3,
        }}
      >
        {/* Name */}
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>
          Your Name
        </Text>
        <TextInput
          placeholder="Enter your full name"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
          style={{
            height: 45,
            borderWidth: 1,
            borderColor: "#154D71",
            borderRadius: 8,
            marginBottom: 12,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
          }}
        />

        {/* Email */}
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>
          Email Address
        </Text>
        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          style={{
            height: 45,
            borderWidth: 1,
            borderColor: "#154D71",
            borderRadius: 8,
            marginBottom: 12,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
          }}
        />

        {/* Message */}
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>
          Message
        </Text>
        <TextInput
          placeholder="Write your message here"
          placeholderTextColor="#777"
          multiline
          numberOfLines={5}
          value={message}
          onChangeText={setMessage}
          style={{
            borderWidth: 1,
            borderColor: "#154D71",
            borderRadius: 8,
            paddingHorizontal: 10,
            height: 150,
            textAlignVertical: "top",
            marginBottom: 15,
            backgroundColor: "#fff",
          }}
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#154D71",
            paddingVertical: 12,
            borderRadius: 10,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name="send"
            size={20}
            color="#fff"
            style={{ marginRight: 6 }}
          />
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Send Message
          </Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
        style={{
          backgroundColor: "#00C853", // green background
          borderRadius: 10,
        }}
        wrapperStyle={{
          position: "absolute",
          alignSelf: "center", // ⬅️ Centers Snackbar horizontally
          top: 10,
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Sent Successfully!
        </Text>
      </Snackbar>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
