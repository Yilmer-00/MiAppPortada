import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { usePedidos } from '../../../context/PedidosContext';

const ESTADOS = ['Todos', 'Pendiente', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'];

export default function PedidosScreen() {
    
    const navigation = useNavigation();
    const { pedidos } = usePedidos();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEstado, setSelectedEstado] = useState('Todos');

    const filteredPedidos = pedidos.filter(p => {
        const matchesSearch =
            p.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.cliente.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesEstado = selectedEstado === 'Todos' || p.estado === selectedEstado;

        return matchesSearch && matchesEstado;
    });

    const getBadgeStyle = (estado) => {
        switch (estado) {
            case 'Pendiente': return { bg: 'bg-amber-50', text: 'text-amber-700' };
            case 'En preparación': return { bg: 'bg-blue-50', text: 'text-blue-700' };
            case 'Enviado': return { bg: 'bg-purple-50', text: 'text-purple-700' };
            case 'Entregado': return { bg: 'bg-green-50', text: 'text-green-700' };
            case 'Cancelado': return { bg: 'bg-red-50', text: 'text-red-700' };
            default: return { bg: 'bg-gray-50', text: 'text-gray-700' };
        }
    };

    const renderPedidoCard = ({ item }) => {
        const badgeStyle = getBadgeStyle(item.estado);

        return (
            <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-base font-bold text-gray-900">{item.numero}</Text>
                    <View className={`px-2.5 py-1 rounded-md ${badgeStyle.bg}`}>
                        <Text className={`text-xs font-bold ${badgeStyle.text}`}>{item.estado}</Text>
                    </View>
                </View>

                <Text className="text-xs text-gray-500 mb-3">
                    Cliente: <Text className="font-semibold text-gray-800">{item.cliente}</Text>
                </Text>

                <View className="flex-row justify-between items-center border-t border-gray-100 pt-2.5 mb-2">
                    <Text className="text-xs text-gray-500">📅 {item.fecha}</Text>
                    <Text className="text-base font-bold text-gray-900">{item.total}</Text>
                </View>

                <View className="flex-row justify-end border-t border-gray-100 pt-2.5">
                    <TouchableOpacity
                        className="flex-row items-center py-1 px-2.5 bg-gray-50 rounded-lg border border-gray-200"
                        onPress={() => navigation.navigate('PedidoDetalleScreen', { pedidoId: item.id, pedidoParam: item })}
                    >
                        <Ionicons name="eye-outline" size={16} color="#137333" />
                        <Text className="text-xs font-medium text-gray-700 ml-1.5">Ver detalle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-gray-50 p-4">
            <View className="mb-4">
                <Text className="text-xl font-bold text-gray-900">Pedidos</Text>
                <Text className="text-xs text-gray-500">Gestiona los pedidos de tus clientes</Text>
            </View>

            <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-3 mb-3">
                <Ionicons name="search" size={18} color="#888" className="mr-2" />
                <TextInput
                    className="flex-1 h-10 text-xs text-gray-800"
                    placeholder="Buscar pedido o cliente..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View className="mb-3">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-1">
                    {ESTADOS.map((estado) => (
                        <TouchableOpacity
                            key={estado}
                            onPress={() => setSelectedEstado(estado)}
                            className={`px-3 py-1.5 rounded-full mr-2 border ${selectedEstado === estado
                                ? 'bg-emerald-700 border-emerald-700'
                                : 'bg-white border-gray-200'
                                }`}
                        >
                            <Text className={`text-xs font-medium ${selectedEstado === estado ? 'text-white' : 'text-gray-600'}`}>
                                {estado}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredPedidos}
                keyExtractor={(item) => item.id}
                renderItem={renderPedidoCard}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}