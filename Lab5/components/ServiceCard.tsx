import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ServiceCardProps {
  _id: string;
  name: string;
  price: number;
}
const ServiceCard = ({ name, price, _id }: ServiceCardProps) => {
  const router = useRouter();
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
      style={styles.container}
      onPress={() => router.push(`/services/detail?id=${_id}`)}
    >
      <View>
        <Text
          style={{ width: "100%", fontSize: 14, fontWeight: "bold" }}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {name || "Chăm sóc da mặt  và  dưỡng ẩm tự nhiên"}
        </Text>
      </View>
      <View>
        <Text style={{ marginLeft: 2 }}> {toVND(price) || "250000"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    // flexShrink: 10,
    justifyContent: "space-between",
  },
});
