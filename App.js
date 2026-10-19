import React, { useState, useContext } from "react";
import { View, StyleSheet, Platform } from "react-native";
import "./global.css";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TabNavigation from "./src/Navigation/TabNavigation";
import AuthNavigator from "./src/Navigation/AuthNavigator";
import SellerNavigator from "./src/Navigation/SellerNavigator";
import SplashScreen from './src/components/SplashScreen';

import { AuthProvider, AuthContext } from "./src/context/AuthContext";

// ======================================================
// NAVEGACIÓN SEGÚN EL ROL
// ======================================================
function AppNavigation() {
  const { user } = useContext(AuthContext);

  // Sin sesión: login y registro.
  if (!user) {
    return <AuthNavigator />;
  }

  // Sesión de vendedor.
  if (user.role === "vendedor") {
    return <SellerNavigator />;
  }

  // Sesión de cliente.
  if (user.role === "cliente") {
    return <TabNavigation />;
  }

  // Rol desconocido: volver al flujo de autenticación.
  return <AuthNavigator />;
}

// ======================================================
// APP PRINCIPAL
// ======================================================
export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  // 1. Si la app está cargando, mostramos únicamente el SplashScreen personalizado
  if (isAppLoading) {
    return <SplashScreen onFinishLoading={() => setIsAppLoading(false)} />;
  }

  // 2. Una vez termina, se renderiza toda la estructura normal de la app
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <View style={styles.root}>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: 0,
    width: "100%",
    ...(Platform.OS === "web" ? { minWidth: 0 } : {}),
  },
});