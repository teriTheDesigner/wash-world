import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store"; // Adjust path as needed
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
        My Profile
      </Text>
      {user.image ? (
        <Image source={{ uri: user.image }} style={styles.avatar} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="person" size={80} color="white" />
        </View>
      )}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user.name || ""}</Text>
        </View>
        <View>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email || ""}</Text>
        </View>{" "}
        <View>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>{user.role || ""}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteProfileButton}>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>
            Delete Profile
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    gap: 30,
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    padding: 40,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,

    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  placeholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "column",
    gap: 4,
    width: "100%",
    marginTop: 20,
  },
  editProfileButton: {
    backgroundColor: "#34B566",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    color: "white",
  },
  deleteProfileButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
    color: "black",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
