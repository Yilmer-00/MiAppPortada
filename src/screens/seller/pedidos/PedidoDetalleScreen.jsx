import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { usePedidos } from '../../../context/PedidosContext';

const LISTA_ESTADOS = ['Pendiente', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'];

export default function PedidoDetalleScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { pedidos, cambiarEstadoPedido } = usePedidos();

    const { pedidoId, pedidoParam } = route.params || {};
    const pedido = pedidos.find(p => p.id === pedidoId) || pedidoParam;

    const volverAPedidos = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Pedidos' }],
        });
    };

    const handleCambiarEstado = (nuevoEstado) => {
        cambiarEstadoPedido(pedido.id, nuevoEstado);
        Alert.alert("Estado Actualizado", `El pedido ahora está en estado "${nuevoEstado}".`);
    };


    return (
        <ScrollView className="flex-1 bg-white">
            {/* Cabecera Verde Pantalla Completa */}
            <View className="bg-emerald-600 p-5 pt-6">
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1 mr-2">
                        <Text className="text-2xl font-extrabold text-white">Pedido #{pedido.numero.replace('PED-', '')}</Text>
                        <Text className="text-sm text-emerald-100 font-medium">{pedido.cliente}</Text>
                    </View>


                </View>

                {/* Selector de Estado interactivo */}
                <Text className="text-xs text-emerald-100 font-bold mb-2">Cambiar estado del pedido:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                    {LISTA_ESTADOS.map((estado) => (
                        <TouchableOpacity
                            key={estado}
                            onPress={() => handleCambiarEstado(estado)}
                            className={`px-3 py-1.5 rounded-full mr-2 border ${pedido.estado === estado
                                    ? 'bg-white border-white'
                                    : 'bg-emerald-700/60 border-emerald-500'
                                }`}
                        >
                            <Text
                                className={`text-xs font-bold ${pedido.estado === estado ? 'text-emerald-800' : 'text-white'
                                    }`}
                            >
                                {estado}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Metadata del Pedido (Ancho completo) */}
            <View className="bg-gray-50 px-5 py-3.5 border-b border-gray-200 flex-row flex-wrap justify-between items-center gap-y-2">
                <View className="flex-row items-center mr-2">
                    <Ionicons name="calendar-outline" size={15} color="#6b7280" />
                    <Text className="text-xs text-gray-600 ml-1.5">{pedido.fecha}</Text>
                </View>

                <View className="flex-row items-center mr-2">
                    <Ionicons name="location-outline" size={15} color="#dc2626" />
                    <Text className="text-xs text-gray-600 ml-1.5 font-medium">{pedido.direccion}</Text>
                </View>

                <View className="flex-row items-center">
                    <Ionicons name="card-outline" size={15} color="#d97706" />
                    <Text className="text-xs text-gray-600 ml-1.5">{pedido.metodoPago}</Text>
                </View>
            </View>

            {/* Lista de productos */}
            <View className="p-5 space-y-3">
                <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Productos</Text>
                {pedido.items?.map((item) => (
                    <View key={item.id} className="bg-white border border-gray-200 rounded-2xl p-3 flex-row items-center shadow-xs">
                        <Image
                            source={{ uri: item.imagen }}
                            className="w-14 h-14 rounded-xl bg-gray-50 mr-3"
                        />
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-gray-800" numberOfLines={1}>{item.nombre}</Text>
                            <Text className="text-xs text-gray-400 font-medium">{item.precioUnitario}</Text>
                        </View>
                        <Text className="text-base font-extrabold text-emerald-600 ml-2">{item.subtotal}</Text>
                    </View>
                ))}

                {/* Desglose Totales */}
                <View className="pt-4 border-t border-dashed border-gray-200 mt-4 space-y-2">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-xs font-semibold text-gray-500">Subtotal</Text>
                        <Text className="text-xs font-bold text-gray-700">{pedido.subtotal || pedido.total}</Text>
                    </View>

                    <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
                        <Text className="text-base font-extrabold text-gray-900">Total del pedido</Text>
                        <Text className="text-2xl font-black text-emerald-600">{pedido.total}</Text>
                    </View>
                </View>

                {/* Botón Inferior Cerrar */}
                <TouchableOpacity
                    className="border border-emerald-600 py-3.5 rounded-2xl items-center bg-white mt-6 mb-8"
                    onPress={volverAPedidos}
                >
                    <Text className="text-emerald-700 font-bold text-sm">Cerrar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}