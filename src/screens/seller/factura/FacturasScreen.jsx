import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Datos de ejemplo basados en tu diseño web
const INITIAL_FACTURAS = [
    { id: '1', numero: 'FAC-0001', cliente: 'Juan Pérez', fecha: '25/08/2024', total: '$ 150.000', estado: 'Pagada' },
    { id: '2', numero: 'FAC-0002', cliente: 'Ana López', fecha: '24/08/2024', total: '$ 230.000', estado: 'Pagada' },
    { id: '3', numero: 'FAC-0003', cliente: 'Pedro Gómez', fecha: '24/08/2024', total: '$ 89.000', estado: 'Pendiente' },
    { id: '4', numero: 'FAC-0004', cliente: 'María Torres', fecha: '23/08/2024', total: '$ 120.000', estado: 'Pagada' },
    { id: '5', numero: 'FAC-0005', cliente: 'Luis Ramírez', fecha: '23/08/2024', total: '$ 75.000', estado: 'Pendiente' },
];

export default function FacturasScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [facturas] = useState(INITIAL_FACTURAS);

    // Filtrar facturas de forma reactiva por número o cliente
    const filteredFacturas = facturas.filter(f =>
        f.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.cliente.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderFacturaCard = ({ item }) => (
        <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm">
            {/* Cabecera de la tarjeta: Número y Estado */}
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-base font-bold text-gray-900">{item.numero}</Text>
                <View className={`px-2.5 py-1 rounded-md ${item.estado === 'Pagada' ? 'bg-green-50' : 'bg-amber-50'}`}>
                    <Text className={`text-xs font-bold ${item.estado === 'Pagada' ? 'text-green-700' : 'text-amber-700'}`}>
                        {item.estado}
                    </Text>
                </View>
            </View>

            {/* Información del cliente */}
            <Text className="text-xs text-gray-500 mb-3">
                Cliente: <Text className="font-semibold text-gray-800">{item.cliente}</Text>
            </Text>

            {/* Detalles: Fecha y Total */}
            <View className="flex-row justify-between items-center border-t border-gray-100 pt-2.5 mb-2">
                <Text className="text-xs text-gray-500">📅 {item.fecha}</Text>
                <Text className="text-base font-bold text-gray-900">{item.total}</Text>
            </View>

            {/* Acciones (Ruta a detalles y botón de descarga) */}
            <View className="flex-row justify-end border-t border-gray-100 pt-2.5">
                <TouchableOpacity
                    className="flex-row items-center ml-4 py-1 px-1.5"
                    onPress={() => navigation.navigate('FacturaDetalleScreen', { facturaId: item.id })} // 🚀 ESPACIO DE RUTA A DETALLES
                >
                    <Ionicons name="eye-outline" size={18} color="#137333" />
                    <Text className="text-xs text-gray-700 ml-1">Ver detalle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center ml-4 py-1 px-1.5"
                    onPress={() => alert(`Descargando ${item.numero}...`)}
                >
                    <Ionicons name="download-outline" size={18} color="#555" />
                    <Text className="text-xs text-gray-700 ml-1">Descargar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50 p-4">
            {/* Cabecera superior y Botón de Nueva Factura */}
            <View className="flex-row justify-between items-center mb-4">
                <View>
                    <Text className="text-xl font-bold text-gray-900">Facturas</Text>
                    <Text className="text-xs text-gray-500">Gestiona y crea tus facturas</Text>
                </View>
                <TouchableOpacity
                    className="bg-emerald-700 flex-row items-center px-3 py-2 rounded-lg"
                    onPress={() => navigation.navigate('CrearFacturaScreen')} // 🚀 ESPACIO DE RUTA A CREAR FACTURA
                >
                    <Ionicons name="add" size={18} color="#fff" />
                    <Text className="text-white font-bold text-xs ml-1">Nueva</Text>
                </TouchableOpacity>
            </View>

            {/* Barra de búsqueda interactiva */}
            <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-3 mb-4">
                <Ionicons name="search" size={18} color="#888" className="mr-2" />
                <TextInput
                    className="flex-1 h-10 text-xs text-gray-800"
                    placeholder="Buscar factura o cliente..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Lista de facturas optimizada para móvil */}
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