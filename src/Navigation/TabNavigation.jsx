import React from "react";
import { Home, Search, ShoppingCart, User, FileText } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import StoreScreen from "../screens/StoreScreen";
import CarScreen from "../screens/CarScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NewScreen from "../screens/NewScreen";
import Dashboard from "../screens/Dashboard/Dashboard";
import FacturasStack from "./FacturasStack";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Home size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tienda"
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Search size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Facturas"
        component={FacturasStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FileText size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={CarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ShoppingCart size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <User size={22} color={color} />
          ),
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
    height: 80,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
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
    paddingBottom: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});