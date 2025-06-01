import { User } from "@/components/interface";
import Styles from "@/components/Styles";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen: React.FC = () => {
  const [phone, setPhone] = React.useState("0373007856");
  const [password, setPassword] = React.useState("123");
  const router = useRouter();

  //
  const BASE_URL = "https://kami-backend-5rs0.onrender.com";
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth`, {
        phone,
        password,
      });

      if (response.status === 200) {
        const user: User = response.data;
        await AsyncStorage.setItem("user", JSON.stringify(user));
        console.log("Login successful:", user);
        Alert.alert("Success", "Logged in successfully");
        router.push("/(tabs)");
      } else {
        Alert.alert("Login Failed", "Unexpected server response");
      }
    } catch (error: any) {
      console.error("Login error:", error?.response?.data || error.message);
      Alert.alert("Login Failed", "Invalid credentials");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
        <Text style={Styles.title}>Login</Text>

        <TextInput
          style={Styles.input}
          placeholder="Phone"
          value={phone}
          keyboardType="numeric"
          onChangeText={setPhone}
        />

        <TextInput
          style={Styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={Styles.button} onPress={handleLogin}>
          <Text style={Styles.buttonText as StyleProp<TextStyle>}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
