import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

export default function CustomDrawerContent(props) {
  const { navigation } = props;
  const { logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {/* PARTE SUPERIOR: Logo y Nombre centrados */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/nutrick.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}></Text>
      </View>

      {/* ELEMENTOS PRINCIPALES DEL MENÚ (Arriba de la línea) */}
      <View style={styles.menuItemsContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* LÍNEA DIVISORIA */}
      <View style={styles.divider} />

      {/* SECCIÓN INFERIOR: Notificaciones, Configuración, Soporte y Cerrar Sesión */}
      <View style={styles.footerContainer}>
        {/* Botón de Notificaciones */}
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("NotificacionesScreen")}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#333333"
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Notificaciones</Text>
        </TouchableOpacity>

        {/* Botón de Configuración */}
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("Configuración")}
        >
          <Ionicons
            name="settings-outline"
            size={22}
            color="#333333"
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Configuración</Text>
        </TouchableOpacity>

        {/* Botón de Soporte */}
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            console.log("Navegar a Soporte");
          }}
        >
          <Ionicons
            name="help-circle-outline"
            size={22}
            color="#333333"
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Soporte</Text>
        </TouchableOpacity>

        {/* Botón de Cerrar Sesión (Redirige al login) */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#d9534f"
            style={styles.footerIcon}
          />
          <Text style={[styles.footerText, { color: "#d9534f" }]}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#137333",
  },
  menuItemsContainer: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 15,
    marginHorizontal: 20,
  },
  footerContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginVertical: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "#ee080811",
    borderWidth: 1,
    borderColor: "#d9544f8a",
  },
  footerIcon: {
    marginRight: 15,
  },
  footerText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
  },
});
