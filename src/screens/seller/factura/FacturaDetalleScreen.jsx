import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function FacturaDetalleScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { factura } = route.params || {};

    const handleDescargar = () => {
        Alert.alert(
            "Descargar Factura",
            `Se ha generado la descarga del documento PDF para ${factura?.numeroFactura || 'la factura'}.`,
            [{ text: "Aceptar" }]
        );
    };

    if (!factura) {
        return (
            <View className="flex-1 items-center justify-center p-4 bg-gray-50">
                <Text className="text-gray-500">No se encontró información de la factura.</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-50 p-4">
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => navigation.navigate('Facturas')} className="mr-3">
                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Detalle {factura.numeroFactura}</Text>
            </View>

            <View className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 mb-6">
                <View className="flex-row justify-between items-center pb-3 border-b border-gray-100">
                    <View>
                        <Text className="text-xs text-gray-400">Cliente</Text>
                        <Text className="text-base font-bold text-gray-800">{factura.cliente}</Text>
                        <Text className="text-xs text-gray-500">Doc: {factura.documentoCliente || 'N/A'}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${factura.estado === 'Pagada' ? 'bg-green-100' : 'bg-amber-100'}`}>
                        <Text className={`text-xs font-bold ${factura.estado === 'Pagada' ? 'text-green-800' : 'text-amber-800'}`}>
                            {factura.estado}
                        </Text>
                    </View>
                </View>

                <Text className="text-xs font-bold text-gray-700 mt-2 mb-1">Ítems de la Factura</Text>
                {factura.items?.map((item, index) => (
                    <View key={index} className="flex-row justify-between items-center py-2 border-b border-gray-50">
                        <View className="flex-1">
                            <Text className="text-xs font-semibold text-gray-800">{item.nombre}</Text>
                            <Text className="text-[11px] text-gray-400">{item.cantidad} x {item.precioUnitario}</Text>
                        </View>
                        <Text className="text-xs font-bold text-gray-900">{item.subtotal}</Text>
                    </View>
                ))}

                <View className="flex-row justify-between items-center pt-3 border-t border-gray-200 mt-2">
                    <Text className="text-sm font-bold text-gray-900">Total a Pagar</Text>
                    <Text className="text-lg font-extrabold text-emerald-700">{factura.total}</Text>
                </View>
            </View>

            <TouchableOpacity
                className="bg-emerald-700 flex-row items-center justify-center py-3 rounded-xl shadow-sm"
                onPress={handleDescargar}
            >
                <Ionicons name="download-outline" size={20} color="#fff" />
                <Text className="text-white font-bold text-sm ml-2">Descargar Factura PDF</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}