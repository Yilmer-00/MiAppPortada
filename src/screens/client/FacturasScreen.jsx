import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const mockInvoices = [
  {
    id: "101",
    product: "Desarrollo de App",
    total: "150.00",
    status: "Pendiente",
  },
  { id: "102", product: "Mantenimiento Web", total: "50.00", status: "Pagado" },
];

export default function FacturasScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="bg-white p-4 rounded-xl flex-row justify-between items-center mb-3 shadow-sm border border-gray-100"
      onPress={() => navigation.navigate("FacturaDetalle", { invoice: item })}
    >
      <View>
        <Text className="text-base font-bold text-gray-800">
          Factura #{item.id}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">{item.product}</Text>
      </View>
      <View className="items-end">
        <Text className="text-base font-bold text-blue-600">${item.total}</Text>
        <Text
          className={`text-xs mt-1 font-bold ${item.status === "Pagado" ? "text-green-600" : "text-amber-500"}`}
        >
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-5 bg-gray-50">
      <Text className="text-2xl font-bold mb-4 text-gray-800">
        Mis Facturas
      </Text>
      <FlatList
        data={mockInvoices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
