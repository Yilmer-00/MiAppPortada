import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Datos de ejemplo basados en tu diseño web de productos
const INITIAL_PRODUCTOS = [
    { id: '1', nombre: 'Proteína Whey', categoria: 'Proteínas', precio: '$ 85.000', stock: '45', estado: 'Activo', imagen: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100' },
    { id: '2', nombre: 'Barra de Proteína', categoria: 'Snacks', precio: '$6.500', stock: '120', estado: 'Activo', imagen: 'https://images.unsplash.com/photo-1622484214376-78b172a6a160?w=100' }, { id: '3', nombre: 'Vitamina C', categoria: 'Vitaminas', precio: '$ 35.000', stock: '80', estado: 'Activo', imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100' },
    { id: '4', nombre: 'Avena en Hojuelas', categoria: 'Granos', precio: '$8.900', stock: '60', estado: 'Activo', imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100' }, { id: '5', nombre: 'Aceite de Coco', categoria: 'Saludable', precio: '$ 28.000', stock: '30', estado: 'Inactivo', imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100' },
];

export default function ProductosScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [productos] = useState(INITIAL_PRODUCTOS);

    // Filtrar productos de forma reactiva por nombre o categoría
    const filteredProductos = productos.filter(p =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderProductoCard = ({ item }) => (
        <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm flex-row items-center">
            {/* Imagen del producto */}
            <Image
                source={{ uri: item.imagen }}
                className="w-14 h-14 rounded-lg bg-gray-100 mr-3"
            />

            {/* Información del producto */}
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

                {/* Precios, stock y acciones */}
                <View className="flex-row justify-between items-center border-t border-gray-100 pt-2">
                    <View>
                        <Text className="text-sm font-extrabold text-gray-900">{item.precio}</Text>
                        <Text className="text-[11px] text-gray-500">Stock: {item.stock} un.</Text>
                    </View>

                    {/* Botones de acción (Editar y Eliminar) */}
                    <View className="flex-row items-center space-x-3">
                        <TouchableOpacity
                            className="p-1.5 bg-gray-50 rounded-lg border border-gray-200"
                            onPress={() => navigation.navigate('EditarProductoScreen', { producto: item })} // 🚀 ESPACIO DE RUTA A EDITAR
                        >
                            <Ionicons name="pencil-outline" size={16} color="#4b5563" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="p-1.5 bg-red-50 rounded-lg border border-red-100 ml-2"
                            onPress={() => alert(`Eliminar producto: ${item.nombre}`)}
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
            {/* Cabecera superior y Botón de Nuevo Producto */}
            <View className="flex-row justify-between items-center mb-4">
                <View>
                    <Text className="text-xl font-bold text-gray-900">Productos</Text>
                    <Text className="text-xs text-gray-500">Administra los productos de tu tienda</Text>
                </View>
                <TouchableOpacity
                    className="bg-emerald-700 flex-row items-center px-3 py-2 rounded-lg shadow-sm"
                    onPress={() => navigation.navigate('CrearProductoScreen')} // 🚀 ESPACIO DE RUTA A NUEVO PRODUCTO
                >
                    <Ionicons name="add" size={18} color="#fff" />
                    <Text className="text-white font-bold text-xs ml-1">Nuevo</Text>
                </TouchableOpacity>
            </View>

            {/* Barra de búsqueda interactiva */}
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

            {/* Lista optimizada de productos */}
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