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

// ==========================================
// PANTALLAS / AUTH
// ==========================================
// import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import LoadingScreen from "../screens/auth/LoadingScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// ==========================================
// PANTALLAS / CLIENT
// ==========================================
import StoreScreen from "../screens/client/StoreScreen";
import CarScreen from "../screens/client/CarScreen";
import PreferencesScreen from "../screens/client/profile/PreferencesScreen";
import PaymentMethodsScreen from "../screens/client/profile/PaymentMethodsScreen";
import OrdersScreen from "../screens/client/profile/OrdersScreen";
import SubscriptionsScreen from "../screens/client/profile/SubscriptionsScreen";
import HomeScreen from "../screens/client/HomeScreen";                 // Ruta corregida
import AddressesScreen from "../screens/client/AddressesScreen";         // Faltaba
import EditProfile from "../screens/client/EditProfile";           // Ruta corregida (está en client)
import FacturaDetalleScreen from "../screens/client/FacturaDetalleScreen"; // Faltaba
import Facturasscreen from "../screens/client/FacturasScreen";           // Faltaba
import ProfileScreen from "../screens/client/ProfileScreen";             // Faltaba

// ==========================================
// PANTALLAS / SELLER
// ==========================================
import Dashboard from "../screens/seller/Dashboard";
import NewScreen from "../screens/seller/NewScreen";                     // Ruta corregida
// import EditProductScreen from "../screens/seller/EditProductScreen";     // Faltaba
// import OrdersScreen from "../screens/seller/OrdersScreen";               // Faltaba
// import ProductsScreen from "../screens/seller/ProductsScreen";           // Faltaba

// ==========================================
// NAVEGACIÓN Y COMPONENTES COMPARTIDOS
// ==========================================
import FacturasStack from "./FacturasStack";
// import SharedLoadingScreeno from "../screens/shared/LoadingScreen";



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
        name="LoadingScreen"
        component={LoadingScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />

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
        name="PreferencesScreen"
        component={PreferencesScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="PaymentMethodsScreen"
        component={PaymentMethodsScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="SubscriptionsScreen"
        component={SubscriptionsScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="AddressesScreen"
        component={AddressesScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="FacturaDetalleScreen"
        component={FacturaDetalleScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Facturasscreen"
        component={Facturasscreen}
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
