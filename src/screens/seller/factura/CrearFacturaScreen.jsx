import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useFacturas } from '../../../context/FacturasContext';

export default function CrearFacturaScreen() {
  const navigation = useNavigation();
  const { crearFactura } = useFacturas();

  const [cliente, setCliente] = useState('');
  const [documentoCliente, setDocumentoCliente] = useState('');
  const [total, setTotal] = useState('');
  const [estado, setEstado] = useState('Pagada');

  const handleGuardar = () => {
    if (!cliente.trim() || !total.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre del cliente y el monto total');
      return;
    }

    crearFactura({
      cliente,
      documentoCliente,
      total: total.startsWith('$') ? total : `$ ${total}`,
      estado,
      items: [
        { id: '1', nombre: 'Venta Directa', cantidad: 1, precioUnitario: `$ ${total}`, subtotal: `$ ${total}` }
      ]
    });

    navigation.navigate('Facturas');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigation.navigate('Facturas')} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Nueva Factura</Text>
      </View>

      <View className="bg-white p-4 rounded-xl border border-gray-100 space-y-4">
        <View>
          <Text className="text-xs font-semibold text-gray-700 mb-1">Nombre del Cliente</Text>
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-800"
            placeholder="Ej. Carlos Mendoza"
            value={cliente}
            onChangeText={setCliente}
          />
        </View>

        <View>
          <Text className="text-xs font-semibold text-gray-700 mb-1">Documento de Identidad</Text>
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-800"
            placeholder="Ej. 1061700999"
            keyboardType="numeric"
            value={documentoCliente}
            onChangeText={setDocumentoCliente}
          />
        </View>

        <View>
          <Text className="text-xs font-semibold text-gray-700 mb-1">Monto Total</Text>
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-800"
            placeholder="Ej. 50.000"
            keyboardType="numeric"
            value={total}
            onChangeText={setTotal}
          />
        </View>

        <View>
          <Text className="text-xs font-semibold text-gray-700 mb-2">Estado del Pago</Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              className={`flex-1 py-2 rounded-lg items-center ${estado === 'Pagada' ? 'bg-emerald-700' : 'bg-gray-100'}`}
              onPress={() => setEstado('Pagada')}
            >
              <Text className={`text-xs font-bold ${estado === 'Pagada' ? 'text-white' : 'text-gray-600'}`}>Pagada</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-lg items-center ml-2 ${estado === 'Pendiente' ? 'bg-amber-600' : 'bg-gray-100'}`}
              onPress={() => setEstado('Pendiente')}
            >
              <Text className={`text-xs font-bold ${estado === 'Pendiente' ? 'text-white' : 'text-gray-600'}`}>Pendiente</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className="bg-emerald-700 py-3 rounded-lg items-center mt-4"
          onPress={handleGuardar}
        >
          <Text className="text-white font-bold text-sm">Generar Factura</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}