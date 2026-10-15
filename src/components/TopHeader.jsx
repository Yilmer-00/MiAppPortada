import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

export default function TopHeader({ title = "Inicio" }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // <-- Adapta dinámicamente el header al notch / cámara de cualquier móvil
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { logout } = useContext(AuthContext);

  return (

    <>
      {/* Encabezado Superior con altura y padding dinámicos para el notch */}
      <View
        style={[
          styles.headerContainer,
          { paddingTop: insets.top, height: 50 + insets.top },
        ]}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.avatarButton}
        >
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>

        {/* Espaciador para equilibrar el título */}
        <View style={{ width: 40 }} />
      </View>

      {/* Panel Desplegable (Estilo Spotify con fondo oscuro restaurado) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <SafeAreaView>
              {/* Botón Cerrar */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>

              {/* Información del Usuario */}
              <TouchableOpacity
                style={styles.profileSection}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("ProfileScreen");
                }}
                activeOpacity={0.7}
              >
                <View style={styles.largeAvatar}>
                  <Ionicons
                    name="person-outline"
                    size={30}
                    color="#FFFFFF"
                  />                </View>
                <View>
                  <Text style={styles.userName}>Yilmer</Text>
                  <Text style={styles.viewProfileText}>Ver perfil</Text>
                </View>
              </TouchableOpacity>

              {/* Lista de Opciones */}
              <View style={styles.menuList}>
                <TouchableOpacity style={styles.menuItem}>
                  <Ionicons
                    name="settings-outline"
                    size={22}
                    color="#D1D5DB"
                  />
                  <Text style={styles.menuText}>
                    Configuración y privacidad
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("Dashboard");
                  }}
                >
                  <Ionicons
                    name="receipt-outline"
                    size={22}
                    color="#D1D5DB"
                  />                  <Text style={styles.menuText}>Mis Pedidos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("RegisterScreen");
                  }}
                >
                  <Ionicons
                    name="sparkles-outline"
                    size={22}
                    color="#D1D5DB"
                  />                  <Text style={styles.menuText}>Lo nuevo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                  <Ionicons
                    name="pricetag-outline"
                    size={22}
                    color="#D1D5DB"
                  />                  <Text style={styles.menuText}>Cupones y Descuentos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                  <Ionicons
                    name="help-circle-outline"
                    size={22}
                    color="#D1D5DB"
                  />
                  <Text style={styles.menuText}>Ayuda y Soporte</Text>
                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.logoutButton}
                  activeOpacity={0.7}
                  onPress={() => setConfirmLogout(true)}
                >
                  <Ionicons
                    name="log-out-outline"
                    size={22}
                    color="#FF5252"
                  />

                  <Text
                    style={[
                      styles.menuText,
                      { color: "#FF5252" },
                    ]}
                  >
                    Cerrar sesión
                  </Text>
                </TouchableOpacity>

              </View>
            </SafeAreaView>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        transparent
        visible={confirmLogout}
        animationType="fade"
        onRequestClose={() => setConfirmLogout(false)}
      >
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmCard}>

            {/* Icono */}
            <View style={styles.confirmIconContainer}>
              <Ionicons
                name="log-out-outline"
                size={30}
                color="#FF5252"
              />
            </View>

            {/* Título */}
            <Text style={styles.confirmTitle}>
              ¿Cerrar sesión?
            </Text>

            {/* Mensaje */}
            <Text style={styles.confirmMessage}>
              ¿Estás seguro de que deseas cerrar tu sesión en Nutrik?
            </Text>

            {/* Botones */}
            <View style={styles.confirmButtons}>

              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.8}
                onPress={() => setConfirmLogout(false)}
              >
                <Text style={styles.cancelButtonText}>
                  No, cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmLogoutButton}
                activeOpacity={0.8}
                onPress={async () => {
                  setConfirmLogout(false);
                  setModalVisible(false);

                  try {
                    await logout();

                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Login" }],
                    });
                  } catch (error) {
                    console.error(
                      "Error al cerrar sesión:",
                      error
                    );
                  }
                }}
              >
                <Ionicons
                  name="log-out-outline"
                  size={17}
                  color="#FFFFFF"
                />

                <Text style={styles.confirmLogoutText}>
                  Sí, salir
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatarButton: {
    padding: 2,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#4CAF50", // Círculo verde recuperado
    alignItems: "center",
    justifyContent: "center",
  },
  avatarIcon: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)", // Oscuridad del fondo del modal recuperada
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#181818",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: "75%",
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingVertical: 10,
  },
  closeText: {
    color: "#fff",
    fontSize: 22,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
    marginBottom: 20,
  },
  largeAvatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  viewProfileText: {
    color: "#aaa",
    fontSize: 13,
  },
  menuList: {
    gap: 22,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  confirmCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#181818",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#303030",
    elevation: 12,
  },

  confirmIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 82, 82, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  confirmTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },

  confirmMessage: {
    color: "#B8B8B8",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 26,
  },

  confirmButtons: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 13,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  confirmLogoutButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 13,
    backgroundColor: "#E53945",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 8,
  },

  confirmLogoutText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
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

});
