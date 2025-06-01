import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { BASE_URL, Detail, Service, User } from "@/components/interface";
import Styles from "@/components/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServiceDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  //Fetch Service by ID on load
  //
  const [service, setService] = useState<Detail>();
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/services/${id}`);
        const data: Detail = response.data;
        setService(data);
      } catch (error) {
        console.error("Fetch failed", error);
        Alert.alert("Error", "Failed to load service details");
      }
    };

    if (id) fetchService();
  }, [id]);

  async function handleDelete() {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user: User | null = userData ? JSON.parse(userData) : null;

      if (!user?.token) {
        Alert.alert("Error", "No user token found");
        return;
      }

      const response = await axios.delete(`${BASE_URL}/services/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        console.log("Deleted successfully", response.data);
        Alert.alert("Success", "Deleted successfully");
        router.push("/(tabs)");
      } else {
        Alert.alert("delete Failed", "Unexpected server response");
      }
    } catch (error: any) {
      console.error("Delete error:", error?.response?.data || error.message);
      Alert.alert("Delete Failed", "Something went wrong");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.bigtitle}>
        <Text style={styles.title}>Service name : </Text>
        {service?.name}
      </Text>
      <Text style={styles.bigtitle}>
        <Text style={styles.title}>Price : </Text>
        {service?.price}
      </Text>
      <Text style={styles.bigtitle}>
        <Text style={styles.title}>Creator : </Text>
        {service?.user.name}
      </Text>
      <Text style={styles.bigtitle}>
        <Text style={styles.title}>Time: </Text>
        {service?.createdAt}
      </Text>
      <Text style={styles.bigtitle}>
        <Text style={styles.title}>Final update : </Text>
        {service?.updatedAt}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/updateService?id=${id}`)}
        >
          <Text style={styles.title}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
          <Text style={styles.titleDelete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D4A73E",
    borderRadius: 10,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 16,
    marginLeft: 10,
  },
  buttonDelete: {
    backgroundColor: "red",
    fontWeight: "bold",
    borderRadius: 10,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 16,
    marginLeft: 10,
  },
  titleDelete: {
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontWeight: "bold",
  },
  bigtitle: {
    fontSize: 17,
    marginVertical: 5,
  },
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#F7F7EF",
    height: "auto",
    padding: 15,
  },
});
