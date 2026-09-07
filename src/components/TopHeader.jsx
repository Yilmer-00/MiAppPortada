import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // <-- Importar hook
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NewScreen from "../screens/NewScreen";


export default function TopHeader({ title = "Inicio" }) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            {/* Encabezado Superior */}
            <View style={styles.headerContainer}>
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

            {/* Panel Desplegable (Estilo Spotify) */}
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
                            <View style={styles.profileSection}>
                                <View style={styles.largeAvatar}>
                                    <Text style={{ fontSize: 30 }}>👤</Text>
                                </View>
                                <View>
                                    <Text style={styles.userName}>Yilmer</Text>
                                    <Text style={styles.viewProfileText}>Ver perfil</Text>
                                </View>
                            </View>

                            {/* Lista de Opciones */}
                            <View style={styles.menuList}>
                                <TouchableOpacity style={styles.menuItem}>
                                    <Text style={styles.menuIcon}>⚙️</Text>
                                    <Text style={styles.menuText}>Configuración y privacidad</Text>
                                </TouchableOpacity>

                                <TouchableOpacity                                     style={styles.menuItem}
                                    onPress={() => {
                                        setModalVisible(false);
                                        navigation.navigate("Dashboard");
                                    }}
                                >
                                    <Text style={styles.menuIcon}>📦</Text>
                                    <Text style={styles.menuText}>Mis Pedidos</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => {
                                        setModalVisible(false);
                                        navigation.navigate("NewScreen");
                                    }}
                                >
                                    <Text style={styles.menuIcon}>✨</Text>
                                    <Text style={styles.menuText}>Lo nuevo</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.menuItem}>
                                    <Text style={styles.menuIcon}>🏷️</Text>
                                    <Text style={styles.menuText}>Cupones y Descuentos</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.menuItem}>
                                    <Text style={styles.menuIcon}>ℹ️</Text>
                                    <Text style={styles.menuText}>Ayuda y Soporte</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.menuItem}>
                                    <Text style={styles.menuIcon}>🚪</Text>
                                    <Text style={[styles.menuText, { color: "#ff5252" }]}>
                                        Cerrar sesión
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
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
        backgroundColor: "#4CAF50",
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
        backgroundColor: "rgba(0,0,0,0.6)",
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
});