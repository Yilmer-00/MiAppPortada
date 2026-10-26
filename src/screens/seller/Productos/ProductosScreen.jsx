import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useProductos } from '../../../context/ProductosContext';

export default function ProductosScreen() {
    const navigation = useNavigation();
    const { productos, eliminarProducto } = useProductos();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProductos = productos.filter(p =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEliminar = (item) => {
        Alert.alert(
            "Eliminar producto",
            `¿Estás seguro de que deseas eliminar "${item.nombre}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive", 
                    onPress: () => eliminarProducto(item.id) 
                }
            ]
        );
    };

    const renderProductoCard = ({ item }) => (
        <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm flex-row items-center">
            <Image
                source={{ uri: item.imagen || 'https://via.placeholder.com/100' }}
                className="w-14 h-14 rounded-lg bg-gray-100 mr-3"
            />

            <View className="flex-1">
                <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-sm font-bold text-gray-900 flex-1 mr-2" numberOfLines={1}>
                        {item.nombre}
                    </Text>
                    <View className={`px-2 py-0.5 rounded-md ${item.estado === 'Activo' ? 'bg-green-50' : 'bg-red-50'}`}>
                        <Text className={`text-[10px] font-bold ${item.estado === 'Activo' ? 'text-green-700' : 'text-red-700'}`}>
                            {item.estado}
                        </Text>
                    </View>
                </View>

                <Text className="text-xs text-gray-500 mb-2">
                    Categoría: <Text className="font-semibold text-gray-700">{item.categoria}</Text>
                </Text>

                <View className="flex-row justify-between items-center border-t border-gray-100 pt-2">
                    <View>
                        <Text className="text-sm font-extrabold text-gray-900">{item.precio}</Text>
                        <Text className="text-[11px] text-gray-500">Stock: {item.stock} un.</Text>
                    </View>

                    <View className="flex-row items-center space-x-3">
                        <TouchableOpacity
                            className="p-1.5 bg-gray-50 rounded-lg border border-gray-200"
                            onPress={() => navigation.navigate('EditarProductoScreen', { producto: item })}
                        >
                            <Ionicons name="pencil-outline" size={16} color="#4b5563" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="p-1.5 bg-red-50 rounded-lg border border-red-100 ml-2"
                            onPress={() => handleEliminar(item)}
                        >
                            <Ionicons name="trash-outline" size={16} color="#dc2626" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50 p-4">
            <View className="flex-row justify-between items-center mb-4">
                <View>
                    <Text className="text-xl font-bold text-gray-900">Productos</Text>
                    <Text className="text-xs text-gray-500">Administra los productos de tu tienda</Text>
                </View>
                <TouchableOpacity
                    className="bg-emerald-700 flex-row items-center px-3 py-2 rounded-lg shadow-sm"
                    onPress={() => navigation.navigate('CrearProductoScreen')}
                >
                    <Ionicons name="add" size={18} color="#fff" />
                    <Text className="text-white font-bold text-xs ml-1">Nuevo</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-3 mb-4">
                <Ionicons name="search" size={18} color="#888" className="mr-2" />
                <TextInput
                    className="flex-1 h-10 text-xs text-gray-800"
                    placeholder="Buscar producto o categoría..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={filteredProductos}
                keyExtractor={(item) => item.id}
                renderItem={renderProductoCard}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}