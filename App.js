import React, { useState, useEffect } from "react";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigation from "./src/Navigation/TabNavigation";

import LoadingScreen from "./src/screens/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga inicial (peticiones a API, verificación de token, fuentes, etc.)
    const timer = setTimeout(() => {
      setIsLoading(false); // Oculta la pantalla de carga después de 2.5 segundos
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Si está cargando, mostramos directamente tu componente LoadingScreen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Una vez que termina la carga, renderizamos tu estructura de navegación normal
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
