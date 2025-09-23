// components/FormInputs.tsx
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type InputWithIconProps = TextInputProps & {
  rightIcon?: React.ReactNode;
};

export const InputWithIcon = ({
  rightIcon,
  style,
  ...props
}: InputWithIconProps) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        {...props}
        style={[styles.input, style]}
        placeholderTextColor="#9aa0a6"
      />
      <View style={styles.iconRight}>{rightIcon}</View>
    </View>
  );
};

export const MobileInput = (props: TextInputProps) => {
  return (
    <InputWithIcon
      keyboardType="phone-pad"
      // maxLength={10}
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="User Name"
      placeholderTextColor={props.placeholderTextColor || "#154D71"}
      {...props}
      rightIcon={
        <MaterialIcons name="phone-android" size={20} color="#154D71" />
      }
      style={[styles.mobileInput]}
    />
  );
};

export const LogiWithOTP = (props: TextInputProps) => {
  const [secure, setsecure] = useState(true);
  return (
    <InputWithIcon
      keyboardType="phone-pad"
      maxLength={10}
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="Mobile number"
      placeholderTextColor={props.placeholderTextColor || "#154D71"}
      {...props}
      rightIcon={
        <MaterialIcons name="phone-android" size={20} color="#154D71" />
      }
      style={[styles.mobileInput]}
    />
  );
};

export const PasswordInput = (props: TextInputProps) => {
  const [secure, setSecure] = useState(true);

  return (
    // <View style={styles.orangeBorder}>
    <InputWithIcon
      secureTextEntry={secure}
      style={styles.mobileInput}
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="Password"
      placeholderTextColor={props.placeholderTextColor || "#154D71"}
      {...props}
      rightIcon={
        <TouchableOpacity
          onPress={() => setSecure((s) => !s)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={secure ? "eye-off" : "eye"}
            size={20}
            color="#154D71"
          />
        </TouchableOpacity>
      }
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#154D71",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingRight: 42, // space for right icon
    paddingLeft: 14,
    marginVertical: 6,
  },
  input: {
    fontSize: 16,
    color: "#202124",
  },
  iconRight: {
    position: "absolute",
    right: 12,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileInput: {
    width: 200,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  orangeBorder: {
    borderWidth: 2,
    borderColor: "orange",
    // paddingVertical: -10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#154D71",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  // input: {
  //   flex: 1,
  //   fontSize: 16,
  //   color: "#000", // typed text color
  // },
  icon: {
    marginLeft: 8,
  },
});
