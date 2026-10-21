import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

// Datos de ejemplo (puedes reemplazarlo por tu API o contexto global)
const INITIAL_FACTURAS = [
    { id: '1', numero: 'FAC-0001', cliente: 'Juan Pérez', fecha: '25/08/2024', total: '$ 150.000', estado: 'Pagada' },
    { id: '2', numero: 'FAC-0002', cliente: 'Ana López', fecha: '24/08/2024', total: '$ 230.000', estado: 'Pagada' },
    { id: '3', numero: 'FAC-0003', cliente: 'Pedro Gómez', fecha: '24/08/2024', total: '$ 89.000', estado: 'Pendiente' },
    { id: '4', numero: 'FAC-0004', cliente: 'María Torres', fecha: '23/08/2024', total: '$ 120.000', estado: 'Pagada' },
    { id: '5', numero: 'FAC-0005', cliente: 'Luis Ramírez', fecha: '23/08/2024', total: '$ 75.000', estado: 'Pendiente' },
];

export default function FacturaDetalleScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    // Extraemos de forma segura los parámetros (puede venir 'facturaId' o el objeto 'factura')
    const { facturaId, factura: facturaParam } = route.params || {};

    // Buscamos la factura por ID o usamos el parámetro directo
    const invoice = facturaParam || INITIAL_FACTURAS.find(f => f.id === facturaId);

    // Validación defensiva por si no se encuentra la factura
    if (!invoice) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50 p-4">
                <Ionicons name="alert-circle-outline" size={48} color="#9ca3af" />
                <Text className="text-base text-gray-600 mt-2 mb-4">No se encontró la información de la factura.</Text>
                <TouchableOpacity
                    className="bg-emerald-700 px-4 py-2 rounded-lg"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="text-white font-bold text-xs">Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const isPaid = invoice.estado === 'Pagada';

    return (
        <ScrollView className="flex-1 bg-gray-50 p-4">
            {/* Botón de retroceso */}
            <TouchableOpacity
                className="flex-row items-center mb-4 py-1"
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={20} color="#374151" />
                <Text className="text-xs font-semibold text-gray-700 ml-1">Volver</Text>
            </TouchableOpacity>

            {/* Tarjeta de detalles */}
            <View className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold text-gray-900">{invoice.numero}</Text>
                    <View className={`px-3 py-1 rounded-md ${isPaid ? 'bg-green-50' : 'bg-amber-50'}`}>
                        <Text className={`text-xs font-bold ${isPaid ? 'text-green-700' : 'text-amber-700'}`}>
                            {invoice.estado}
                        </Text>
                    </View>
                </View>

                <Text className="text-xs text-gray-500 mb-2">
                    Cliente: <Text className="font-semibold text-gray-800">{invoice.cliente}</Text>
                </Text>
                <Text className="text-xs text-gray-500 mb-4">
                    Fecha de emisión: <Text className="font-semibold text-gray-800">{invoice.fecha}</Text>
                </Text>

                <View className="border-t border-gray-100 pt-4 flex-row justify-between items-center">
                    <Text className="text-sm font-bold text-gray-900">Total:</Text>
                    <Text className="text-lg font-extrabold text-emerald-700">{invoice.total}</Text>
                </View>
            </View>
        </ScrollView>
    );
}