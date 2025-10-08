import { CREATE_JEWEL } from "@/api";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AccountDeletionDialog({ visible, onClose }: any) {
  const { logout, setIsLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("tenantName");
      await AsyncStorage.removeItem("userName");
      logout();
      setIsLoggedIn(false);
      router.replace("/");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      const storedTenant = await AsyncStorage.getItem("tenantName");
      const userName = await AsyncStorage.getItem("userName");

      // Call your backend API endpoint
      const res = await axios.post(
        `${CREATE_JEWEL}/api/Wholesal/DeleteDataFromGivenTableNameWithWhere?tableName=SCHEME_LOGINS&where=LOGINUSER='${userName}'`,
        {},
        { headers: { tenantName: storedTenant } }
      );
    } catch (error) {
      console.error("Account deletion error:", error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteAccount();
      await logOut();
      onClose();
      Alert.alert(
        "Account Deleted",
        "Your account has been deleted successfully."
      );
      router.replace("/");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Failed to delete your account. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.dialogBox}>
          <Text style={styles.title}>Delete Account</Text>
          <Text style={styles.message}>
            Are you sure you want to permanently delete your account?
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#ccc" }]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={[styles.buttonText, { color: "#000" }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Delete</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogBox: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
