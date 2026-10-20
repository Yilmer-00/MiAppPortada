import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

export default function CrearFacturaScreen({ navigation }) {
  const [clientName, setClientName] = useState("");
  const [product, setProduct] = useState("");
  const [total, setTotal] = useState("");

  const handleCreateInvoice = () => {
    if (!clientName || !product || !total) {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos de la factura.",
      );
      return;
    }

    Alert.alert("Éxito", `Factura generada correctamente para ${clientName}`);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerClassName="p-5 bg-white grow">
      <Text className="text-2xl font-bold mb-5 text-gray-800">
        Crear Nueva Factura
      </Text>

      <Text className="text-base mb-1 text-gray-600">Cliente:</Text>
      <TextInput
        className="border border-gray-300 p-3 rounded-lg mb-4 bg-gray-50 text-gray-800"
        placeholder="Nombre o ID del cliente"
        placeholderTextColor="#9ca3af"
        value={clientName}
        onChangeText={setClientName}
      />

      <Text className="text-base mb-1 text-gray-600">
        Descripción del Producto / Servicio:
      </Text>
      <TextInput
        className="border border-gray-300 p-3 rounded-lg mb-4 bg-gray-50 text-gray-800"
        placeholder="Ej. Desarrollo de App"
        placeholderTextColor="#9ca3af"
        value={product}
        onChangeText={setProduct}
      />

      <Text className="text-base mb-1 text-gray-600">Monto Total ($):</Text>
      <TextInput
        className="border border-gray-300 p-3 rounded-lg mb-6 bg-gray-50 text-gray-800"
        placeholder="0.00"
        placeholderTextColor="#9ca3af"
        keyboardDataType="numeric"
        value={total}
        onChangeText={setTotal}
      />

      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-lg items-center shadow-md active:bg-blue-700"
        onPress={handleCreateInvoice}
      >
        <Text className="text-white font-bold text-base">Emitir Factura</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
