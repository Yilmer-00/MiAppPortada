import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SellerHeader({ title }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleOpenDrawer = () => {
    try {
      navigation.dispatch(DrawerActions.openDrawer());
    } catch (error) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-white px-4 py-3 border-b border-gray-100 shadow-sm flex-row items-center justify-between"
    >
      {/* 🍔 Izquierda: Botón de Menú (Ancho fijo simétrico w-24) */}
      <View className="w-24 flex-row items-center justify-start">
        <TouchableOpacity
          onPress={handleOpenDrawer}
          className="p-2 rounded-full active:bg-gray-100 items-center justify-center"
        >
          <Ionicons name="menu" size={24} color="#0e1420" />
        </TouchableOpacity>
      </View>

      {/* 📌 Centro: Título de la pantalla actual (True Centered) */}
      <View className="flex-1 items-center justify-center px-1">
        <Text
          className="text-base font-bold text-gray-900 text-center"
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* 🔔👤 Derecha: Notificaciones y Perfil (Ancho fijo simétrico w-24) */}
      <View className="w-24 flex-row items-center justify-end gap-2">
        {/* Botón de Notificaciones con Badge */}
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificacionesScreen")}
          className="p-2 rounded-full active:bg-gray-100 relative items-center justify-center"
        >
          <Ionicons name="notifications-outline" size={22} color="#111827" />
          <View className="absolute top-1.5 right-1.5 bg-red-500 w-4 h-4 rounded-full justify-center items-center border border-white">
            <Text className="text-[9px] font-bold text-white">1</Text>
          </View>
        </TouchableOpacity>

        {/* Botón de Perfil del Vendedor (Avatar) */}
        <TouchableOpacity
          onPress={() => navigation.navigate("SellerProfile")}
          className="active:opacity-85 items-center justify-center"
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
            }}
            className="w-8 h-8 rounded-full bg-gray-200 border border-emerald-600"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}