import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";

interface ServiceCardProps {
  _id: string;
  name: string;
  price: number;
}

const ServiceCard = ({ _id, name, price }: ServiceCardProps) => {
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
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 7,
        padding: 20,
        marginHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 390,
        height: 60,
      }}
      onPress={() => {
        router.push("/serviceDetail");
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontWeight: "500", fontSize: 16 }}
        >
          {name}
        </Text>
      </View>
      <Text
        style={{
          color: "#555",
          marginLeft: 10,
          flexShrink: 0, // flexShrink: 0 cho giá	Đảm bảo giá không bị thu nhỏ hoặc tràn dòng
        }}
      >
        {toVND(price)}
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({});
