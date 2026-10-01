import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen({ setModalVisible }) {
  const navigation = useNavigation();

  const menuGroups = [
    {
      title: "Mi Cuenta",
      items: [
        {
          id: "1",
          title: "Información Personal",
          icon: "👤",
          subtitle: "Yilmer Melenge",
          route: "EditProfile",
        },
        {
          id: "2",
          title: "Direcciones de Entrega",
          icon: "📍",
          subtitle: "Casa, Gimnasio",
          route: "Addresses",
        }, // (Opcional, si creas la pantalla)
        {
          id: "3",
          title: "Métodos de Pago",
          icon: "💳",
          subtitle: "Visa terminada en 4210",
          route: "PaymentMethodsScreen",
        },
      ],
    },
    {
      title: "Nutrik & Compras",
      items: [
        // Corrección aquí: usa el nombre de la pantalla en lugar de la ruta de archivo
        {
          id: "4",
          title: "Mis Pedidos",
          icon: "📦",
          badge: "1 activo",
          route: "Dashboard",
          route: "OrdersScreen",
        },
        {
          id: "5",
          title: "Preferencias de Dieta",
          icon: "🥗",
          subtitle: "Keto • Orgánico",
          route: "PreferencesScreen",
        },
        {
          id: "6",
          title: "Auto-recompra / Suscripciones",
          icon: "🔄",
          subtitle: "Proteína mensual (Activa)",
          route: "SubscriptionsScreen",
        },
      ],
    },
    {
      title: "Soporte",
      items: [
        { id: "7", title: "Notificaciones", icon: "🔔" },
        { id: "8", title: "Centro de Ayuda / Chat", icon: "💬" },
      ],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 pt-12 px-5">
      {/* Encabezado */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity className="w-10 h-10 rounded-full bg-white shadow-xs border border-gray-100 items-center justify-center">
          <Text className="text-gray-700 text-lg">←</Text>
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-bold color-emerald-700">
          Perfil
        </Text>
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center"
          // 3. Usa navigation.navigate en lugar de router.push
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text className="text-emerald-700 text-base">✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjeta de Perfil Principal */}
      <View className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 items-center mb-6">
        <View className="relative mb-3">
          <View className="w-24 h-24 rounded-full bg-emerald-100 border-2 border-emerald-600 items-center justify-center">
            <Text className="text-4xl">🥑</Text>
          </View>
          <View className="absolute bottom-0 right-0 bg-emerald-600 w-6 h-6 rounded-full items-center justify-center border-2 border-white">
            <Text className="text-white text-[10px] font-bold">✓</Text>
          </View>
        </View>

        <Text className="text-gray-900 text-xl font-bold">Yilmer Melenge</Text>
        <Text className="text-emerald-700 text-sm font-semibold mt-0.5">
          Nutrik VIP • Plan Balanceado
        </Text>

        {/* Stats / Resumen rápido */}
        <View className="flex-row w-full justify-around mt-5 pt-4 border-t border-gray-100">
          {/* Pedidos */}
          <TouchableOpacity
            className="items-center flex-1 active:opacity-60"
            onPress={() => {
              navigation.navigate("Dashboard");
            }}
          >
            <Text className="text-gray-900 font-bold text-base">12</Text>
            <Text className="text-gray-500 text-xs">Pedidos</Text>
          </TouchableOpacity>

          <View className="w-[1px] bg-gray-100 h-full" />

          {/* Puntos */}
          <TouchableOpacity
            className="items-center flex-1 active:opacity-60"
            onPress={() => {
              navigation.navigate("Points");
            }}
          >
            <Text className="text-gray-900 font-bold text-base">4.8k</Text>
            <Text className="text-gray-500 text-xs">Puntos</Text>
          </TouchableOpacity>

          <View className="w-[1px] bg-gray-100 h-full" />

          {/* Estilo / Dieta */}
          <TouchableOpacity
            className="items-center flex-1 active:opacity-60"
            onPress={() => {
              navigation.navigate("DietPreferences");
            }}
          >
            <Text className="text-emerald-700 font-bold text-base">Keto</Text>
            <Text className="text-gray-500 text-xs">Estilo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Grupos de Opciones */}
      {menuGroups.map((group, groupIdx) => (
        <View key={groupIdx} className="mb-5">
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 px-1">
            {group.title}
          </Text>

          {/* Recorremos los items directamente sin el contenedor envolvente */}
          {group.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                // Si el ítem tiene una ruta definida, navega hacia ella
                if (item.route) {
                  navigation.navigate(item.route);
                }
              }}
              className="flex-row items-center justify-between px-4 py-3.5 bg-white rounded-2xl border border-gray-100 mb-3 shadow-xs active:bg-gray-50"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-9 h-9 rounded-xl bg-emerald-50 items-center justify-center mr-3.5">
                  <Text className="text-base">{item.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 text-sm font-semibold">
                    {item.title}
                  </Text>
                  {item.subtitle && (
                    <Text className="text-gray-400 text-xs mt-0.5">
                      {item.subtitle}
                    </Text>
                  )}
                </View>
              </View>
              <View className="flex-row items-center space-x-2">
                {item.badge && (
                  <View className="bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <Text className="text-emerald-700 text-xs font-bold">
                      {item.badge}
                    </Text>
                  </View>
                )}
                <Text className="text-gray-300 text-lg">›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Cerrar Sesión */}
      <TouchableOpacity className="mb-12 py-4 rounded-2xl bg-red-50 border border-red-100 items-center active:bg-red-100">
        <Text className="text-red-600 font-bold text-sm">Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
