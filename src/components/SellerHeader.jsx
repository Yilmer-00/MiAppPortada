import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function SellerHeader({ title }) {
    const navigation = useNavigation();

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
        <View className="flex-row justify-between items-center bg-white px-5 pt-12 pb-4 border-b border-gray-100 shadow-sm">
            {/* Botón de Menú / Hamburguesa */}
            <TouchableOpacity
                onPress={handleOpenDrawer}
                className="p-1 rounded-full active:bg-gray-100"
            >
                <Ionicons name="menu" size={24} color="#111827" />
            </TouchableOpacity>

            {/* Título de la pantalla actual */}
            <Text className="text-base font-bold text-gray-900">{title}</Text>

            {/* Botón de configuración / perfil */}
            <TouchableOpacity
                onPress={() => navigation.navigate('SellerProfile')}
                className="p-1 rounded-full active:bg-gray-100"
            >
                <Feather name="settings" size={20} color="#00C896" />
            </TouchableOpacity>
        </View>
    );
}