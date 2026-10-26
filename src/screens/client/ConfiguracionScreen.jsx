import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  ChevronLeft, 
  User, 
  Bell, 
  Lock, 
  Moon, 
  Globe, 
  ShieldCheck, 
  ChevronRight 
} from "lucide-react-native";

export default function ConfiguracionScreen() {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Estilos dinámicos que cambian según el estado del Modo Oscuro
  const themeStyles = {
    container: {
      backgroundColor: darkModeEnabled ? "#0F172A" : "#F8FAFC",
    },
    header: {
      backgroundColor: darkModeEnabled ? "#1E293B" : "#FFFFFF",
      borderBottomColor: darkModeEnabled ? "#334155" : "#F1F5F9",
    },
    headerTitle: {
      color: darkModeEnabled ? "#FFFFFF" : "#0F172A",
    },
    backIcon: darkModeEnabled ? "#FFFFFF" : "#0F172A",
    sectionHeader: {
      color: darkModeEnabled ? "#94A3B8" : "#64748B",
    },
    sectionCard: {
      backgroundColor: darkModeEnabled ? "#1E293B" : "#FFFFFF",
    },
    rowText: {
      color: darkModeEnabled ? "#FFFFFF" : "#0F172A",
    },
    rowSubText: {
      color: darkModeEnabled ? "#94A3B8" : "#94A3B8",
    },
    divider: {
      backgroundColor: darkModeEnabled ? "#334155" : "#F1F5F9",
    },
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]} edges={["top", "bottom"]}>
      {/* Cabecera */}
      <View style={[styles.header, themeStyles.header]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color={themeStyles.backIcon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, themeStyles.headerTitle]}>Configuración y Privacidad</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Sección: Cuenta */}
        <Text style={[styles.sectionHeader, themeStyles.sectionHeader]}>Cuenta</Text>
        <View style={[styles.sectionCard, themeStyles.sectionCard]}>
          <TouchableOpacity 
            style={styles.rowItem} 
            onPress={() => navigation.navigate("EditProfile")}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <User size={20} color="#15803D" />
              <Text style={[styles.rowText, themeStyles.rowText]}>Información personal</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={[styles.divider, themeStyles.divider]} />

          <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <Lock size={20} color="#15803D" />
              <Text style={[styles.rowText, themeStyles.rowText]}>Cambiar contraseña</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Sección: Preferencias */}
        <Text style={[styles.sectionHeader, themeStyles.sectionHeader]}>Preferencias</Text>
        <View style={[styles.sectionCard, themeStyles.sectionCard]}>
          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Bell size={20} color="#15803D" />
              <Text style={[styles.rowText, themeStyles.rowText]}>Notificaciones Push</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#CBD5E1", true: "#86EFAC" }}
              thumbColor={notificationsEnabled ? "#15803D" : "#F1F5F9"}
            />
          </View>

          <View style={[styles.divider, themeStyles.divider]} />

          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Moon size={20} color="#15803D" />
              <Text style={[styles.rowText, themeStyles.rowText]}>Modo Oscuro</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#CBD5E1", true: "#86EFAC" }}
              thumbColor={darkModeEnabled ? "#15803D" : "#F1F5F9"}
            />
          </View>

          <View style={[styles.divider, themeStyles.divider]} />

          <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <Globe size={20} color="#15803D" />
              <Text style={[styles.rowText, themeStyles.rowText]}>Idioma</Text>
            </View>
            <Text style={[styles.rowSubText, themeStyles.rowSubText]}>Español</Text>
          </TouchableOpacity>
        </View>

        {/* Sección: Seguridad y Legal */}
        <Text style={[styles.sectionHeader, themeStyles.sectionHeader]}>Seguridad</Text>
        <View style={[styles.sectionCard, themeStyles.sectionCard]}>
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <ShieldCheck size={20} color="#15803D" />
              <Text style={[styles.rowText, themeStyles.rowText]}>Política de Privacidad</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
  },
  backButton: {
    padding: 4,
  },
  scrollContent: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionCard: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowText: {
    fontSize: 15,
    fontWeight: "600",
  },
  rowSubText: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
  },
});