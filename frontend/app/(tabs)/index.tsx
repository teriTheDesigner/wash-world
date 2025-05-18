import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { router } from "expo-router";

const locations = [
  { id: "1059", name: "Aabenraa - Egevej" },
  { id: "1033", name: "Aalborg - Otto Mønstedsvej" },
];

export default function HomeScreen() {
  return (
    <FlatList
      data={locations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderColor: "#ccc",
          }}
          onPress={() => router.push(`/location/${item.id}`)}
        >
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
