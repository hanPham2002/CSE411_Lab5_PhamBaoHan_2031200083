import {
  Alert,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "@/components/Styles";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import { Label } from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Detail, User } from "@/components/interface";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";

const UpdateService = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  //validate
  // const [errorNumber, setErrorNumber] = useState("");
  // const [errorText, setErrorText] = useState("");
  // const handleAdd = () => {
  //   //service name
  //   if (!text.trim()) {
  //     setErrorText("Please input a service name");
  //   } else {
  //     setErrorText(""); // reset lỗi khi nhập đúng
  //     console.log("Successfully", text);
  //     // Reset lại form
  //     onChangeText("");
  //   }
  //   //price
  //   if (!number.trim()) {
  //     setErrorNumber("Please input price");
  //   } else {
  //     setErrorNumber(""); // reset lỗi khi nhập đúng
  //     console.log("Successfully", number);
  //     // Reset lại form
  //     onChangeNumber("");
  //   }
  // };
  const { id } = useLocalSearchParams<{ id: string }>();
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/services/${id}`);
        const data: Detail = response.data;
        setName(data.name);
        setPrice(data.price.toString());
      } catch (error) {
        console.error("Fetch failed", error);
        Alert.alert("Error", "Failed to load service details");
      }
    };

    if (id) fetchService();
  }, [id]);

  const BASE_URL = "https://kami-backend-5rs0.onrender.com";
  const handleUpdateService = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user: User | null = userData ? JSON.parse(userData) : null;

      if (!user?.token) {
        Alert.alert("Error", "No user token found");
        return;
      }

      const response = await axios.put(
        `${BASE_URL}/services/${id}`,
        {
          name,
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Service updated:", response.data);
        Alert.alert("Success", "Service updated");
        router.push("/(tabs)")
      } else {
        Alert.alert("Update Failed", "Unexpected server response");
      }
    } catch (error: any) {
      console.error("Update error:", error?.response?.data || error.message);
      Alert.alert("Update Failed", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service name *</Text>
      <TextInput
        style={Styles.input}
        placeholder="Input a service name"
        onChangeText={setName}
        value={name}
      />
      {/* hiện lỗi */}
      {/* {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null} */}
      <Text style={styles.label}>Price *</Text>
      <TextInput
        style={Styles.input}
        placeholder="0"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      {/* hiện lỗi */}
      {/* {errorNumber ? (
        <Text style={styles.errorNumber}>{errorNumber}</Text>
      ) : null} */}

      <TouchableOpacity style={styles.button} onPress={handleUpdateService}>
        <Text style={Styles.buttonText as StyleProp<TextStyle>}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateService;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  errorNumber: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#D4A73E",
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 16,
  },
});
