import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function OrdersScreen() {
  const navigation = useNavigation(); // Hook de navegación
  const [tab, setTab] = useState("enCurso"); // Estado para alternar entre pestañas ('enCurso' o 'historial')

  return (
    <ScrollView
      className="flex-1 bg-gray-50 px-4 pt-4"
      showsVerticalScrollIndicator={false}
    >
      {/* 1. SECCIÓN DE TABS SUPERIORES (En curso / Historial) */}
      <View className="flex-row bg-gray-200/60 p-1 rounded-full mb-6">
        <TouchableOpacity
          onPress={() => setTab("enCurso")}
          className={`flex-1 py-2.5 rounded-full flex-row justify-center items-center ${tab === "enCurso" ? "bg-white shadow-sm" : ""}`}
        >
          <Text
            className={`text-xs font-bold ${tab === "enCurso" ? "text-gray-900" : "text-gray-500"}`}
          >
            En curso
          </Text>
          <View className="bg-[#00C896] px-2 py-0.5 rounded-full ml-1.5">
            <Text className="text-[10px] font-bold text-white">1</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab("historial")}
          className={`flex-1 py-2.5 rounded-full flex-row justify-center items-center ${tab === "historial" ? "bg-white shadow-sm" : ""}`}
        >
          <Text
            className={`text-xs font-bold ${tab === "historial" ? "text-gray-900" : "text-gray-500"}`}
          >
            Historial
          </Text>
          <View className="bg-gray-300 px-2 py-0.5 rounded-full ml-1.5">
            <Text className="text-[10px] font-bold text-gray-700">4</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* CONTENIDO CONDICIONAL SEGÚN LA PESTAÑA */}
      {tab === "enCurso" ? (
        <View className="bg-white rounded-3xl p-5 mb-6 shadow-sm border border-gray-100">
          {/* Cabecera del pedido activo */}
          <View className="flex-row justify-between items-center mb-1">
            <View className="flex-row items-center">
              <Text className="text-lg font-extrabold text-gray-900 mr-2">
                #NK-84920
              </Text>
              <TouchableOpacity onPress={() => alert("¡ID copiado con éxito!")}>
                <Feather name="copy" size={14} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            <View className="bg-emerald-50 p-2.5 rounded-2xl">
              <Ionicons name="car-outline" size={18} color="#00C896" />
            </View>
          </View>
          <Text className="text-xs text-gray-400 mb-3">
            Realizado hoy, 8:45 AM
          </Text>

          {/* Banner de estado de entrega */}
          <View className="bg-emerald-50 rounded-2xl p-3.5 mb-4 border border-emerald-100 flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-[#00C896] mr-3" />
            <View className="flex-1">
              <Text className="text-xs font-bold text-emerald-900">
                En camino hacia tu dirección
              </Text>
              <Text className="text-xs text-emerald-700 mt-0.5">
                Llega hoy entre 2:00 PM y 4:00 PM
              </Text>
            </View>
          </View>

          {/* Stepper de Progreso del Pedido */}
          <View className="flex-row justify-between items-center mb-6 px-2">
            {/* Paso 1: Recibido */}
            <View className="items-center">
              <View className="w-8 h-8 rounded-full bg-[#00C896] items-center justify-center mb-1">
                <Ionicons name="checkmark" size={14} color="white" />
              </View>
              <Text className="text-[10px] font-medium text-gray-700">
                Recibido
              </Text>
            </View>
            <View className="flex-1 h-0.5 bg-[#00C896] mx-1 -mt-4" />

            {/* Paso 2: Empaque */}
            <View className="items-center">
              <View className="w-8 h-8 rounded-full bg-[#00C896] items-center justify-center mb-1">
                <MaterialCommunityIcons
                  name="package-variant"
                  size={14}
                  color="white"
                />
              </View>
              <Text className="text-[10px] font-medium text-gray-700">
                Empaque
              </Text>
            </View>
            <View className="flex-1 h-0.5 bg-[#00C896] mx-1 -mt-4" />

            {/* Paso 3: En reparto (Activo) */}
            <View className="items-center">
              <View className="w-8 h-8 rounded-full bg-[#00C896] border-2 border-white shadow-sm items-center justify-center mb-1">
                <Ionicons name="bicycle" size={14} color="white" />
              </View>
              <Text className="text-[10px] font-bold text-[#00C896]">
                En reparto
              </Text>
            </View>
            <View className="flex-1 h-0.5 bg-gray-200 mx-1 -mt-4" />

            {/* Paso 4: Entregado */}
            <View className="items-center">
              <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center mb-1">
                <Ionicons name="location-outline" size={14} color="#9CA3AF" />
              </View>
              <Text className="text-[10px] font-medium text-gray-400">
                Entregado
              </Text>
            </View>
          </View>

          {/* Título Artículos */}
          <Text className="text-xs font-bold text-gray-400 tracking-wider mb-3">
            ARTÍCULOS EN ESTE PAQUETE (3)
          </Text>

          {/* Lista de Artículos (Con rutas a detalle de producto) */}
          <View className="space-y-3 mb-4">
            {/* Artículo 1 */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetailScreen", {
                  productId: "whey-2kg",
                })
              }
              className="flex-row items-center bg-gray-50 p-3 rounded-2xl border border-gray-100"
            >
              <View className="w-12 h-12 bg-white rounded-xl justify-center items-center mr-3 border border-gray-100">
                <MaterialCommunityIcons
                  name="bottle-tonic-outline"
                  size={24}
                  color="#00C896"
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-sm font-bold text-gray-900"
                  numberOfLines={1}
                >
                  Proteína Whey Isolate
                </Text>
                <Text className="text-xs text-gray-500">
                  Envase 2kg • x1 unidad
                </Text>
              </View>
              <Text className="text-sm font-extrabold text-gray-900">
                $189.000
              </Text>
            </TouchableOpacity>

            {/* Artículo 2 */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetailScreen", {
                  productId: "creatina-300g",
                })
              }
              className="flex-row items-center bg-gray-50 p-3 rounded-2xl border border-gray-100"
            >
              <View className="w-12 h-12 bg-white rounded-xl justify-center items-center mr-3 border border-gray-100">
                <MaterialCommunityIcons
                  name="jar-outline"
                  size={24}
                  color="#00C896"
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-sm font-bold text-gray-900"
                  numberOfLines={1}
                >
                  Creatina Monohidrato
                </Text>
                <Text className="text-xs text-gray-500">
                  Polvo 300g • x1 unidad
                </Text>
              </View>
              <Text className="text-sm font-extrabold text-gray-900">
                $62.000
              </Text>
            </TouchableOpacity>

            {/* Artículo 3 */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetailScreen", {
                  productId: "multivitaminico",
                })
              }
              className="flex-row items-center bg-gray-50 p-3 rounded-2xl border border-gray-100"
            >
              <View className="w-12 h-12 bg-white rounded-xl justify-center items-center mr-3 border border-gray-100">
                <MaterialCommunityIcons name="pill" size={24} color="#00C896" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-sm font-bold text-gray-900"
                  numberOfLines={1}
                >
                  Multivitamínico Deportivo
                </Text>
                <Text className="text-xs text-gray-500">
                  60 cápsulas veganas • x1 unidad
                </Text>
              </View>
              <Text className="text-sm font-extrabold text-gray-900">
                $38.000
              </Text>
            </TouchableOpacity>
          </View>

          {/* Resumen Total Pagado */}
          <View className="flex-row justify-between items-center py-3 border-t border-b border-gray-100 mb-4">
            <View>
              <Text className="text-xs text-gray-400">Total Pagado</Text>
              <Text className="text-xl font-black text-gray-900">
                $289.000{" "}
                <Text className="text-xs font-normal text-gray-400">
                  ($68.50 USD)
                </Text>
              </Text>
            </View>
            <View className="bg-emerald-50 px-3 py-1.5 rounded-full flex-row items-center">
              <Ionicons
                name="checkmark-circle-outline"
                size={14}
                color="#00C896"
                style={{ marginRight: 4 }}
              />
              <Text className="text-xs font-bold text-[#00C896]">
                Pagado con Visa
              </Text>
            </View>
          </View>

          {/* Botones con Rutas Principales */}
          <View className="space-y-2.5 mb-4">
            {/* Botón: Rastrear en tiempo real */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LiveTrackingScreen", {
                  orderId: "NK-84920",
                })
              }
              className="bg-[#00C896] rounded-2xl py-4 flex-row justify-center items-center shadow-md shadow-emerald-200"
            >
              <Ionicons
                name="navigate-outline"
                size={18}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-bold text-base">
                Rastrear pedido en tiempo real
              </Text>
            </TouchableOpacity>

            {/* Botón: Ver factura electrónica */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InvoiceScreen", { orderId: "NK-84920" })
              }
              className="bg-emerald-50 border border-emerald-200 rounded-2xl py-4 flex-row justify-center items-center"
            >
              <Feather
                name="file-text"
                size={18}
                color="#00C896"
                style={{ marginRight: 8 }}
              />
              <Text className="text-[#00C896] font-bold text-base">
                Ver factura electrónica
              </Text>
            </TouchableOpacity>
          </View>

          {/* Repartidor Asignado */}
          <View className="flex-row items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <View className="bg-white p-2.5 rounded-xl mr-3 shadow-sm">
              <Ionicons name="person-outline" size={16} color="#6B7280" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500">
                Repartidor asignado:{" "}
                <Text className="font-bold text-gray-800">Carlos M.</Text>
              </Text>
              <Text className="text-xs text-gray-400 mt-0.5">
                Motocicleta eléctrica
              </Text>
            </View>
          </View>
        </View>
      ) : (
        /* Vista si selecciona Historial directamente */
        <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100 items-center">
          <Text className="text-gray-500 text-sm font-semibold">
            Mostrando lista completa del historial...
          </Text>
        </View>
      )}

      {/* 2. SECCIÓN: HISTORIAL RECIENTE */}
      <View className="mb-10">
        <View className="flex-row justify-between items-center mb-3 px-1">
          <Text className="text-xs font-bold text-gray-400 tracking-wider">
            HISTORIAL RECIENTE
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AllOrdersHistoryScreen")}
          >
            <Text className="text-xs font-bold text-[#00C896]">
              Ver todos (4)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta de Historial Reciente */}
        <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-row items-center">
              <Text className="text-base font-bold text-gray-900 mr-2">
                #NK-79311
              </Text>
              <View className="bg-emerald-100 px-2.5 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-[#00C896]">
                  Entregado
                </Text>
              </View>
            </View>
            <Text className="text-base font-extrabold text-gray-900">
              $145.000
            </Text>
          </View>

          <Text className="text-xs text-gray-400 mb-3">
            Entregado el 12 de Octubre, 2024
          </Text>

          <View className="flex-row items-center mb-4">
            <Ionicons
              name="checkmark-circle-outline"
              size={14}
              color="#00C896"
              style={{ marginRight: 6 }}
            />
            <Text className="text-xs font-semibold text-gray-700">
              Proteína Vegana 1kg + Shaker Nutrik Pro
            </Text>
          </View>

          <View className="h-[1px] bg-gray-100 my-1" />

          {/* Botones de acción del historial */}
          <View className="flex-row justify-between items-center pt-2">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ReorderScreen", { orderId: "NK-79311" })
              }
              className="flex-1 bg-emerald-50 py-3 rounded-2xl flex-row justify-center items-center mr-3"
            >
              <Feather
                name="rotate-cw"
                size={14}
                color="#00C896"
                style={{ marginRight: 6 }}
              />
              <Text className="text-xs font-bold text-[#00C896]">
                Reordenar rápido
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("OrderDetailScreen", {
                  orderId: "NK-79311",
                })
              }
              className="w-11 h-11 bg-gray-100 rounded-2xl justify-center items-center"
            >
              <Ionicons name="chevron-forward" size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
