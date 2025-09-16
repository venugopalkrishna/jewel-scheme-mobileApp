import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CustomHeaderProps = {
  title: string;
  height?: number;
};

export default function CustomHeaders({
  title,
  height = 80,
}: CustomHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { height }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#154D71",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    textAlign: "center",
    flexDirection: "column",
  },
});
