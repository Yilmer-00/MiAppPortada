import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SellerHeader({ title }) {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const handleOpenDrawer = () => {
        try {
            // Intenta disparar la acción del Drawer de manera global (funciona incluso si está anidado en un Stack)
            navigation.dispatch(DrawerActions.openDrawer());
        } catch (error) {
            // Plan de respaldo si por alguna razón no existe el drawer en la jerarquía
            if (navigation.canGoBack()) {
                navigation.goBack();
            }
        }
    };

    return (
        <View 
        style={{ paddingTop: insets.top }} className="bg-white px-5 pb-3 border-b border-gray-100 shadow-sm flex-row items-center justify-between">
            {/* Botón de Menú / Hamburguesa */}
            <TouchableOpacity
                onPress={handleOpenDrawer}
                className="p-1 rounded-full active:bg-gray-100"
            >
                <Ionicons name="menu" size={24} color="#0e1420" />
            </TouchableOpacity>

            {/* Título de la pantalla actual */}
            <Text className="text-base font-bold text-gray-900">{title}</Text>

            {/* Contenedor derecho: Notificaciones y Perfil */}
            <View className="flex-row items-center">

                {/* 🔔 Botón de Notificaciones con Badge */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('NotificacionesScreen')} // 🚀 Ruta a notificaciones
                    className="p-1.5 rounded-full active:bg-gray-100 relative mr-3"
                >
                    <Ionicons name="notifications-outline" size={22} color="#111827" />
                    {/* Círculo indicador de notificaciones pendientes */}
                    <View className="absolute top-1 right-1 bg-red-500 w-4 h-4 rounded-full justify-center items-center border border-white">
                        <Text className="text-[9px] font-bold text-white">1</Text>
                    </View>
                </TouchableOpacity>

                {/* 👤 Botón de Perfil del Vendedor (Avatar) */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('SellerProfile')} // 🚀 Ruta al perfil
                    className="active:opacity-85"
                >
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' }} // Avatar de ejemplo
                        className="w-8 h-8 rounded-full bg-gray-200 border border-emerald-600"
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}