import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import styles from "../assets/styles/profile.styles";
import { useAuthStore } from "@/store/authStore";
import { formatMemberSince } from "@/lib/utils";

const ProfileHeader = () => {
  const { user } = useAuthStore();

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user?.profileImage }} style={styles.profileImage} />
      <View styles={styles.profileInfo}>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.memberSince}>
          🗓️ Joined {formatMemberSince(user?.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;
