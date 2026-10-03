import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ConfiguracionScreen() {
    const navigation = useNavigation();

    // Estados funcionales para los interruptores (Switches)
    const [notificaciones, setNotificaciones] = useState(true);
    const [alertasPedidos, setAlertasPedidos] = useState(true);
    const [modoOscuro, setModoOscuro] = useState(false);

    // Función de alerta para cerrar sesión de forma segura
    const handleCerrarSesion = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que deseas salir de tu cuenta de vendedor?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Salir",
                    style: "destructive",
                    onPress: () => {
                        // 🚀 Aquí puedes redirigir a tu AuthNavigator o pantalla de Login
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AuthNavigator' }],
                        });
                    }
                }
            ]
        );
    };

    return (
        <ScrollView className="flex-1 bg-gray-50 p-4 pt-6" showsVerticalScrollIndicator={false}>

            {/* Cabecera superior */}
            <View className="mb-6">
                <Text className="text-xl font-bold text-gray-900">Configuración</Text>
                <Text className="text-xs text-gray-500">Personaliza tu cuenta y preferencias de la tienda</Text>
            </View>

            {/* Tarjeta de Perfil del Vendedor (Ruta a Editar Perfil) */}
            <TouchableOpacity
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex-row items-center justify-between mb-5"
                onPress={() => navigation.navigate('EditarPerfilScreen')} // 🚀 ESPACIO DE RUTA A EDITAR PERFIL
            >
                <View className="flex-row items-center">
                    <View className="w-12 h-12 bg-emerald-100 rounded-full justify-center items-center mr-3">
                        <Ionicons name="person" size={24} color="#137333" />
                    </View>
                    <View>
                        <Text className="text-base font-bold text-gray-900">Carlos Vendedor</Text>
                        <Text className="text-xs text-gray-500">carlos.vendedor@nutrik.com</Text>
                    </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
            </TouchableOpacity>

            {/* Sección: Preferencias */}
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Preferencias</Text>
            <View className="bg-white rounded-xl border border-gray-100 shadow-sm mb-5 overflow-hidden">

                {/* Notificaciones Push */}
                <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
                    <View className="flex-row items-center">
                        <Ionicons name="notifications-outline" size={20} color="#4b5563" style={{ marginRight: 12 }} />
                        <Text className="text-sm font-medium text-gray-800">Notificaciones Push</Text>
                    </View>
                    <Switch
                        value={notificaciones}
                        onValueChange={setNotificaciones}
                        trackColor={{ false: '#d1d5db', true: '#137333' }}
                        thumbColor={'#ffffff'}
                    />
                </View>

                {/* Alertas de nuevos pedidos */}
                <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
                    <View className="flex-row items-center">
                        <Ionicons name="bag-check-outline" size={20} color="#4b5563" style={{ marginRight: 12 }} />
                        <Text className="text-sm font-medium text-gray-800">Alertas de nuevos pedidos</Text>
                    </View>
                    <Switch
                        value={alertasPedidos}
                        onValueChange={setAlertasPedidos}
                        trackColor={{ false: '#d1d5db', true: '#137333' }}
                        thumbColor={'#ffffff'}
                    />
                </View>

                {/* Modo oscuro */}
                <View className="flex-row justify-between items-center p-4">
                    <View className="flex-row items-center">
                        <Ionicons name="moon-outline" size={20} color="#4b5563" style={{ marginRight: 12 }} />
                        <Text className="text-sm font-medium text-gray-800">Modo oscuro</Text>
                    </View>
                    <Switch
                        value={modoOscuro}
                        onValueChange={setModoOscuro}
                        trackColor={{ false: '#d1d5db', true: '#137333' }}
                        thumbColor={'#ffffff'}
                    />
                </View>
            </View>

            {/* Sección: Gestión del Negocio */}
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Gestión del Negocio</Text>
            <View className="bg-white rounded-xl border border-gray-100 shadow-sm mb-5 overflow-hidden">

                {/* Cambiar Contraseña */}
                <TouchableOpacity
                    className="flex-row justify-between items-center p-4 border-b border-gray-100"
                    onPress={() => navigation.navigate('CambiarPasswordScreen')} // 🚀 ESPACIO DE RUTA A CAMBIAR CONTRASEÑA
                >
                    <View className="flex-row items-center">
                        <Ionicons name="lock-closed-outline" size={20} color="#4b5563" style={{ marginRight: 12 }} />
                        <Text className="text-sm font-medium text-gray-800">Cambiar contraseña</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </TouchableOpacity>

                {/* Datos de la Tienda */}
                <TouchableOpacity
                    className="flex-row justify-between items-center p-4"
                    onPress={() => navigation.navigate('EditarTiendaScreen')} // 🚀 ESPACIO DE RUTA A DATOS DE TIENDA
                >
                    <View className="flex-row items-center">
                        <Ionicons name="storefront-outline" size={20} color="#4b5563" style={{ marginRight: 12 }} />
                        <Text className="text-sm font-medium text-gray-800">Datos de la tienda Nutrick</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </TouchableOpacity>
            </View>

            {/* Sección: Soporte */}
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Soporte</Text>
            <View className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 overflow-hidden">

                {/* Centro de Ayuda */}
                <TouchableOpacity
                    className="flex-row justify-between items-center p-4 border-b border-gray-100"
                    onPress={() => navigation.navigate('AyudaScreen')} // 🚀 ESPACIO DE RUTA A AYUDA
                >
                    <View className="flex-row items-center">
                        <Ionicons name="help-circle-outline" size={20} color="#4b5563" style={{ marginRight: 12 }} />
                        <Text className="text-sm font-medium text-gray-800">Centro de ayuda y soporte</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </TouchableOpacity>

                {/* Términos y Condiciones */}
                <TouchableOpacity
                    className="flex-row justify-between items-center p-4"
                    onPress={() => navigation.navigate('TerminosScreen')} // 🚀 ESPACIO DE RUTA A TÉRMINOS
                >
                    <View className="flex-row items-center">
                        <Ionicons name="document-text-outline" size={20} color="#4b5563" style={{ marginRight: 12 }} />
                        <Text className="text-sm font-medium text-gray-800">Términos y condiciones</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </TouchableOpacity>
            </View>

            {/* Botón de Cerrar Sesión */}
            <TouchableOpacity
                className="bg-red-50 border border-red-200 py-3.5 rounded-xl flex-row justify-center items-center mb-8 shadow-sm"
                onPress={handleCerrarSesion}
            >
                <Ionicons name="log-out-outline" size={18} color="#dc2626" />
                <Text className="text-red-600 font-bold text-sm ml-2">Cerrar sesión</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}