import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function StoreScreen() {
    return (
        <ScrollView className="flex-1 bg-gray-50 px-4 pt-6">
            {/* Encabezado */}
            <View className="mb-6">
                <Text className="text-3xl font-extrabold text-gray-900">Tienda</Text>
                <Text className="text-sm text-gray-500 mt-1">Explora nuestros productos disponibles</Text>
            </View>

            {/* Tarjeta de producto */}
            <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
                <View className="bg-blue-50 h-44 rounded-xl mb-3 items-center justify-center">
                    <Text className="text-blue-500 font-medium">Vista previa del producto</Text>
                </View>
                
                <Text className="text-lg font-bold text-gray-800 mb-1">Producto Destacado</Text>
                <Text className="text-sm text-gray-500 mb-4">Descripción breve del producto con diseño adaptable.</Text>
                
                <View className="flex-row items-center justify-between">
                    <Text className="text-xl font-bold text-blue-600">$45.000</Text>
                    <TouchableOpacity className="bg-blue-600 px-4 py-2.5 rounded-xl active:bg-blue-700">
                        <Text className="text-white font-semibold text-sm">Agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}