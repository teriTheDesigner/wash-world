import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.user);

  if (!token || !user) {
    return <Redirect href="/login" />;
  }

  return (
    <View testID="tab-layout-root">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="insights"
          options={
            user.role === "admin"
              ? {
                  title: "Insights",
                  tabBarButton: HapticTab,
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="bar-chart" size={24} color={color} />
                  ),
                }
              : {
                  tabBarButton: () => null,
                  title: "",
                  tabBarLabel: () => null,
                  tabBarIcon: () => null,
                }
          }
        />
      </Tabs>
    </View>
  );
}
