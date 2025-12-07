import { CREATE_JEWEL } from "@/api";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const rates: any = [
  {
    date: "2025-01-10",
    gold24: 6300,
    gold22: 5800,
    gold18: 4500,
    silver: 82,
  },
  {
    date: "2025-01-10",
    gold24: 6300,
    gold22: 5800,
    gold18: 4500,
    silver: 82,
  },
  {
    date: "2025-01-10",
    gold24: 6300,
    gold22: 5800,
    gold18: 4500,
    silver: 82,
  },
];

export default function RateViewer() {
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const [showFromPicker, setShowFromPicker] = useState<any>(false);
  const [showToPicker, setShowToPicker] = useState<any>(false);
  const [ratesData, setRatesData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState([]);
  const [finalTable, setFinalTable] = useState<any>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  /** FORMAT DATE — DD/MM/YYYY */
  const formatDate = (date: any) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
  };

  /** FETCH API */
  const fetchRates = async () => {
    try {
      setLoading(true);
      setError(null);

      // Example API URL — replace with your actual endpoint
      const url = `https://your-api.com/rates?from=${fromDate || ""}&to=${
        toDate || ""
      }`;

      const res = await fetch(url);
      const data = await res.json();

      // setRates(data?.rates || []);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRatesAPI = async () => {
    try {
      const storedTenant = await AsyncStorage.getItem("tenantName");
      const response = await axios.get(
        `${CREATE_JEWEL}/api/Master/GetDataFromGivenTableNameWithWhereandOrder?tableName=DAILY_RATES&where=%28PREFIX%20LIKE%20%27916%25%27%29%20OR%20%28PREFIX%20LIKE%20%27SILVER%25%27%29&order=RDATE%20DESC`,
        {
          headers: {
            tenantName: storedTenant,
          },
        }
      );
      const data = await response?.data;
      setRatesData(data);
    } catch (err) {
      console.log(err, "console error");
    }
  };

  useEffect(() => {
    getRatesAPI();
  }, []);

  useEffect(() => {
    const today = new Date();
    const last30 = new Date();
    last30.setDate(last30.getDate() - 30);

    setToDate(today); // 2025-11-13T07:49:00.000Z
    setFromDate(last30); // 2025-10-14T07:49:00.000Z (for example)
  }, []);

  useEffect(() => {
    if (!ratesData) return;

    // 1️⃣ Filter by date range
    const filtered = ratesData.filter((item: any) => {
      const itemDate = new Date(item.RDATE);
      return (
        (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate)
      );
    });

    setFilteredData(filtered);
  }, [fromDate, toDate]); // Runs every time user selects dates

  useEffect(() => {
    const grouped = filteredData.reduce((acc: any, item: any) => {
      const date = new Date(item.RDATE).toLocaleDateString("en-GB");

      if (!acc[date]) {
        acc[date] = {
          date,
          gold916: null,
          silver: null,
        };
      }

      if (item.MAINPRODUCT === "GOLD" && item.PREFIX === "916") {
        acc[date].gold916 = item.RATE;
      }

      if (item.MAINPRODUCT === "SILVER" && item.PREFIX === "SILVER") {
        acc[date].silver = item.RATE;
      }

      return acc;
    }, {});

    // sort by date
    const parseDate = (d: string) => {
      const [day, month, year] = d.split("/").map(Number);
      return new Date(year, month - 1, day);
    };
    const table = Object.values(grouped).sort(
      (a: any, b: any) =>
        parseDate(b.date).getTime() - parseDate(a.date).getTime()
    );

    setFinalTable(table);
  }, [filteredData]);

  return (
    <ScrollView style={{ flex: 1, padding: 18, backgroundColor: "#fafafa" }}>
      {/* <Text
        style={{
          fontSize: 26,
          fontWeight: "700",
          color: "#000",
          marginBottom: 20,
        }}
      >
        Gold & Silver Rates
      </Text> */}

      {/* Date Pickers */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <View style={{ marginBottom: 16, width: "40%" }}>
          <Text style={styles.label}>From Date</Text>
          {/* <View style={{ flexDirection: "column" }}> */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowFromPicker(true)}
          >
            <Text style={{ color: fromDate ? "#000" : "#777" }}>
              {fromDate ? formatDate(fromDate) : "Select From Date"}
            </Text>
            {fromDate ? (
              <TouchableOpacity
                onPress={() => {
                  setFromDate(null);
                }}
              >
                <MaterialIcons name="clear" size={18} color={"#930a0aff"} />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
          {/* </View> */}

          {/* <View style={{ flexDirection: "column" }}> */}
        </View>

        <View style={{ marginBottom: 16, width: "40%" }}>
          <Text style={styles.label}>To Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowToPicker(true)}
          >
            <Text style={{ color: toDate ? "#000" : "#777" }}>
              {toDate ? formatDate(toDate) : "Select To Date"}
            </Text>
            {toDate ? (
              <TouchableOpacity
                onPress={() => {
                  setToDate(null);
                }}
              >
                <MaterialIcons name="clear" size={18} color={"#930a0aff"} />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>

          {showFromPicker && (
            <DateTimePicker
              mode="date"
              value={fromDate || new Date()}
              maximumDate={toDate || new Date()} // from date cannot exceed toDate
              onChange={(e, date) => {
                setShowFromPicker(false);
                if (date) setFromDate(date);
              }}
            />
          )}
          {showToPicker && (
            <DateTimePicker
              mode="date"
              value={toDate || new Date()}
              minimumDate={fromDate || undefined} // to date cannot be less than fromDate
              maximumDate={new Date()} // cannot select future date
              onChange={(e, date) => {
                setShowToPicker(false);
                if (date) setToDate(date);
              }}
            />
          )}
        </View>
      </View>

      {/* Fetch Button */}
      {/* <TouchableOpacity style={styles.primaryBtn} onPress={fetchRates}>
        <Text style={styles.primaryBtnText}>Show Rates</Text>
      </TouchableOpacity> */}

      {/* Loading */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#154D71"
          style={{ marginTop: 20 }}
        />
      )}

      {/* Error */}
      {/* {error && (
        <Text style={{ color: "red", marginTop: 15, fontSize: 15 }}>
          {error}
        </Text>
      )} */}

      {/* Rates List */}
      {finalTable?.length > 0 ? (
        <View>
          {/* TABLE VIEW */}
          <ScrollView horizontal style={{ marginTop: 25 }}>
            <View>
              {/* HEADER */}
              <View style={styles.tableHeader}>
                <Text
                  style={[styles.tableCell, styles.headerCell, { width: 120 }]}
                >
                  Date
                </Text>
                {/* <Text style={[styles.tableCell, styles.headerCell]}>
                  Gold 24K
                </Text> */}
                <Text style={[styles.tableCell, styles.headerCell]}>
                  Gold 22K
                </Text>
                {/* <Text style={[styles.tableCell, styles.headerCell]}>
                  Gold 18K
                </Text> */}
                <Text style={[styles.tableCell, styles.headerCell]}>
                  Silver
                </Text>
              </View>

              {/* BODY */}
              {finalTable.map((item: any, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    { backgroundColor: index % 2 ? "#eee2e2ff" : "#fff" },
                  ]}
                >
                  <Text style={[styles.tableCell, { width: 120 }]}>
                    {item?.date}
                  </Text>
                  {/* <Text style={styles.tableCell}>₹{item.gold24}</Text> */}
                  <Text style={styles.tableCell}>₹{item?.gold916}</Text>
                  {/* <Text style={styles.tableCell}>₹{item.gold18}</Text> */}
                  <Text style={styles.tableCell}>₹{item?.silver}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : !loading ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 30,
            fontSize: 15,
            color: "#777",
          }}
        >
          {/* Select a date range and tap "Show Rates" to view gold & silver prices. */}
          No Data Available in this date range. Please select another
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: "#154D71",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 30,
    borderWidth: 1,
    borderColor: "#154D71",
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  primaryBtn: {
    backgroundColor: "#154D71",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  rateCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  rateDate: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
  },
  rateText: {
    fontSize: 15,
    color: "#444",
    marginVertical: 2,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#154D71",
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  tableCell: {
    width: 100,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    paddingVertical: 4,
    // borderWidth: 0.5,
    borderColor: "#ccc",
  },
});
