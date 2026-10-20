import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Datos de ejemplo de facturas emitidas por el vendedor
const mockSellerInvoices = [
  {
    id: "201",
    client: "Juan Pérez",
    product: "Desarrollo de App",
    total: "150.00",
    status: "Pendiente",
  },
  {
    id: "202",
    client: "María Gómez",
    product: "Mantenimiento Web",
    total: "50.00",
    status: "Pagado",
  },
];

export default function ListaFacturasScreen({ navigation }) {
  const renderItem = ({ item }) => {
    const isPaid = item.status === "Pagado";

    return (
      <View className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100 flex-row justify-between items-center">
        <View className="flex-1 mr-2">
          {/* Nombre del cliente */}
          <View className="flex-row items-center mb-1">
            <Ionicons
              name="person-outline"
              size={14}
              color="#6b7280"
              style={{ marginRight: 4 }}
            />
            <Text className="text-xs font-semibold text-gray-500">
              {item.client}
            </Text>
          </View>

          <Text className="text-base font-bold text-gray-800">
            Factura #{item.id}
          </Text>
          <Text className="text-sm text-gray-500 mt-0.5">{item.product}</Text>
        </View>

        <View className="items-end">
          <Text className="text-base font-bold text-blue-600">
            ${item.total}
          </Text>

          {/* Estado de la factura */}
          <View className="flex-row items-center mt-1">
            <Ionicons
              name={isPaid ? "checkmark-circle" : "time-outline"}
              size={14}
              color={isPaid ? "#16a34a" : "#f59e0b"}
              style={{ marginRight: 3 }}
            />
            <Text
              className={`text-xs font-bold ${isPaid ? "text-green-600" : "text-amber-500"}`}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 p-5 bg-gray-50">
      {/* Cabecera y Botón para crear nueva factura */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-2xl font-bold text-gray-800">
          Facturas Emitidas
        </Text>
        <TouchableOpacity
          className="bg-blue-600 flex-row items-center py-2 px-4 rounded-xl shadow-md active:bg-blue-700"
          onPress={() => navigation.navigate("CrearFactura")}
        >
          <Ionicons
            name="add"
            size={18}
            color="white"
            style={{ marginRight: 4 }}
          />
          <Text className="text-white font-bold text-sm">Nueva</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de facturas */}
      <FlatList
        data={mockSellerInvoices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
