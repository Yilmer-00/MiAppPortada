import React, { useState, useEffect, useContext } from "react";

import "./global.css";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TabNavigation from "./src/Navigation/TabNavigation";
import AuthNavigator from "./src/Navigation/AuthNavigator";

import LoadingScreen from "./src/screens/auth/LoadingScreen";

import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import SellerNavigator from "./src/Navigation/SellerNavigator";

// ==========================================
// NAVEGACIÓN SEGÚN EL ROL
// ==========================================

function AppNavigation() {
  // Extraemos 'user' del contexto (no isLoading)
  const { user } = useContext(AuthContext);

  // Si no hay usuario autenticado, mostramos las pantallas de autenticación (Login/Registro)
  if (!user) {
    return <AuthNavigator />;
  }

  // Usuario vendedor
  if (user.role === "vendedor") {
    return <SellerNavigator />;
  }

  // Usuario cliente
  if (user.role === "cliente") {
    return <TabNavigation />;
  }

  // Por seguridad si el rol no coincide
  return <AuthNavigator />;
}


// ==========================================
// APP PRINCIPAL
// ==========================================

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga inicial de 2.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      {/* 1. AuthProvider envuelve absolutamente todo para que el contexto esté disponible siempre */}
      <AuthProvider>
        <NavigationContainer>
          {/* 2. Si está cargando mostramos el LoadingScreen, si no, pasamos a la navegación con roles */}
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <AppNavigation />
          )}
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}