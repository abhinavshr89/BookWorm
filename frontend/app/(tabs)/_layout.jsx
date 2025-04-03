import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:COLORS.primary,
        headerTitleStyle:{
          color:COLORS.textPrimary,
          fontWeight:"600"
        },
        headerShadowVisible:false,
        tabBarStyle:{
          backgroundColor:COLORS.cardBackground,
          borderTopWidth:1,
          borderTopColor:COLORS.border,
          paddingTop:5,
          height:60 + insets.bottom,
          paddingBottom:insets.bottom,
        },
      }}
    >
      <Tabs.Screen name="index" 
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="create" 
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="profile" 
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
