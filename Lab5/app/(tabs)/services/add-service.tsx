import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddingService = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  async function handleAddService() {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const { token } = JSON.parse(userString);

        const response = await axios.post(
          "https://kami-backend-5rs0.onrender.com/services",
          {
            name,
            price,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Succesfully add service");
        router.push("/services");
      } else {
        Alert.alert(
          "Permission Denied : You must be authenticated to proceed this action"
        );
      }
    } catch (error: any) {
      Alert.alert("Errror : " + error.message);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adding Service</Text>
      <View style={{ width: "100%", marginBottom: 15 }}>
        <Text>Service name*</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Service name..."
          style={styles.input}
        />
      </View>
      <View style={{ width: "100%" }}>
        <Text>Service price</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="price ...."
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleAddService} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddingService;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D4A73E",
    marginBottom: 24,
    marginTop: 72,
  },
  input: {
    borderColor: "#D4A73E",
    borderWidth: 1,
    width: "100%",
    marginTop: 12,
    borderRadius: 10,
    paddingLeft: 12,
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
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
