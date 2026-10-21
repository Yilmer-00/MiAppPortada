import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function FacturaDetalle() {
  const route = useRoute();
  const navigation = useNavigation();

  // Obtenemos el ID de los parámetros de navegación de forma segura
  const { id = 'FAC-0001', factura } = route.params || {};
  const facturaId = factura?.numero || id;

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Botón de Volver */}
      <TouchableOpacity
        className="flex-row items-center mb-4 py-1"
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={20} color="#047857" />
        <Text className="text-xs font-semibold text-emerald-700 ml-1">Volver a Facturas</Text>
      </TouchableOpacity>

      {/* Tarjeta principal de detalle */}
      <View className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-6">
        <Text className="text-lg font-bold text-gray-900 mb-4">
          Detalle de la Factura: <Text className="text-emerald-700">{facturaId}</Text>
        </Text>

        {/* Metadatos (Cliente, Fecha, Estado) */}
        <View className="flex-row justify-between items-center border-b border-gray-100 pb-4 mb-4">
          <View>
            <Text className="text-xs text-gray-400 mb-1">Cliente</Text>
            <Text className="text-xs font-bold text-gray-800">Juan Pérez</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-400 mb-1">Fecha</Text>
            <Text className="text-xs font-bold text-gray-800">22/05/2026</Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-gray-400 mb-1">Estado</Text>
            <View className="bg-green-50 px-2.5 py-1 rounded-md">
              <Text className="text-xs font-bold text-green-700">Pagado</Text>
            </View>
          </View>
        </View>

        {/* Título de productos */}
        <Text className="text-xs font-bold text-gray-900 mb-3">Productos comprados</Text>

        {/* Lista de productos */}
        <View className="mb-4">
          <View className="flex-row justify-between py-2 border-b border-gray-50">
            <Text className="text-xs text-gray-700">Yogur Griego Natural (x1)</Text>
            <Text className="text-xs font-bold text-gray-900">$12.000</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-gray-50">
            <Text className="text-xs text-gray-700">Ensalada Fresh (x1)</Text>
            <Text className="text-xs font-bold text-gray-900">$15.000</Text>
          </View>
        </View>

        {/* Total a pagar */}
        <View className="border-t border-gray-100 pt-4 flex-row justify-between items-center">
          <Text className="text-xs font-bold text-gray-900">Total a Pagar:</Text>
          <Text className="text-base font-extrabold text-emerald-700">$27.000</Text>
        </View>
      </View>
    </ScrollView>
  );
}