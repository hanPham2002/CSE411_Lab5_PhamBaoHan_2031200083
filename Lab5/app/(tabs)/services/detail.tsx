import { Service } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ServiceResponse extends Service {
  user: {
    name: string;
  };
}

const ServiceDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [service, setService] = useState<ServiceResponse>();
  const toVND = (value: number) => {
    const formatted = new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replace("₫", "")
      .trim();
    return formatted.replace("VND", "đ");
  };
  useEffect(() => {
    axios
      .get("https://kami-backend-5rs0.onrender.com/services/" + id)
      .then((res) => setService(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  async function handleDeleteService(id: string | undefined) {
    if (!id) {
      return;
    }
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const { token } = JSON.parse(userString);
        const response = await axios.delete(
          "https://kami-backend-5rs0.onrender.com/services/" + id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Successfullt delete service");
        router.push("/services");
      }
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("Error with delete service " + error.message);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Service name:</Text>{" "}
          {service?.name || "Chăm sóc da và dưỡng ẩm tự nhiên"}
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Price:</Text>
          {toVND(service?.price || 0)}
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Creator:</Text>
          {service?.user.name}
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Time:</Text>
          {new Date(service?.createdAt || "").toLocaleString()}
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Final Update:</Text>
          {new Date(service?.updatedAt || "").toLocaleString()}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 15,
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push(`/services/update?id=${service?._id}`)}
          style={{
            backgroundColor: "green",
            width: "30%",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white" }}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteService(service?._id)}
          style={{
            backgroundColor: "red",
            width: "30%",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
