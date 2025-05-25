import React, { useEffect, useState } from "react";
import { Image } from "react-native";
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
import { Location } from "../locations/location.model";

const PAGE_SIZE = 20;

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { locations, loading, error } = useSelector(
    (state: RootState) => state.locations
  );

  const [offset, setOffset] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [localLocations, setLocalLocations] = useState<Location[]>([]);

  useEffect(() => {
    loadLocations(0);
  }, []);

  const loadLocations = (newOffset: number) => {
    if (allLoaded) return;
    dispatch(fetchLocations({ limit: PAGE_SIZE, offset: newOffset }))
      .unwrap()
      .then((newLocations) => {
        if (newLocations.length < PAGE_SIZE) {
          setAllLoaded(true);
        }
        if (newOffset === 0) {
          setLocalLocations(newLocations);
        } else {
          setLocalLocations((prev) => [...prev, ...newLocations]);
        }
        setOffset(newOffset + PAGE_SIZE);
      })
      .catch(() => {});
  };

  const handleLoadMore = () => {
    if (!loading && !allLoaded) {
      loadLocations(offset);
    }
  };

  if (loading && offset === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error && offset === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading locations: {error}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 30,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 40,
          marginBottom: 20,
          color: "#34B566",
        }}
      >
        All locations
      </Text>
      <FlatList
        data={localLocations}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginBottom: 16,
              borderRadius: 12,
              overflow: "hidden",
              backgroundColor: "#fff",
              elevation: 3,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
            }}
            onPress={() => router.push(`/location/${item.id}`)}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: "100%", height: 180 }}
              resizeMode="cover"
            />
            <View style={{ padding: 15 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}
              >
                {item.name}
              </Text>
              <Text style={{ fontSize: 14, color: "#666", marginBottom: 2 }}>
                {item.address}
              </Text>
              <Text style={{ fontSize: 14, color: "#666" }}>
                Open Hours: {item.openHours}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
