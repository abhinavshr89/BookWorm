import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { API_URL } from "@/constants/api";
import styles from "@/assets/styles/profile.styles";
import ProfileHeader from "@/components/ProfileHeader";
import LogoutButton from "@/components/LogoutButton";

export default function Profile() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { token } = useAuthStore();

  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/books/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch user books");

      setBooks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert(
        "Error",
        "Failed to load profile data. Pull down to refresh."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { logout } = useAuthStore();
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
    </View>
  );
}
