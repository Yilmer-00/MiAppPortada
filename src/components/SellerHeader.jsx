import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SellerHeader({ title }) {
    const navigation = useNavigation();

    return (
        <View className="flex-row justify-between items-center bg-white px-5 pt-12 pb-4 border-b border-gray-100 shadow-sm">
            <TouchableOpacity onPress={() => navigation.openDrawer?.() || navigation.goBack()}>
                <Ionicons name="menu" size={24} color="#111827" />
            </TouchableOpacity>

            <Text className="text-base font-bold text-gray-900">{title}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('SellerProfile')}>
                <Feather name="settings" size={20} color="#00C896" />
            </TouchableOpacity>
        </View>
    );
}