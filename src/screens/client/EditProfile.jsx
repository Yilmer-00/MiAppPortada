import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Switch
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function EditProfile({ navigation }) {
    // Estados para los campos editables y toggles
    const [nombre, setNombre] = useState('Yilmer Melenge');
    const [email, setEmail] = useState('yilmer.melenge@ejemplo.com');
    const [telefono, setTelefono] = useState('300 123 4567');
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);

    return (
        <ScrollView className="flex-1 bg-gray-50 px-4 pt-4" showsVerticalScrollIndicator={false}>

            {/* 1. SECCIÓN DE CABECERA & FOTO DE PERFIL */}
            <View className="items-center mt-4 mb-6">
                <View className="relative">
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60' }} // Reemplaza con tu imagen o require() local
                        className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                    />
                    {/* Botón de cámara */}
                    <TouchableOpacity className="absolute bottom-0 right-0 bg-[#00C896] p-2 rounded-full border-2 border-white">
                        <Ionicons name="camera" size={16} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Nombre y Membresía */}
                <View className="flex-row items-center mt-3">
                    <Text className="text-xl font-bold text-gray-900 mr-1">{nombre}</Text>
                    <Ionicons name="checkmark-circle" size={18} color="#00C896" />
                </View>
                <Text className="text-sm text-gray-500 mt-0.5">Miembro Nutrik Pro • Desde 2023</Text>
            </View>

            {/* 2. SECCIÓN: DATOS BÁSICOS */}
            <View className="mb-6">
                <View className="flex-row justify-between items-center mb-2 px-1">
                    <Text className="text-xs font-bold text-gray-400 tracking-wider">DATOS BÁSICOS</Text>
                    <Text className="text-xs font-semibold text-[#00C896]">● Perfil 95% completo</Text>
                </View>

                <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-4">

                    {/* Nombre Completo */}
                    <View>
                        <View className="flex-row items-center mb-1">
                            <Feather name="user" size={14} color="#6B7280" />
                            <Text className="text-xs text-gray-500 ml-1.5 font-medium">Nombre Completo</Text>
                        </View>
                        <TextInput
                            className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 text-sm font-medium"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                    </View>

                    {/* Correo Electrónico */}
                    <View>
                        <View className="flex-row justify-between items-center mb-1">
                            <View className="flex-row items-center">
                                <Feather name="mail" size={14} color="#6B7280" />
                                <Text className="text-xs text-gray-500 ml-1.5 font-medium">Correo Electrónico</Text>
                            </View>
                            <View className="bg-emerald-50 px-2.5 py-0.5 rounded-full flex-row items-center">
                                <Ionicons name="checkmark-circle-outline" size={12} color="#00C896" />
                                <Text className="text-[10px] font-bold text-[#00C896] ml-1">Verificado</Text>
                            </View>
                        </View>
                        <TextInput
                            className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 text-sm font-medium"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Teléfono Móvil */}
                    <View>
                        <View className="flex-row items-center mb-1">
                            <Feather name="phone" size={14} color="#6B7280" />
                            <Text className="text-xs text-gray-500 ml-1.5 font-medium">Teléfono Móvil</Text>
                        </View>
                        <View className="flex-row space-x-2">
                            <View className="bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3 flex-row items-center justify-center">
                                <Text className="text-sm mr-1">🇨🇴</Text>
                                <Text className="text-sm font-bold text-gray-700">+57</Text>
                            </View>
                            <TextInput
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 text-sm font-medium"
                                value={telefono}
                                onChangeText={setTelefono}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Nacimiento y Género (Grid de 2 columnas) */}
                    <View className="flex-row space-x-3">
                        <View className="flex-1">
                            <View className="flex-row items-center mb-1">
                                <Feather name="calendar" size={14} color="#6B7280" />
                                <Text className="text-xs text-gray-500 ml-1.5 font-medium">Nacimiento</Text>
                            </View>
                            <View className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5">
                                <Text className="text-sm text-gray-800 font-medium">14 May 1994</Text>
                            </View>
                        </View>

                        <View className="flex-1">
                            <View className="flex-row items-center mb-1">
                                <Feather name="users" size={14} color="#6B7280" />
                                <Text className="text-xs text-gray-500 ml-1.5 font-medium">Género</Text>
                            </View>
                            <View className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 flex-row justify-between items-center">
                                <Text className="text-sm text-gray-800 font-medium">Masculino</Text>
                                <Ionicons name="chevron-down" size={16} color="#6B7280" />
                            </View>
                        </View>
                    </View>

                </View>
            </View>

            {/* 3. SECCIÓN: SEGURIDAD & ACCESO */}
            <View className="mb-6">
                <Text className="text-xs font-bold text-gray-400 tracking-wider mb-2 px-1">SEGURIDAD & ACCESO</Text>

                <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-4">

                    {/* Contraseña con Ruta */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ChangePasswordScreen')} // <--- AQUÍ CONFIGURAS TU RUTA
                        className="flex-row items-center justify-between py-1"
                    >
                        <View className="flex-row items-center">
                            <View className="bg-emerald-50 p-2.5 rounded-2xl mr-3">
                                <Feather name="lock" size={18} color="#00C896" />
                            </View>
                            <View>
                                <Text className="text-sm font-bold text-gray-800">Contraseña</Text>
                                <Text className="text-xs text-gray-400 tracking-widest mt-0.5">••••••••••••</Text>
                            </View>
                        </View>
                        <View className="bg-gray-100 px-3.5 py-1.5 rounded-full">
                            <Text className="text-xs font-semibold text-gray-600">Modificar</Text>
                        </View>
                    </TouchableOpacity>

                    <View className="h-[1px] bg-gray-100 my-1" />

                    {/* Verificación 2 Pasos */}
                    <View className="flex-row items-center justify-between py-1">
                        <View className="flex-row items-center">
                            <View className="bg-emerald-50 p-2.5 rounded-2xl mr-3">
                                <MaterialCommunityIcons name="shield-check-outline" size={18} color="#00C896" />
                            </View>
                            <View>
                                <Text className="text-sm font-bold text-gray-800">Verificación 2 Pasos</Text>
                                <Text className="text-xs text-gray-400 mt-0.5">Protección por SMS / App</Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: "#D1D5DB", true: "#00C896" }}
                            thumbColor={"#ffffff"}
                            ios_backgroundColor="#D1D5DB"
                            onValueChange={setIs2FAEnabled}
                            value={is2FAEnabled}
                        />
                    </View>

                </View>
            </View>

            {/* 4. SECCIÓN: PREFERENCIAS DE CUENTA */}
            <View className="mb-6">
                <Text className="text-xs font-bold text-gray-400 tracking-wider mb-2 px-1">PREFERENCIAS DE CUENTA</Text>

                <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                    {/* Plan Nutricional con Ruta */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PlanScreen')} // <--- AQUÍ CONFIGURAS OTRA RUTA
                        className="flex-row items-center justify-between py-1"
                    >
                        <View className="flex-row items-center">
                            <View className="bg-emerald-50 p-2.5 rounded-2xl mr-3">
                                <MaterialCommunityIcons name="food-apple-outline" size={18} color="#00C896" />
                            </View>
                            <View>
                                <Text className="text-sm font-bold text-gray-800">Plan Nutricional Vinculado</Text>
                                <Text className="text-xs text-gray-500 mt-0.5">Keto Deportivo Pro (2,400 kcal)</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 5. BOTONES INFERIORES */}
            <View className="mb-10 space-y-3">
                {/* Botón Guardar Cambios */}
                <TouchableOpacity
                    onPress={() => alert('Cambios guardados con éxito')}
                    className="bg-[#00C896] rounded-2xl py-4 flex-row justify-center items-center shadow-md shadow-emerald-200"
                >
                    <Feather name="save" size={18} color="white" style={{ marginRight: 8 }} />
                    <Text className="text-white font-bold text-base">Guardar Cambios</Text>
                </TouchableOpacity>

                {/* Enlace de desactivar cuenta */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('DeleteAccountScreen')} // Ruta opcional
                    className="py-3 items-center"
                >
                    <Text className="text-red-500 text-sm font-semibold">Desactivar o eliminar cuenta</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}