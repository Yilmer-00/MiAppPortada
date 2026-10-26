import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext"; // 👈 1. Importar el Hook del Tema

export default function ConfiguracionScreen() {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useTheme(); // 👈 2. Consumir el estado global del tema

    // Estados funcionales para los interruptores
    const [notificaciones, setNotificaciones] = useState(true);
    const [alertasPedidos, setAlertasPedidos] = useState(true);

    const handleCerrarSesion = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que deseas salir de tu cuenta de vendedor?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Salir",
                    style: "destructive",
                    onPress: () => logout()
                }
            ]
        );
    };

    return (
        <ScrollView
            className={`flex-1 p-4 pt-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
            showsVerticalScrollIndicator={false}
        >

            {/* Cabecera superior */}
            <View className="mb-6">
                <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Configuración
                </Text>
                <Text className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Personaliza tu cuenta y preferencias de la tienda
                </Text>
            </View>

            {/* Tarjeta de Perfil del Vendedor */}
            <TouchableOpacity
                className={`p-4 rounded-xl border shadow-sm flex-row items-center justify-between mb-5 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                    }`}
                onPress={() => navigation.navigate('EditarPerfilScreen')}
            >
                <View className="flex-row items-center">
                    <View className={`w-12 h-12 rounded-full justify-center items-center mr-3 ${isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'
                        }`}>
                        <Ionicons name="person" size={24} color={isDarkMode ? '#34d399' : '#137333'} />
                    </View>
                    <View>
                        <Text className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Carlos Vendedor
                        </Text>
                        <Text className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            carlos.vendedor@nutrik.com
                        </Text>
                    </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
            </TouchableOpacity>

            {/* Sección: Preferencias */}
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Preferencias
            </Text>
            <View className={`rounded-xl border shadow-sm mb-5 overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}>

                {/* Notificaciones Push */}
                <View className={`flex-row justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'
                    }`}>
                    <View className="flex-row items-center">
                        <Ionicons name="notifications-outline" size={20} color={isDarkMode ? '#9ca3af' : '#4b5563'} style={{ marginRight: 12 }} />
                        <Text className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            Notificaciones Push
                        </Text>
                    </View>
                    <Switch
                        value={notificaciones}
                        onValueChange={setNotificaciones}
                        trackColor={{ false: '#d1d5db', true: '#137333' }}
                        thumbColor={'#ffffff'}
                    />
                </View>

                {/* Alertas de nuevos pedidos */}
                <View className={`flex-row justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'
                    }`}>
                    <View className="flex-row items-center">
                        <Ionicons name="bag-check-outline" size={20} color={isDarkMode ? '#9ca3af' : '#4b5563'} style={{ marginRight: 12 }} />
                        <Text className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            Alertas de nuevos pedidos
                        </Text>
                    </View>
                    <Switch
                        value={alertasPedidos}
                        onValueChange={setAlertasPedidos}
                        trackColor={{ false: '#d1d5db', true: '#137333' }}
                        thumbColor={'#ffffff'}
                    />
                </View>

                {/* Modo Oscuro Global */}
                <View className="flex-row justify-between items-center p-4">
                    <View className="flex-row items-center">
                        <Ionicons
                            name={isDarkMode ? "moon" : "moon-outline"}
                            size={20}
                            color={isDarkMode ? '#34d399' : '#4b5563'}
                            style={{ marginRight: 12 }}
                        />
                        <Text className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            Modo oscuro
                        </Text>
                    </View>
                    {/* 👈 3. Conectar el Switch a toggleTheme y usar el valor de isDarkMode */}
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#d1d5db', true: '#10b981' }}
                        thumbColor={'#ffffff'}
                    />
                </View>
            </View>

            {/* Sección: Gestión del Negocio */}
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Gestión del Negocio
            </Text>
            <View className={`rounded-xl border shadow-sm mb-5 overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}>
                <TouchableOpacity
                    className={`flex-row justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'
                        }`}
                    onPress={() => navigation.navigate('CambiarPasswordScreen')}
                >
                    <View className="flex-row items-center">
                        <Ionicons name="lock-closed-outline" size={20} color={isDarkMode ? '#9ca3af' : '#4b5563'} style={{ marginRight: 12 }} />
                        <Text className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            Cambiar contraseña
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row justify-between items-center p-4"
                    onPress={() => navigation.navigate('EditarTiendaScreen')}
                >
                    <View className="flex-row items-center">
                        <Ionicons name="storefront-outline" size={20} color={isDarkMode ? '#9ca3af' : '#4b5563'} style={{ marginRight: 12 }} />
                        <Text className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            Datos de la tienda Nutrick
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </TouchableOpacity>
            </View>

            {/* Sección: Soporte */}
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Soporte
            </Text>
            <View className={`rounded-xl border shadow-sm mb-6 overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}>
                <TouchableOpacity
                    className={`flex-row justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'
                        }`}
                    onPress={() => navigation.navigate('AyudaScreen')}
                >
                    <View className="flex-row items-center">
                        <Ionicons name="help-circle-outline" size={20} color={isDarkMode ? '#9ca3af' : '#4b5563'} style={{ marginRight: 12 }} />
                        <Text className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            Centro de ayuda y soporte
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row justify-between items-center p-4"
                    onPress={() => navigation.navigate('TerminosScreen')}
                >
                    <View className="flex-row items-center">
                        <Ionicons name="document-text-outline" size={20} color={isDarkMode ? '#9ca3af' : '#4b5563'} style={{ marginRight: 12 }} />
                        <Text className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            Términos y condiciones
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </TouchableOpacity>
            </View>

            {/* Botón de Cerrar Sesión */}
            <TouchableOpacity
                className={`py-3.5 rounded-xl flex-row justify-center items-center mb-8 shadow-sm border ${isDarkMode ? 'bg-red-950/40 border-red-900' : 'bg-red-50 border-red-200'
                    }`}
                onPress={handleCerrarSesion}
            >
                <Ionicons name="log-out-outline" size={18} color="#dc2626" />
                <Text className="text-red-600 font-bold text-sm ml-2">Cerrar sesión</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}