import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="AddService"
          options={{
            title: "Service",
            headerTintColor: "#D4A73E",
          }}
        />
        <Stack.Screen
          name="serviceDetail"
          options={{
            title: "Service detail",
            headerTintColor: "#D4A73E",
            headerRight: () => (
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  paddingTop: 10,
                  marginLeft: 40,
                }}
              >
                <Icon size={30} color={"#D4A73E"} source="dots-vertical" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
