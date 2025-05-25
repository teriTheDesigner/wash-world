import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const data = {
  totalLocations: 72,
  totalServiceUnits: 133,
  serviceUnitTypes: {
    vacuum: 13,
    self_wash: 25,
    mat_cleaner: 17,
    pre_wash: 6,
    hall: 72,
  },
};

function SummaryCard({
  iconName,
  label,
  count,
}: {
  iconName: string;
  label: string;
  count: number;
}) {
  return (
    <View style={styles.card}>
      <MaterialIcons name={iconName} size={40} color="#34B566" />
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default function AdminStatsScreen() {
  const labels = Object.keys(data.serviceUnitTypes);
  const counts = Object.values(data.serviceUnitTypes);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.summaryContainer}>
        <SummaryCard
          iconName="location-on"
          label="Locations"
          count={data.totalLocations}
        />
        <SummaryCard
          iconName="build"
          label="Service Units"
          count={data.totalServiceUnits}
        />
        <SummaryCard
          iconName="category"
          label="Unit Types"
          count={labels.length}
        />
      </View>

      <Text style={styles.chartTitle}>Service Units Breakdown</Text>

      <BarChart
        data={{
          labels,
          datasets: [{ data: counts }],
        }}
        width={screenWidth - 40}
        height={240}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(52, 181, 102, ${opacity})`,
          labelColor: () => "#333",
          style: { borderRadius: 8 },
        }}
        verticalLabelRotation={30}
        style={styles.chart}
      />
      <Text style={styles.chartTitle}>Service Units Distribution</Text>
      <PieChart
        data={labels.map((label, index) => ({
          name: label,
          population: counts[index],
          color: ["#34B566", "#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9"][index],
          legendFontColor: "#333",
          legendFontSize: 14,
        }))}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: "#f7f9fa",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: "#C8E6C9",
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 2,
  },
  count: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2e7d32",
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: "#2e7d32",
    marginTop: 4,
    textAlign: "center",
    fontWeight: "bold",
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 20,
  },
  chart: {
    borderRadius: 8,
    marginBottom: 30,
  },
});
