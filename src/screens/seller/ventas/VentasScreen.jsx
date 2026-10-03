import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function VentasScreen() {
    const navigation = useNavigation();
    const [dateRange] = useState('01/08/2024 - 25/08/2024');

    // Datos de ejemplo para las categorías (Alternativa limpia y legible al gráfico circular en móvil)
    const categoriasVentas = [
        { nombre: 'Proteínas', porcentaje: 40, color: 'bg-emerald-700', text: 'text-emerald-700', monto: '$ 3.380.000' },
        { nombre: 'Snacks', porcentaje: 25, color: 'bg-blue-600', text: 'text-blue-600', monto: '$ 2.112.500' },
        { nombre: 'Vitaminas', porcentaje: 20, color: 'bg-amber-500', text: 'text-amber-500', monto: '$ 1.690.000' },
        { nombre: 'Bebidas', porcentaje: 15, color: 'bg-purple-600', text: 'text-purple-600', monto: '$ 1.267.500' },
    ];

    return (
        
        <ScrollView className="flex-1 bg-gray-50 p-4 pt-6" showsVerticalScrollIndicator={false}>

            {/* Cabecera y Selector de Fechas */}
            <Animated.View entering={FadeInDown.duration(400).springify()} className="flex-row justify-between items-start mb-4">
                <View>
                    <Text className="text-xl font-bold text-gray-900">Ventas y estadísticas</Text>
                    <Text className="text-xs text-gray-500">Analiza el rendimiento de tu tienda</Text>
                </View>

                <TouchableOpacity
                    className="flex-row items-center bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm"
                    onPress={() => alert('Abrir selector de fechas')}
                >
                    <Ionicons name="calendar-outline" size={14} color="#4b5563" />
                    <Text className="text-xs font-medium text-gray-700 ml-1.5">{dateRange}</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Tarjetas de Métricas Principales (Grid 2x2 optimizado para móvil) */}
            <Animated.View entering={FadeInDown.delay(100).duration(400).springify()} className="flex-row flex-wrap justify-between mb-4">

                {/* Ventas Totales */}
                <View className="w-[48%] bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm mb-3">
                    <Text className="text-xs text-gray-500 mb-1">Ventas totales</Text>
                    <Text className="text-base font-extrabold text-gray-900 mb-1">$ 8.450.000</Text>
                    <View className="flex-row items-center">
                        <Ionicons name="trending-up" size={12} color="#137333" />
                        <Text className="text-[11px] font-bold text-emerald-700 ml-1">+12.5% <Text className="text-gray-400 font-normal">vs último mes</Text></Text>
                    </View>
                </View>

                {/* Ganancias */}
                <View className="w-[48%] bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm mb-3">
                    <Text className="text-xs text-gray-500 mb-1">Ganancias</Text>
                    <Text className="text-base font-extrabold text-gray-900 mb-1">$ 3.120.000</Text>
                    <View className="flex-row items-center">
                        <Ionicons name="trending-up" size={12} color="#137333" />
                        <Text className="text-[11px] font-bold text-emerald-700 ml-1">+10.3% <Text className="text-gray-400 font-normal">vs último mes</Text></Text>
                    </View>
                </View>

                {/* Pedidos */}
                <View className="w-[48%] bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                    <Text className="text-xs text-gray-500 mb-1">Pedidos</Text>
                    <Text className="text-base font-extrabold text-gray-900 mb-1">152</Text>
                    <View className="flex-row items-center">
                        <Ionicons name="trending-up" size={12} color="#137333" />
                        <Text className="text-[11px] font-bold text-emerald-700 ml-1">+8.2% <Text className="text-gray-400 font-normal">vs último mes</Text></Text>
                    </View>
                </View>

                {/* Ticket Promedio */}
                <View className="w-[48%] bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                    <Text className="text-xs text-gray-500 mb-1">Ticket promedio</Text>
                    <Text className="text-base font-extrabold text-gray-900 mb-1">$ 55.590</Text>
                    <View className="flex-row items-center">
                        <Ionicons name="trending-up" size={12} color="#137333" />
                        <Text className="text-[11px] font-bold text-emerald-700 ml-1">+6.1% <Text className="text-gray-400 font-normal">vs último mes</Text></Text>
                    </View>
                </View>

            </Animated.View>

            {/* Sección: Ventas por Día (Gráfica de tendencia simulada / limpia) */}
            <Animated.View entering={FadeInUp.delay(200).duration(400).springify()} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-sm font-bold text-gray-900">Ventas por día</Text>
                    <MaterialCommunityIcons name="chart-line" size={18} color="#137333" />
                </View>

                {/* Simulación visual de gráfico de líneas adaptado a móvil */}
                <View className="h-32 justify-center items-center bg-gray-50 rounded-lg border border-dashed border-gray-200 mb-3">
                    <Text className="text-xs text-gray-400 text-center px-4">
                        📈 Tendencia alta en los últimos 3 días (Pico máximo: $900k)
                    </Text>
                </View>

                <View className="flex-row justify-between text-gray-400 px-1">
                    <Text className="text-[10px] text-gray-400">19/08</Text>
                    <Text className="text-[10px] text-gray-400">21/08</Text>
                    <Text className="text-[10px] text-gray-400">23/08</Text>
                    <Text className="text-[10px] text-gray-400">25/08</Text>
                </View>
            </Animated.View>

            {/* Sección: Ventas por Categoría */}
            <Animated.View entering={FadeInUp.delay(300).duration(400).springify()} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6">
                <Text className="text-sm font-bold text-gray-900 mb-3">Ventas por categoría</Text>

                {categoriasVentas.map((cat, index) => (
                    <View key={index} className="mb-3">
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className="text-xs font-semibold text-gray-700">{cat.nombre}</Text>
                            <Text className="text-xs font-bold text-gray-900">{cat.monto} <Text className={`font-bold ${cat.text}`}>({cat.porcentaje}%)</Text></Text>
                        </View>
                        {/* Barra de progreso */}
                        <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <View className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.porcentaje}%` }} />
                        </View>
                    </View>
                ))}
            </Animated.View>

            {/* 🚀 ESPACIO DE RUTA PARA PRÓXIMAS VENTANAS (Ej: Reportes detallados o Exportar PDF) */}
            <Animated.View entering={FadeInUp.delay(400).duration(400).springify()} className="mb-6">
                <TouchableOpacity
                    className="bg-emerald-700 py-3.5 rounded-xl flex-row justify-center items-center shadow-sm"
                    onPress={() => navigation.navigate('ReporteDetalladoScreen')} // 👈 Ruta para próxima ventana
                >
                    <Ionicons name="document-text-outline" size={18} color="#fff" />
                    <Text className="text-white font-bold text-sm ml-2">Ver reporte detallado y exportar</Text>
                </TouchableOpacity>
            </Animated.View>

        </ScrollView>
    );
}