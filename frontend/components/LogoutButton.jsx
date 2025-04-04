import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/store/authStore';
import styles from "@/assets/styles/profile.styles";
import {Ionicons} from 'react-native-vector-icons';

export default function LogoutButton() {
    const{logout} = useAuthStore();

    const confirmLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Logout",
                onPress: () => logout(),
            },
        ]);
    }


  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={24} color="white" />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  )
}