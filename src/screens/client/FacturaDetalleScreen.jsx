import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FacturaDetalleScreen({ route, navigation }) {
  // Recibimos los datos de la factura seleccionada
  const { invoice } = route.params || {
    id: "0",
    product: "N/A",
    total: "0.00",
    status: "Desconocido",
  };
  const isPaid = invoice.status === "Pagado";

  const handlePay = () => {
    Alert.alert(
      "Pago",
      `Redirigiendo a la pasarela de pago para la factura #${invoice.id}...`,
    );
  };

  return (
    <View className="flex-1 p-5 bg-gray-50">
      {/* Botón de retroceso y Título */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mr-3 bg-white p-2 rounded-full border border-gray-200 shadow-sm"
        >
          <Ionicons name="arrow-back" size={20} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">
          Detalle de Factura #{invoice.id}
        </Text>
      </View>

      {/* Tarjeta con los datos de la factura */}
      <View className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-6">
        {/* Concepto / Producto */}
        <View className="flex-row items-center mb-4 pb-4 border-b border-gray-100">
          <View className="bg-blue-50 p-3 rounded-full mr-3">
            <Ionicons name="document-text-outline" size={24} color="#2563eb" />
          </View>
          <View className="flex-1">
            <Text className="text-xs text-gray-400 font-medium">Concepto</Text>
            <Text className="text-base font-bold text-gray-800">
              {invoice.product}
            </Text>
          </View>
        </View>

        {/* Estado actual */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-sm text-gray-500">Estado Actual:</Text>
          <View className="flex-row items-center bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            <Ionicons
              name={isPaid ? "checkmark-circle" : "time-outline"}
              size={16}
              color={isPaid ? "#16a34a" : "#f59e0b"}
              style={{ marginRight: 4 }}
            />
            <Text
              className={`font-bold text-sm ${isPaid ? "text-green-600" : "text-amber-500"}`}
            >
              {invoice.status}
            </Text>
          </View>
        </View>

        {/* Total a Pagar */}
        <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
          <Text className="text-sm text-gray-500 font-medium">
            Total a Pagar:
          </Text>
          <Text className="text-2xl font-extrabold text-blue-600">
            ${invoice.total}
          </Text>
        </View>
      </View>

      {/* Botón de Pagar si está pendiente */}
      {!isPaid && (
        <TouchableOpacity
          className="bg-green-600 p-4 rounded-xl flex-row justify-center items-center shadow-md active:bg-green-700"
          onPress={handlePay}
        >
          <Ionicons
            name="card-outline"
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white font-bold text-base">
            Pagar Factura Ahora
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
