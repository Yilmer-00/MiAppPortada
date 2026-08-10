import React from "react";
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import StoreScreen from "../screens/StoreScreen";
import DiscountsScreen from "../screens/DiscountsScreen";
import ConfigurationScreen from "../screens/ProfileScreen.jsx";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,

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
        name="Buscar"
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Search size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Favoritos"
        component={DiscountsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Heart size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Carrito"
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ShoppingCart size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ConfigurationScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <User size={22} color={color} />
          ),
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