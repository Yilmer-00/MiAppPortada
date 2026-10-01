import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false); // Estado para la ventana emergente

    const handleResetPassword = () => {
        if (!email) {
            Alert.alert('Atención', 'Por favor ingresa tu correo electrónico.');
            return;
        }

        // Aquí iría tu lógica de envío (API)
        // Mostramos la ventana emergente
        setModalVisible(true);
    };

    return (
        <ScrollView className="flex-1 bg-gradient-to-b bg-emerald-50/40 px-5 pt-6" showsVerticalScrollIndicator={false}>

            {/* 1. CABECERA SUPERIOR */}
            <View className="flex-row justify-between items-center mb-6">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                >
                    <Ionicons name="chevron-back" size={20} color="#111827" />
                </TouchableOpacity>

                <View className="flex-row items-center bg-white px-4 py-1.5 rounded-full shadow-sm border border-emerald-100">
                    <View className="w-5 h-5 bg-emerald-500 rounded-full items-center justify-center mr-2">
                        <MaterialCommunityIcons name="food-apple-outline" size={12} color="white" />
                    </View>
                    <Text className="text-sm font-bold text-gray-900">Nutrik</Text>
                </View>

                <View className="w-10 h-10" />
            </View>

            {/* 2. ICONO CENTRAL Y TEXTOS */}
            <View className="items-center mb-6 mt-4">
                <View className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-md border border-emerald-100 mb-4">
                    <Feather name="lock" size={32} color="#00C896" />
                </View>

                <Text className="text-2xl font-black text-gray-900 text-center mb-2">¿Recuperar contraseña?</Text>
                <Text className="text-xs text-gray-500 text-center px-6 leading-4">
                    No te preocupes. Ingresa tu correo electrónico asociado y te enviaremos las instrucciones para restablecerla.
                </Text>
            </View>

            {/* 3. CAMPO DE CORREO */}
            <View className="space-y-3.5 mb-6">
                <View className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                        <Feather name="at-sign" size={18} color="#6B7280" style={{ marginRight: 10 }} />
                        <View className="flex-1">
                            <Text className="text-[10px] text-gray-400 font-medium">Correo electrónico</Text>
                            <TextInput
                                className="text-xs font-bold text-gray-900 mt-0.5 p-0"
                                placeholder="ejemplo@gmail.com"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* 4. BOTÓN DE ENVIAR */}
            <TouchableOpacity
                onPress={handleResetPassword}
                className="bg-[#00C896] rounded-2xl py-4 flex-row justify-center items-center shadow-md shadow-emerald-200 mb-4"
            >
                <Text className="text-white font-bold text-base mr-2">Enviar Instrucciones</Text>
                <Ionicons name="send" size={16} color="white" />
            </TouchableOpacity>

            {/* 5. VOLVER AL LOGIN */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="items-center py-2 mb-10"
            >
                <Text className="text-xs font-bold text-gray-600">
                    ← Volver a <Text className="text-[#00C896]">Iniciar Sesión</Text>
                </Text>
            </TouchableOpacity>

            {/* ==========================================================
            VENTANA EMERGENTE (MODAL) DE ÉXITO 
          ========================================================== */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                    <View className="bg-white w-full rounded-3xl p-6 items-center shadow-xl border border-emerald-100">

                        {/* Ícono de éxito con toque Nutrik */}
                        <View className="w-16 h-16 bg-emerald-100 rounded-full items-center justify-center mb-4">
                            <Ionicons name="checkmark-sharp" size={32} color="#00C896" />
                        </View>

                        <Text className="text-lg font-black text-gray-900 text-center mb-1">¡Verifica tu correo!</Text>

                        <Text className="text-xs text-gray-500 text-center leading-5 mb-6 px-2">
                            Se han enviado las instrucciones de recuperación a <Text className="font-bold text-gray-800">{email}</Text>. Revisa tu bandeja de entrada o spam.
                        </Text>

                        {/* Botón para cerrar y volver al login */}
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                                navigation.goBack(); // Regresa automáticamente al Login
                            }}
                            className="bg-[#00C896] w-full rounded-2xl py-3.5 items-center shadow-md shadow-emerald-200"
                        >
                            <Text className="text-white font-bold text-sm">Entendido (Nutrik)</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
}