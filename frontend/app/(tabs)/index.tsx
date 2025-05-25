import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../locations/LocationsSlice";
import { RootState, AppDispatch } from "../store/store";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { locations, loading, error } = useSelector(
    (state: RootState) => state.locations
  );

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading locations: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={locations}
      keyExtractor={(item) => item.id.toString()}
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
