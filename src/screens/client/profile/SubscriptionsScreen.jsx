import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SubscriptionsScreen() {
  const navigation = useNavigation(); // Hook de navegación para las rutas

  return (
    <ScrollView
      className="flex-1 bg-gray-50 px-4 pt-4"
      showsVerticalScrollIndicator={false}
    >
      {/* 1. BANNER SUPERIOR: CLUB AUTO-RECOMPRA (Con Ruta) */}
      <TouchableOpacity
        onPress={() => navigation.navigate("ClubBenefitsScreen")}
        className="bg-emerald-50 rounded-3xl p-5 mb-6 border border-emerald-100 shadow-sm"
      >
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            <View className="bg-white p-2 rounded-2xl mr-2.5 shadow-sm">
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#00C896"
              />
            </View>
            <Text className="text-base font-extrabold text-gray-900">
              Club Auto-recompra
            </Text>
          </View>
          <View className="bg-emerald-200/60 px-3 py-1 rounded-full">
            <Text className="text-[10px] font-extrabold text-emerald-800 tracking-wider">
              BENEFICIOS
            </Text>
          </View>
        </View>

        <Text className="text-xs text-gray-600 leading-5">
          Ahorras{" "}
          <Text className="font-bold text-emerald-700">
            15% en cada entrega
          </Text>{" "}
          periódica con envíos prioritarios 100% gratuitos y sin
          permanencia[cite: 9].
        </Text>
      </TouchableOpacity>

      {/* 2. SECCIÓN: SUSCRIPCIÓN ACTIVA */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3 px-1">
          <Text className="text-xs font-bold text-gray-400 tracking-wider">
            SUSCRIPCIÓN ACTIVA
          </Text>
          <View className="bg-emerald-50 px-2.5 py-0.5 rounded-full">
            <Text className="text-[10px] font-bold text-[#00C896]">
              ● 1 suscripción al día
            </Text>
          </View>
        </View>

        {/* Tarjeta de Suscripción Principal */}
        <View className="bg-white rounded-3xl p-4 mb-4 shadow-sm border border-emerald-100">
          {/* Cabecera del producto activo (Con Ruta al Detalle) */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetailScreen", {
                productId: "whey-isolate-2kg",
              })
            }
            className="flex-row items-center mb-4 pb-4 border-b border-gray-100"
          >
            <View className="w-14 h-14 bg-gray-50 rounded-2xl justify-center items-center mr-3 border border-gray-100">
              <MaterialCommunityIcons
                name="bottle-tonic-outline"
                size={28}
                color="#00C896"
              />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center">
                <Text
                  className="text-sm font-bold text-gray-900"
                  numberOfLines={1}
                >
                  Proteína Whey Isolate 2...
                </Text>
                <View className="bg-emerald-100 px-2 py-0.5 rounded-full">
                  <Text className="text-[9px] font-bold text-[#00C896]">
                    Activa
                  </Text>
                </View>
              </View>
              <Text className="text-xs text-gray-500 mt-0.5">
                Sabor: Vainilla Francesa
              </Text>

              <View className="flex-row items-center mt-1.5">
                <Text className="text-sm font-black text-gray-900 mr-2">
                  $215.000
                </Text>
                <Text className="text-xs text-gray-400 line-through mr-2">
                  $253.000
                </Text>
                <View className="bg-emerald-50 px-2 py-0.5 rounded">
                  <Text className="text-[10px] font-bold text-[#00C896]">
                    -15%
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Detalles de Configuración */}
          <View className="space-y-3 mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Feather
                  name="refresh-cw"
                  size={14}
                  color="#6B7280"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-xs text-gray-500 font-medium">
                  Frecuencia
                </Text>
              </View>
              <Text className="text-xs font-bold text-gray-800">
                Cada 30 días (Mensual)
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Feather
                  name="calendar"
                  size={14}
                  color="#6B7280"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-xs text-gray-500 font-medium">
                  Próxima entrega
                </Text>
              </View>
              <Text className="text-xs font-bold text-[#00C896]">
                15 de Noviembre, 2024
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Feather
                  name="map-pin"
                  size={14}
                  color="#6B7280"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-xs text-gray-500 font-medium">
                  Destino
                </Text>
              </View>
              <Text className="text-xs font-bold text-gray-800">
                Casa (Calle 45 # 12-34)
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Feather
                  name="credit-card"
                  size={14}
                  color="#6B7280"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-xs text-gray-500 font-medium">
                  Pago automático
                </Text>
              </View>
              <Text className="text-xs font-bold text-gray-800">
                ● Visa •••• 4210
              </Text>
            </View>
          </View>

          {/* Botones de Acción Rápida (Grid 2x2 con Rutas) */}
          <View className="flex-row gap-2.5 mb-2">
            {/* Adelantar entrega */}
            <TouchableOpacity
              onPress={() => navigation.navigate("AdvanceDeliveryScreen")}
              className="flex-1 bg-gray-50 border border-gray-100 py-3 px-3 rounded-2xl flex-row items-center justify-center"
            >
              <Ionicons
                name="flash-outline"
                size={14}
                color="#00C896"
                style={{ marginRight: 6 }}
              />
              <Text className="text-xs font-bold text-gray-800">
                Adelantar entrega
              </Text>
            </TouchableOpacity>

            {/* Saltar este mes */}
            <TouchableOpacity
              onPress={() => navigation.navigate("SkipMonthScreen")}
              className="flex-1 bg-gray-50 border border-gray-100 py-3 px-3 rounded-2xl flex-row items-center justify-center"
            >
              <Ionicons
                name="play-skip-forward-outline"
                size={14}
                color="#6B7280"
                style={{ marginRight: 6 }}
              />
              <Text className="text-xs font-bold text-gray-800">
                Saltar este mes
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-2.5">
            {/* Frecuencia */}
            <TouchableOpacity
              onPress={() => navigation.navigate("EditFrequencyScreen")}
              className="flex-1 bg-gray-50 border border-gray-100 py-3 px-3 rounded-2xl flex-row items-center justify-center"
            >
              <Feather
                name="sliders"
                size={14}
                color="#6B7280"
                style={{ marginRight: 6 }}
              />
              <Text className="text-xs font-bold text-gray-800">
                Frecuencia
              </Text>
            </TouchableOpacity>

            {/* Pausar plan */}
            <TouchableOpacity
              onPress={() => navigation.navigate("PausePlanScreen")}
              className="flex-1 bg-gray-50 border border-gray-100 py-3 px-3 rounded-2xl flex-row items-center justify-center"
            >
              <Ionicons
                name="pause-circle-outline"
                size={14}
                color="#6B7280"
                style={{ marginRight: 6 }}
              />
              <Text className="text-xs font-bold text-gray-800">
                Pausar plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 3. SECCIÓN: AÑADIR A TU ENTREGA DEL 15 NOV */}
      <View className="mb-6">
        <View className="mb-3 px-1">
          <Text className="text-xs font-bold text-gray-400 tracking-wider">
            AÑADIR A TU ENTREGA DEL 15 NOV
          </Text>
          <Text className="text-[11px] text-[#00C896] font-semibold mt-0.5">
            Con 10% adicional por sumar a tu pedido regular
          </Text>
        </View>

        {/* Producto Sugerido 1: Creatina */}
        <View className="bg-white rounded-3xl p-3.5 mb-3 shadow-sm border border-gray-100 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-12 h-12 bg-gray-50 rounded-2xl justify-center items-center mr-3 border border-gray-100">
              <MaterialCommunityIcons
                name="jar-outline"
                size={22}
                color="#00C896"
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-xs font-bold text-gray-900"
                numberOfLines={1}
              >
                Creatina Monohidratada
              </Text>
              <Text className="text-[10px] text-gray-400">
                300g Creapure® sin sabor
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-xs font-black text-gray-900 mr-2">
                  $89.100
                </Text>
                <Text className="text-[10px] text-gray-400 line-through mr-2">
                  $99.000
                </Text>
                <View className="bg-emerald-50 px-1.5 py-0.5 rounded">
                  <Text className="text-[9px] font-bold text-[#00C896]">
                    +10% extra
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Botón Añadir */}
          <TouchableOpacity
            onPress={() => alert("¡Producto añadido a tu próxima entrega!")}
            className="bg-[#00C896] w-9 h-9 rounded-full items-center justify-center shadow-sm shadow-emerald-200"
          >
            <Ionicons name="add" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Producto Sugerido 2: Omega-3 */}
        <View className="bg-white rounded-3xl p-3.5 mb-3 shadow-sm border border-gray-100 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-12 h-12 bg-gray-50 rounded-2xl justify-center items-center mr-3 border border-gray-100">
              <MaterialCommunityIcons name="pill" size={22} color="#00C896" />
            </View>
            <View className="flex-1">
              <Text
                className="text-xs font-bold text-gray-900"
                numberOfLines={1}
              >
                Omega-3 Ultra Puro
              </Text>
              <Text className="text-[10px] text-gray-400">
                120 cápsulas blandas EPA/DHA
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-xs font-black text-gray-900 mr-2">
                  $67.500
                </Text>
                <Text className="text-[10px] text-gray-400 line-through mr-2">
                  $75.000
                </Text>
                <View className="bg-emerald-50 px-1.5 py-0.5 rounded">
                  <Text className="text-[9px] font-bold text-[#00C896]">
                    +10% extra
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Botón Añadir */}
          <TouchableOpacity
            onPress={() => alert("¡Producto añadido a tu próxima entrega!")}
            className="bg-[#00C896] w-9 h-9 rounded-full items-center justify-center shadow-sm shadow-emerald-200"
          >
            <Ionicons name="add" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. BOTÓN INFERIOR: CREAR NUEVA SUSCRIPCIÓN */}
      <View className="mb-10">
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateSubscriptionScreen")}
          className="bg-[#00C896] rounded-2xl py-4 flex-row justify-center items-center shadow-md shadow-emerald-200"
        >
          <Ionicons
            name="add-circle-outline"
            size={18}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white font-bold text-base">
            Crear nueva suscripción recurrente
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-[11px] text-gray-400 mt-3 px-4">
          Cancela, adelanta o pausa con 1 clic en cualquier momento.
        </Text>
      </View>
    </ScrollView>
  );
}
