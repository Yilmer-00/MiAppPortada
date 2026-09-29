import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // <-- Importante para los botones de navegación
import {
  Home,
  Search,
  ShoppingCart,
  User,
  FileText,
  Store,
} from "lucide-react-native";

// Pantallas
import HomeScreen from "../screens/HomeScreen";
import StoreScreen from "../screens/StoreScreen";
import CarScreen from "../screens/CarScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfile from "../screens/EditProfile";
import NewScreen from "../screens/NewScreen";
import Dashboard from "../screens/Dashboard/Dashboard";
import FacturasStack from "./FacturasStack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabNavigation() {
  const insets = useSafeAreaInsets(); // <-- Detecta el espacio inferior de la barra de navegación del móvil

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#888",
        // Estilos combinados: mantenemos el diseño y sumamos el espacio seguro inferior
        tabBarStyle: [
          styles.tabBar,
          {
            height: 65 + (insets.bottom > 0 ? insets.bottom : 10),
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          },
        ],
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />

      <Tab.Screen
        name="Tienda"
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color }) => <Store size={22} color={color} />,
        }}
      />

      <Tab.Screen
        name="Buscar"
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color }) => <Search size={22} color={color} />,
        }}
      />

      <Tab.Screen
        name="Carrito"
        component={CarScreen}
        options={{
          tabBarIcon: ({ color }) => <ShoppingCart size={22} color={color} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />

      {/* Rutas ocultas en la barra de navegación */}
      <Tab.Screen
        name="FacturasStack"
        component={FacturasStack}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="NewScreen"
        component={NewScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});
