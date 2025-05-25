import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { LocationsAPI } from "../locations/LocationsAPI";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Location } from "../locations/location.model";
import { Ionicons } from "@expo/vector-icons";

export default function LocationDetails() {
  const { id } = useLocalSearchParams();
  const token = useSelector((state: RootState) => state.auth.token);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatLabel = (text: string) => {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    if (id && typeof id === "string" && token) {
      LocationsAPI.getLocationById(id, token)
        .then((data) => {
          setLocation(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, token]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !location) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: location.imageUrl }} style={styles.image} />

      <View style={styles.infoCard}>
        <Text style={styles.name}>{location.name}</Text>
        <View style={styles.addressRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color="#555"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.address}>{location.address}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={16}
            color="#555"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.hours}>Open Hours: {location.openHours}</Text>
        </View>

        {location.message && (
          <Text style={styles.message}>Note: {location.message}</Text>
        )}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.toLocationButton}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            Navigate to location
          </Text>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.becomeMemberButton}
        >
          <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>
            Become a member
          </Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          What you'll find at {location.name}
        </Text>
        <View style={styles.infoRow}>
          <View style={styles.bullet} />
          <Text style={styles.infoText}>Max Height: {location.maxHeight}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.bullet} />
          <Text style={styles.infoText}>
            Wheel Width: {location.wheelWidth}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.bullet} />
          <Text style={styles.infoText}>
            Mirror Length: {location.mirrorLength}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Units</Text>
        {location.serviceUnits.length === 0 ? (
          <Text>No service units available.</Text>
        ) : (
          <View style={styles.unitGrid}>
            {location.serviceUnits.map((unit) => (
              <View key={unit.id} style={styles.unitBox}>
                <Text style={styles.unitCount}>{unit.totalCount}</Text>
                <Text style={styles.unitLabel}>{formatLabel(unit.type)}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "column",
    gap: 4,
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  toLocationButton: {
    backgroundColor: "#34B566",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  becomeMemberButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    color: "black",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  page: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  hours: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#cc0000",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    flexDirection: "column",
    display: "flex",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },

  unitGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 10,
  },

  unitBox: {
    backgroundColor: "#e8f5e9",
    width: "48%",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    display: "flex",
    flexDirection: "column",
    gap: 15,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  unitCount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2e7d32",
  },

  unitLabel: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#444",
  },

  unit: {
    marginBottom: 12,
  },
  unitTitle: {
    fontWeight: "bold",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  bullet: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#34B566",
    marginRight: 10,
  },

  infoText: {
    fontSize: 16,
    color: "#333",
  },
});
