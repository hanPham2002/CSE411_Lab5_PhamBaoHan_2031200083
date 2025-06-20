import { User } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  const [phone, setPhone] = useState("0373007856");
  const [password, setPassword] = useState("123");
  const router = useRouter();
  async function handleLogin() {
    try {
      const res = await axios.post(
        "https://kami-backend-5rs0.onrender.com/auth",
        {
          phone,
          password,
        }
      );
      if (res.status === 200) {
        Alert.alert("Susccessfully login");
        await saveUserAndToken(res.data);
        router.push("(tabs)/services");
      } else {
        Alert.alert("Unsucessfully login");
      }
    } catch (error: any) {
      Alert.alert("Unsucessfully login with error : " + error.message);
    }
  }
  async function saveUserAndToken(user: User) {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        style={styles.input}
      />
      <TextInput
        textContentType="password"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 48,
  },
  title: {
    fontSize: 48,
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
