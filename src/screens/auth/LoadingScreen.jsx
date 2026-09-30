import React from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      {/* Contenedor para el logo */}
      <View style={styles.logoContainer}>
        <Image
          // IMPORTANTE: Asegúrate de que la ruta a tu logo sea correcta.
          // Si tu logo está en /assets/logo.png, la ruta relativa desde /src/screens es:
          source={require("../../../assets/nutrick.png")}
          style={styles.logo}
          // 'contain' asegura que el logo no se corte y se ajuste al espacio:
          resizeMode="contain"
        />
      </View>

      {/* Indicador de carga debajo del logo */}
      <ActivityIndicator size="large" color="#087905" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 1. CAMBIO: Color de fondo que se adapta (puedes cambiar este código hex):
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    // 2. CAMBIO: Define un tamaño para el área donde irá el logo:
    width: 200,
    height: 200,
    marginBottom: 40, // Espacio entre el logo y el spinner
    justifyContent: "center",
    alignItems: "center",
    // Puedes agregar un borde o sombra aquí si lo deseas:
    // borderWidth: 1,
    // borderColor: 'white',
  },
  logo: {
    // 3. CAMBIO: El logo ocupa todo el espacio de su contenedor
    width: "100%",
    height: "100%",
  },
  loader: {
    // Ajuste opcional para el spinner
  },
});
