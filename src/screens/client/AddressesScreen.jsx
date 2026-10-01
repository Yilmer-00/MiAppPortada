import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AddressesScreen() {
    const navigation = useNavigation(); // Hook de navegación de React Navigation

    return (
        <ScrollView className="flex-1 bg-gray-50 px-4 pt-4" showsVerticalScrollIndicator={false}>

            {/* 1. SECCIÓN CABECERA */}
            <View className="mb-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-xs font-bold text-gray-400 tracking-wider">MIS UBICACIONES</Text>
                    <View className="bg-emerald-50 px-3 py-1 rounded-full flex-row items-center">
                        <Ionicons name="car-outline" size={14} color="#00C896" style={{ marginRight: 4 }} />
                        <Text className="text-xs font-bold text-[#00C896]">Envío Express</Text>
                    </View>
                </View>
                <Text className="text-xs font-semibold text-[#00C896] mt-1">● 2 direcciones guardadas</Text>
            </View>

            {/* 2. TARJETA 1: CASA (Predeterminada) */}
            <View className="bg-white rounded-3xl p-4 mb-4 shadow-sm border border-emerald-100">

                {/* Cabecera de la Tarjeta */}
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-row items-center flex-1">
                        <View className="bg-emerald-100 p-2.5 rounded-2xl mr-3">
                            <Ionicons name="home-outline" size={18} color="#00C896" />
                        </View>
                        <View className="flex-1">
                            <View className="flex-row items-center flex-wrap">
                                <Text className="text-base font-bold text-gray-900 mr-2">Casa</Text>
                                <View className="bg-emerald-100 px-2.5 py-0.5 rounded-full flex-row items-center">
                                    <Ionicons name="checkmark-circle" size={10} color="#00C896" style={{ marginRight: 2 }} />
                                    <Text className="text-[10px] font-bold text-[#00C896]">Predeterminada</Text>
                                </View>
                            </View>
                            <Text className="text-sm font-semibold text-gray-800 mt-1">Calle 45 # 12-34, Apto 502, Torre B</Text>
                            <Text className="text-xs text-gray-500">Chapinero, Bogotá, Colombia</Text>
                            <Text className="text-xs text-gray-500 mt-0.5">📞 +57 300 123 4567</Text>
                        </View>
                    </View>
                    <Ionicons name="location-outline" size={18} color="#9CA3AF" />
                </View>

                {/* Caja de Instrucción */}
                <View className="bg-gray-50 rounded-2xl p-3 my-3 border border-gray-100">
                    <Text className="text-xs text-gray-600 leading-4">
                        <Text className="font-bold text-gray-700">Instrucción:</Text> Dejar en portería con celador de turno si no respondo el citófono.
                    </Text>
                </View>

                {/* Pie de Tarjeta / Acciones con Rutas */}
                <View className="flex-row justify-between items-center pt-1 border-t border-gray-100 mt-1">
                    <View className="flex-row items-center">
                        <Feather name="shield" size={14} color="#00C896" style={{ marginRight: 4 }} />
                        <Text className="text-xs font-semibold text-emerald-700">Empoque ecológico asignado</Text>
                    </View>

                    <View className="flex-row items-center space-x-2">
                        {/* Botón Editar con Ruta */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditAddressScreen', { addressId: 'casa' })}
                            className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-xl mr-2"
                        >
                            <Feather name="edit-2" size={12} color="#4B5563" style={{ marginRight: 4 }} />
                            <Text className="text-xs font-semibold text-gray-700">Editar</Text>
                        </TouchableOpacity>

                        {/* Botón Eliminar */}
                        <TouchableOpacity
                            onPress={() => alert('¿Eliminar esta dirección?')}
                            className="bg-red-50 p-2 rounded-xl"
                        >
                            <Feather name="trash-2" size={14} color="#EF4444" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            {/* 3. TARJETA 2: GIMNASIO */}
            <View className="bg-white rounded-3xl p-4 mb-4 shadow-sm border border-gray-100">

                {/* Cabecera de la Tarjeta */}
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-row items-center flex-1">
                        <View className="bg-emerald-50 p-2.5 rounded-2xl mr-3">
                            <MaterialCommunityIcons name="dumbbell" size={18} color="#00C896" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-bold text-gray-900">Gimnasio</Text>
                            <Text className="text-sm font-semibold text-gray-800 mt-1">Cra 15 # 85-20, SmartFit El Virrey</Text>
                            <Text className="text-xs text-gray-500">Chicó Norte, Bogotá, Colombia</Text>
                            <Text className="text-xs text-gray-500 mt-0.5">📞 +57 312 987 6543</Text>
                        </View>
                    </View>
                    <Ionicons name="location-outline" size={18} color="#9CA3AF" />
                </View>

                {/* Caja de Instrucción */}
                <View className="bg-gray-50 rounded-2xl p-3 my-3 border border-gray-100">
                    <Text className="text-xs text-gray-600 leading-4">
                        <Text className="font-bold text-gray-700">Instrucción:</Text> Entrega en recepción de SmartFit a nombre de Yilmer M. (Locker 44).
                    </Text>
                </View>

                {/* Pie de Tarjeta / Acciones */}
                <View className="flex-row justify-between items-center pt-1 border-t border-gray-100 mt-1">
                    <TouchableOpacity className="flex-row items-center">
                        <View className="w-4 h-4 rounded-full border border-gray-400 mr-2 justify-center items-center" />
                        <Text className="text-xs font-semibold text-gray-600">Marcar como predeterminada</Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center space-x-2">
                        {/* Botón Editar con Ruta */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditAddressScreen', { addressId: 'gimnasio' })}
                            className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-xl mr-2"
                        >
                            <Feather name="edit-2" size={12} color="#4B5563" style={{ marginRight: 4 }} />
                            <Text className="text-xs font-semibold text-gray-700">Editar</Text>
                        </TouchableOpacity>

                        {/* Botón Eliminar */}
                        <TouchableOpacity
                            onPress={() => alert('¿Eliminar esta dirección?')}
                            className="bg-red-50 p-2 rounded-xl"
                        >
                            <Feather name="trash-2" size={14} color="#EF4444" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            {/* 4. BOTÓN CON RUTA: AGREGAR NUEVA DIRECCIÓN */}
            <TouchableOpacity
                onPress={() => navigation.navigate('AddAddressScreen')} // <--- AQUÍ CONFIGURAS TU RUTA PARA AÑADIR
                className="bg-emerald-50 border border-emerald-200 border-dashed rounded-2xl py-4 flex-row justify-center items-center mb-6"
            >
                <View className="bg-[#00C896] w-6 h-6 rounded-full items-center justify-center mr-2">
                    <Ionicons name="add" size={16} color="white" />
                </View>
                <Text className="text-[#00C896] font-bold text-sm">Agregar Nueva Dirección</Text>
            </TouchableOpacity>

            {/* 5. BANNER INFERIOR: HORARIOS DE FRESCURA NUTRIK */}
            <View className="bg-emerald-50 rounded-3xl p-4 mb-10 border border-emerald-100 flex-row items-center">
                <View className="bg-white p-3 rounded-2xl mr-3 shadow-sm">
                    <MaterialCommunityIcons name="food-apple-outline" size={24} color="#00C896" />
                </View>
                <View className="flex-1">
                    <Text className="text-sm font-bold text-gray-800">Horarios de Frescura Nutrik</Text>
                    <Text className="text-xs text-gray-500 mt-0.5 leading-4">
                        Tus batidos fríos y suplementos se despachan con aislamiento térmico sostenible según la dirección seleccionada.
                    </Text>
                </View>
            </View>

        </ScrollView>
    );
}