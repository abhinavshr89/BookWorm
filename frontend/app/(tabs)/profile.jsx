import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { API_URL } from "@/constants/api";
import styles from "@/assets/styles/profile.styles";
import ProfileHeader from "@/components/ProfileHeader";
import LogoutButton from "@/components/LogoutButton";
import COLORS from "@/constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "expo-image";

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

  const renderRatingStars = (rating) => {
    const stars = Array.from({ length: 5 }, (_, index) => {
      return (
        <Ionicons
          key={index}
          name={index < rating ? "star" : "star-outline"}
          size={16}
          color={index <= rating ? "#f4b400" : COLORS.textSecondary}
        />
      );
    });
    return stars;
  }

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete book");

      Alert.alert("Success", "Book deleted successfully.");
      fetchData();
    } catch (error) {
      console.error("Error deleting book:", error);
      Alert.alert("Error", "Failed to delete book. Please try again.");
    }
  }
  
  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this book?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteBook(id),
        },
      ]
    )};


  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
        <Image source={item.image} style={styles.bookImage}/>
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}> {renderRatingStars(item.rating)}</View>
          <Text style={styles.bookCaption}>{item.caption}</Text>
          <Text style={styles.bookDate}>
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={()=> confirmDelete(item._id)}>
          <Ionicons name="trash-outline" size={24} color={COLORS.textSecondary} />

        </TouchableOpacity>
    </View>
  )
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />

      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations 📚</Text>
        <Text style={styles.booksCount}>{books?.length} books</Text>
      </View>

      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}> 
          <Ionicons name="book-outline" size={24} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>No recommendations yet</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
            <Text style={styles.addButtonText}>Add Your First Book</Text>
          </TouchableOpacity>
          </View>
          

        }
      />
    </View>
  );
}
