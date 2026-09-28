import React from "react";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigation from "./src/Navigation/TabNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
