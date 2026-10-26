import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFacturas } from '../../../context/FacturasContext';

export default function FacturasScreen() {
    const navigation = useNavigation();
    const { facturas } = useFacturas();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFacturas = facturas.filter(f =>
        f.numeroFactura.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.cliente.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderFacturaCard = ({ item }) => (
        <TouchableOpacity
            className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm"
            onPress={() => navigation.navigate('FacturaDetalle', { factura: item })}
        >
            <View className="flex-row justify-between items-center mb-2">
                <View>
                    <Text className="text-sm font-bold text-gray-900">{item.numeroFactura}</Text>
                    <Text className="text-xs text-gray-500">{item.cliente}</Text>
                </View>
                <View className={`px-2.5 py-1 rounded-full ${item.estado === 'Pagada' ? 'bg-green-100' : 'bg-amber-100'}`}>
                    <Text className={`text-[10px] font-bold ${item.estado === 'Pagada' ? 'text-green-800' : 'text-amber-800'}`}>
                        {item.estado}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between items-center border-t border-gray-100 pt-2 mt-1">
                <Text className="text-xs text-gray-400">Fecha: {item.fecha}</Text>
                <Text className="text-base font-extrabold text-emerald-700">{item.total}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-gray-50 p-4">
            <View className="flex-row justify-between items-center mb-4">
                <View>
                    <Text className="text-xl font-bold text-gray-900">Facturas</Text>
                    <Text className="text-xs text-gray-500">Historial de ventas e ingresos</Text>
                </View>
                <TouchableOpacity
                    className="bg-emerald-700 flex-row items-center px-3 py-2 rounded-lg shadow-sm"
                    onPress={() => navigation.navigate('CrarFactura')}
                >
                    <Ionicons name="add" size={18} color="#fff" />
                    <Text className="text-white font-bold text-xs ml-1">Crear</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-3 mb-4">
                <Ionicons name="search" size={18} color="#888" className="mr-2" />
                <TextInput
                    className="flex-1 h-10 text-xs text-gray-800"
                    placeholder="Buscar por N° factura o cliente..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={filteredFacturas}
                keyExtractor={(item) => item.id}
                renderItem={renderFacturaCard}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}