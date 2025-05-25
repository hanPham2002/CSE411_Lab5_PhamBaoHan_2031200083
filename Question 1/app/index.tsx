import Styles from "@/components/Styles";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen: React.FC = () => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");
  const router = useRouter();
  function handleLogin() {
    router.navigate("/(tabs)");
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
        <Text style={Styles.title}>Login</Text>

        <TextInput
          style={Styles.input}
          placeholder="Phone"
          value={number}
          keyboardType="numeric"
          onChangeText={onChangeNumber}
        />

        <TextInput
          style={Styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={onChangeText}
          value={text}
        />

        <TouchableOpacity style={Styles.button} onPress={handleLogin}>
          <Text style={Styles.buttonText as StyleProp<TextStyle>}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
