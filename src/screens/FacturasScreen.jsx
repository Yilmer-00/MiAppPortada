import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FacturasScreen({ navigation }) {
  const facturas = [
    { id: 'FAC-0001', cliente: 'Juan Pérez', fecha: '25/08/2026', total: '$ 150.000', estado: 'Pagada' },
    { id: 'FAC-0002', cliente: 'Ana López', fecha: '24/08/2026', total: '$ 230.000', estado: 'Pagada' },
    { id: 'FAC-0003', cliente: 'Pedro Gómez', fecha: '24/08/2026', total: '$ 89.000', estado: 'Pendiente' },
    { id: 'FAC-0004', cliente: 'María Torres', fecha: '23/08/2026', total: '$ 120.000', estado: 'Pagada' },
  ];

  return (
    <ScrollView className="flex-1 bg-[#f8f9fa] p-4 pt-[50px]">
      <View className="mb-5">
        <Text className="text-2xl font-bold text-[#333]">Facturación</Text>
        <Text className="text-sm text-[#666] mt-1 mb-3">Gestiona tus facturas de forma rápida y ordenada.</Text>
        
        <TouchableOpacity className="bg-[#198754] flex-row items-center justify-center py-2.5 rounded-lg">
          <Ionicons name="add" size={18} color="#fff" />
          <Text className="text-white font-bold ml-1.5">Nueva factura</Text>
        </TouchableOpacity>
      </View>

      {facturas.map((item) => (
        <View key={item.id} className="bg-white rounded-[10px] p-4 mb-3 border border-[#eee]">
          <View className="flex-row justify-between items-center mb-1.5">
            <Text className="font-bold text-[#198754] text-base">{item.id}</Text>
            <View className={`px-2 py-[3px] rounded-md ${item.estado === 'Pagada' ? 'bg-[#d1e7dd]' : 'bg-[#fff3cd]'}`}>
              <Text className={`text-xs font-bold ${item.estado === 'Pagada' ? 'text-[#0f5132]' : 'text-[#664d03]'}`}>
                {item.estado}
              </Text>
            </View>
          </View>

          <Text className="text-lg font-semibold text-[#212529] mb-2.5">{item.cliente}</Text>
          
          <View className="flex-row justify-between items-end border-t border-[#eee] pt-2.5">
            <View>
              <Text className="text-xs text-[#888]">Fecha: {item.fecha}</Text>
              <Text className="text-base font-bold text-[#333] mt-0.5">{item.total}</Text>
            </View>
            
            <View className="flex-row">
              <TouchableOpacity 
                className="py-1.5 px-3 rounded-md ml-2 bg-[#f1f3f5]"
                onPress={() => navigation.navigate('FacturaDetalle', { factura: item })}
              >
                <Text className="text-[#0d6efd] font-semibold text-[13px]">Ver</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-1.5 px-3 rounded-md ml-2 bg-[#e7f5ff]">
                <Text className="text-[#0366d6] font-semibold text-[13px]">Descargar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}