import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";

const ServiceLayout = () => {
  const headerStyle = {
    headerTitle: "Service",
    headerShown: true,
    headerTitleStyle: {
      color: "white",
    },
    headerStyle: {
      backgroundColor: "#D4A73E",
    },
    headerTintColor: "white",
  };

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-service"
          options={{
            headerTitle: "Service",
            headerShown: true,
            headerTitleStyle: {
              color: "white",
            },
            headerStyle: {
              backgroundColor: "#D4A73E",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="detail"
          options={{
            ...headerStyle,
            headerTitle: "Service Detail",
            headerRight: () => (
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  paddingTop: 10,
                  marginLeft: 40,
                }}
              >
                <Icon size={30} color={"white"} source="dots-vertical" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="update"
          options={{
            ...headerStyle,
            headerTitle: "Service Update",
          }}
        />
        {/* <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerTitle: "Home",
        }}
      /> */}
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
      <StatusBar style="light" />
    </>
  );
};

export default ServiceLayout;

const styles = StyleSheet.create({});
