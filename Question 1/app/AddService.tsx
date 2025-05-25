import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "@/components/Styles";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import { Label } from "@react-navigation/elements";

const AddService = () => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");
  const [errorNumber, setErrorNumber] = useState("");
  const [errorText, setErrorText] = useState("");
  const handleAdd = () => {
    //service name
    if (!text.trim()) {
      setErrorText("Please input a service name");
    } else {
      setErrorText(""); // reset lỗi khi nhập đúng
      console.log("Successfully", text);
      // Reset lại form
      onChangeText("");
    }
    //price
    if (!number.trim()) {
      setErrorNumber("Please input price");
    } else {
      setErrorNumber(""); // reset lỗi khi nhập đúng
      console.log("Successfully", number);
      // Reset lại form
      onChangeNumber("");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service name *</Text>
      <TextInput
        style={Styles.input}
        placeholder="Input a service name"
        secureTextEntry
        onChangeText={onChangeText}
        value={text}
      />
      {/* hiện lỗi */}
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
      <Text style={styles.label}>Price *</Text>
      <TextInput
        style={Styles.input}
        placeholder="0"
        value={number}
        keyboardType="numeric"
        onChangeText={onChangeNumber}
      />
      {/* hiện lỗi */}
      {errorNumber ? (
        <Text style={styles.errorNumber}>{errorNumber}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={Styles.buttonText as StyleProp<TextStyle>}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddService;

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
