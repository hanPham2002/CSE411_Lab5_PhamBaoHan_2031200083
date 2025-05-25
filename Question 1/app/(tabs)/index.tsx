import ServiceCard from "@/components/ServiceCard";
import Styles from "@/components/Styles";
import { Button } from "@react-navigation/elements";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  Image,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { Service } from "@/components/interface";

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    try {
      axios
        .get("https://kami-backend-5rs0.onrender.com/services")
        .then((res) => {
          setServices(res.data);
        });
    } catch (error: any) {
      console.log(error.message);
      // Alert.alert(error.message);
    }
  }, []);
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#D4A73E",
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: "#ECE1BC",
            fontSize: 25,
            paddingVertical: 20,
            height: 70,
          }}
        >
          Huyen Trinh
        </Text>
        <TouchableOpacity onPress={() => console.log("Pressed!")}>
          <Image
            style={{ width: 30, height: 30 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 30,
          marginRight: 40,
        }}
      >
        <Image
          style={{
            width: 250, // nhỏ hơn
            height: 100,
          }}
          source={{
            uri: "https://thietkespaminidep.com/wp-content/uploads/2020/12/thiet-ke-lo-go-spa-dep.png",
          }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontWeight: "bold",
            marginHorizontal: 10,
            marginVertical: 30,
            fontSize: 19,
            color: "#D4A73E",
            textShadowColor: "rgba(0, 0, 0, 0.5)",
            textShadowOffset: { width: 0.5, height: 0.5 },
            textShadowRadius: 0.5,
          }}
        >
          Danh sách dịch vụ
        </Text>

        <IconButton
          icon="plus"
          iconColor="#D4A73E"
          size={20}
          onPress={() => {
            router.push("/AddService");
          }}
          style={{
            marginTop: 25,
            marginRight: 30,
            backgroundColor: "#ECE1BC",
            borderRadius: 20,
            height: 30,
            width: 30,
          }}
        />
      </View>

      {/* <ServiceCard /> */}
      <View>
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <ServiceCard name={item.name} price={item.price} _id={item._id} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
