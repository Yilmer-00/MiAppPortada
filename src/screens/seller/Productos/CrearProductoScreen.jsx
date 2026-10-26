import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useProductos } from '../../../context/ProductosContext';

export default function CrearProductoScreen() {
    const navigation = useNavigation();
    const { agregarProducto } = useProductos();

    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [imagen, setImagen] = useState('https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100');

    const handleGuardar = () => {
        if (!nombre.trim() || !categoria.trim() || !precio.trim() || !stock.trim()) {
            Alert.alert('Error', 'Por favor completa los campos principales');
            return;
        }

        agregarProducto({
            nombre,
            categoria,
            precio: precio.startsWith('$') ? precio : `$ ${precio}`,
            stock,
            estado,
            imagen,
        });

    
    };
    const volverProductos = () => {
        navigation.navigate("Productos");
    };

    return (
        <ScrollView className="flex-1 bg-gray-50 p-4">
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress= {volverProductos} className="mr-3">
                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Nuevo Producto</Text>
            </View>

            <View className="bg-white p-4 rounded-xl border border-gray-100 space-y-4">
                <View>
                    <Text className="text-xs font-semibold text-gray-700 mb-1">Nombre del producto</Text>
                    <TextInput
                        className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-800"
                        placeholder="Ej. Proteína Whey"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                </View>

                <View>
                    <Text className="text-xs font-semibold text-gray-700 mb-1">Categoría</Text>
                    <TextInput
                        className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-800"
                        placeholder="Ej. Proteínas"
                        value={categoria}
                        onChangeText={setCategoria}
                    />
                </View>

                <View className="flex-row space-x-3">
                    <View className="flex-1">
                        <Text className="text-xs font-semibold text-gray-700 mb-1">Precio</Text>
                        <TextInput
                            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-800"
                            placeholder="85.000"
                            keyboardType="numeric"
                            value={precio}
                            onChangeText={setPrecio}
                        />
                    </View>

                    <View className="flex-1 ml-2">
                        <Text className="text-xs font-semibold text-gray-700 mb-1">Stock</Text>
                        <TextInput
                            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-800"
                            placeholder="45"
                            keyboardType="numeric"
                            value={stock}
                            onChangeText={setStock}
                        />
                    </View>
                </View>

                <View>
                    <Text className="text-xs font-semibold text-gray-700 mb-1">URL Imagen (Opcional)</Text>
                    <TextInput
                        className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-800"
                        placeholder="https://..."
                        value={imagen}
                        onChangeText={setImagen}
                    />
                </View>

                <View>
                    <Text className="text-xs font-semibold text-gray-700 mb-2">Estado</Text>
                    <View className="flex-row space-x-2">
                        <TouchableOpacity
                            className={`flex-1 py-2 rounded-lg items-center ${estado === 'Activo' ? 'bg-emerald-700' : 'bg-gray-100'}`}
                            onPress={() => setEstado('Activo')}
                        >
                            <Text className={`text-xs font-bold ${estado === 'Activo' ? 'text-white' : 'text-gray-600'}`}>Activo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-1 py-2 rounded-lg items-center ml-2 ${estado === 'Inactivo' ? 'bg-red-600' : 'bg-gray-100'}`}
                            onPress={() => setEstado('Inactivo')}
                        >
                            <Text className={`text-xs font-bold ${estado === 'Inactivo' ? 'text-white' : 'text-gray-600'}`}>Inactivo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    className="bg-emerald-700 py-3 rounded-lg items-center mt-4"
                    onPress= {volverProductos}
                >
                    <Text className="text-white font-bold text-sm">Guardar Producto</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}