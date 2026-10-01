import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
    const navigation = useNavigation(); // Hook de navegación para configurar las rutas

    // Estados interactivos para el formulario de registro
    const [nombre, setNombre] = useState('Johsman Chango');
    const [email, setEmail] = useState('johsmanCh@nutrik.com');
    const [password, setPassword] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('saludable'); // 'fitness', 'saludable', 'keto'
    const [acceptTerms, setAcceptTerms] = useState(true);
    const [showPassword, setShowPassword] = useState(false);


    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    const metCount = [hasLength, hasNumber, hasUpperCase].filter(Boolean).length;

    const getProgressBarWidth = () => {
        if (metCount === 1) return 'w-1/3';
        if (metCount === 2) return 'w-2/3';
        if (metCount >= 3) return 'w-full';
        return 'w-0';
    };

    return (
        <ScrollView className="flex-1 bg-gradient-to-b bg-emerald-50/40 px-5 pt-6" showsVerticalScrollIndicator={false}>

            {/* 1. CABECERA SUPERIOR */}
            <View className="flex-row justify-between items-center mb-5">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                >
                    <Ionicons name="chevron-back" size={20} color="#111827" />
                </TouchableOpacity>

                {/* Logo superior con texto Nutrik[cite: 12] */}
                <View className="flex-row items-center bg-white px-4 py-1.5 rounded-full shadow-sm border border-emerald-100">
                    <View className="w-5 h-5 bg-emerald-500 rounded-full items-center justify-center mr-2">
                        <MaterialCommunityIcons name="food-apple-outline" size={12} color="white" />
                    </View>
                    <Text className="text-sm font-bold text-gray-900">Nutrik</Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfileScreen')}
                    className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                >
                    <Feather name="user" size={18} color="#00C896" />
                </TouchableOpacity>
            </View>

            {/* 2. PESTAÑAS (INICIAR SESIÓN / REGISTRARSE)[cite: 12] */}
            <View className="flex-row bg-gray-200/50 p-1 rounded-2xl mb-5 border border-gray-200/40">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')} // <--- Ruta para cambiar a Iniciar Sesión
                    className="flex-1 py-3 rounded-xl items-center justify-center"
                >
                    <Text className="text-xs font-bold text-gray-500">Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 py-3 rounded-xl bg-white shadow-sm flex-row items-center justify-center">
                    <View className="w-2 h-2 rounded-full bg-[#00C896] mr-1.5" />
                    <Text className="text-xs font-bold text-gray-900">Registrarse</Text>
                </TouchableOpacity>
            </View>

            {/* 3. BANNER DE BIENVENIDA / PROMOCIÓN[cite: 12] */}
            <View className="bg-white rounded-3xl p-5 mb-5 shadow-sm border border-emerald-100 relative overflow-hidden">
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-row items-center bg-emerald-50 px-3 py-1 rounded-full">
                        <Ionicons name="sparkles-outline" size={12} color="#00C896" style={{ marginRight: 4 }} />
                        <Text className="text-[10px] font-bold text-[#00C896]">Bienvenida Nutrik</Text>
                    </View>
                    <View className="bg-emerald-100 p-2.5 rounded-2xl">
                        <MaterialCommunityIcons name="food-apple-outline" size={18} color="#00C896" />
                    </View>
                </View>

                <Text className="text-lg font-black text-gray-900 mb-1.5">Comienza tu viaje saludable</Text>
                <Text className="text-xs text-gray-600 leading-4 mb-3">
                    Únete hoy a Nutrik y recibe <Text className="font-bold text-emerald-700">15% OFF</Text> en tu primer pedido de nutrición y suplementos[cite: 12].
                </Text>

                <View className="pt-3 border-t border-gray-100">
                    <Text className="text-[10px] text-gray-400 font-medium leading-4">
                        Planes personalizados • Envíos gratis desde $45 • Asesoría IA[cite: 12]
                    </Text>
                </View>
            </View>

            {/* 4. CAMPOS DEL FORMULARIO DE REGISTRO[cite: 12] */}
            <View className="space-y-3.5 mb-5">

                {/* Nombre Completo */}
                <View className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100">
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-[10px] font-bold text-gray-400 tracking-wider">NOMBRE COMPLETO</Text>
                        <Feather name="user" size={14} color="#9CA3AF" />
                    </View>
                    <View className="flex-row items-center">
                        <TextInput
                            className="flex-1 text-xs font-bold text-gray-900 p-0"
                            value={nombre}
                            onChangeText={setNombre}
                            placeholder="Ej. Sofía Valenzuela"
                        />
                    </View>
                </View>

                {/* Correo Electrónico */}
                <View className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100">
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-[10px] font-bold text-gray-400 tracking-wider">CORREO ELECTRÓNICO</Text>
                        <Feather name="at-sign" size={14} color="#9CA3AF" />
                    </View>
                    <View className="flex-row items-center">
                        <TextInput
                            className="flex-1 text-xs font-bold text-gray-900 p-0"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            placeholder="sofia@nutrik.com"
                        />
                    </View>
                </View>

                {/* Contraseña Segura */}
                <View className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 mb-4">
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-[10px] font-bold text-gray-400 tracking-wider">CONTRASEÑA SEGURA</Text>
                        <Text className="text-[10px] text-gray-400">Ingresa una clave</Text>
                    </View>

                    <View className="flex-row items-center justify-between my-1">
                        <View className="flex-row items-center flex-1">
                            <Feather name="lock" size={16} color="#6B7280" style={{ marginRight: 8 }} />
                            <TextInput
                                className="flex-1 text-xs font-bold text-gray-900 p-0"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                placeholder="Mínimo 8 caracteres"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Feather name={showPassword ? "eye" : "eye-off"} size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>

                    {/* Barra de progreso dinámica */}
                    <View className="h-1 bg-gray-100 rounded-full my-2 overflow-hidden flex-row">
                        <View className={`bg-[#00C896] h-full transition-all duration-300 ${getProgressBarWidth()}`} />
                    </View>

                    {/* Checklist interactivo */}
                    <View className="flex-row justify-between pt-1">

                        {/* Requisito 1: 8+ caracteres */}
                        <View className="flex-row items-center">
                            <Ionicons
                                name={hasLength ? "checkmark-circle" : "ellipse-outline"}
                                size={12}
                                color={hasLength ? "#00C896" : "#9CA3AF"}
                                style={{ marginRight: 2 }}
                            />
                            <Text className={`text-[10px] ${hasLength ? "text-emerald-700 font-semibold" : "text-gray-400"}`}>
                                8+ caracteres
                            </Text>
                        </View>

                        {/* Requisito 2: Un número */}
                        <View className="flex-row items-center">
                            <Ionicons
                                name={hasNumber ? "checkmark-circle" : "ellipse-outline"}
                                size={12}
                                color={hasNumber ? "#00C896" : "#9CA3AF"}
                                style={{ marginRight: 2 }}
                            />
                            <Text className={`text-[10px] ${hasNumber ? "text-emerald-700 font-semibold" : "text-gray-400"}`}>
                                Un número
                            </Text>
                        </View>

                        {/* Requisito 3: Mayúscula */}
                        <View className="flex-row items-center">
                            <Ionicons
                                name={hasUpperCase ? "checkmark-circle" : "ellipse-outline"}
                                size={12}
                                color={hasUpperCase ? "#00C896" : "#9CA3AF"}
                                style={{ marginRight: 2 }}
                            />
                            <Text className={`text-[10px] ${hasUpperCase ? "text-emerald-700 font-semibold" : "text-gray-400"}`}>
                                Mayúscula
                            </Text>
                        </View>

                    </View>
                </View>
            </View>

            {/* 5. SECCIÓN: ¿CUÁL ES TU META PRINCIPAL?[cite: 12] */ }
    <View className="mb-5">
        <View className="flex-row justify-between items-center mb-3 px-1">
            <Text className="text-[10px] font-bold text-gray-400 tracking-wider">¿CUÁL ES TU META PRINCIPAL?</Text>
            <Text className="text-[10px] font-bold text-[#00C896]">Personalizado</Text>
        </View>

        <View className="space-y-2.5">

            {/* Opción 1: Rendimiento / Fitness */}
            <TouchableOpacity
                onPress={() => setSelectedGoal('fitness')}
                className={`bg-white rounded-2xl p-4 border flex-row items-center justify-between ${selectedGoal === 'fitness' ? 'border-[#00C896] bg-emerald-50/20' : 'border-gray-100 shadow-sm'}`}
            >
                <View className="flex-row items-center flex-1 mr-2">
                    <View className="bg-amber-50 p-2.5 rounded-xl mr-3">
                        <Ionicons name="flash-outline" size={16} color="#F59E0B" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs font-bold text-gray-900">Rendimiento / Fitness</Text>
                        <Text className="text-[10px] text-gray-400 mt-0.5">Fuerza, masa magra y energía activa</Text>
                    </View>
                </View>
                <View className={`w-5 h-5 rounded-full border items-center justify-center ${selectedGoal === 'fitness' ? 'bg-[#00C896] border-[#00C896]' : 'border-gray-300'}`}>
                    {selectedGoal === 'fitness' && <Ionicons name="checkmark" size={12} color="white" />}
                </View>
            </TouchableOpacity>

            {/* Opción 2: Estilo de Vida Saludable (Seleccionada por defecto)[cite: 12] */}
            <TouchableOpacity
                onPress={() => setSelectedGoal('saludable')}
                className={`bg-white rounded-2xl p-4 border flex-row items-center justify-between ${selectedGoal === 'saludable' ? 'border-[#00C896] bg-emerald-50/30' : 'border-gray-100 shadow-sm'}`}
            >
                <View className="flex-row items-center flex-1 mr-2">
                    <View className="bg-emerald-100 p-2.5 rounded-xl mr-3">
                        <MaterialCommunityIcons name="food-apple-outline" size={16} color="#00C896" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs font-bold text-gray-900">Estilo de Vida Saludable</Text>
                        <Text className="text-[10px] text-gray-500 mt-0.5">Vitalidad diaria, peso y digestión equilibrada</Text>
                    </View>
                </View>
                <View className="w-5 h-5 rounded-full bg-[#00C896] items-center justify-center">
                    <Ionicons name="checkmark" size={12} color="white" />
                </View>
            </TouchableOpacity>

            {/* Opción 3: Dieta Plant-Based / Keto */}
            <TouchableOpacity
                onPress={() => setSelectedGoal('keto')}
                className={`bg-white rounded-2xl p-4 border flex-row items-center justify-between ${selectedGoal === 'keto' ? 'border-[#00C896] bg-emerald-50/20' : 'border-gray-100 shadow-sm'}`}
            >
                <View className="flex-row items-center flex-1 mr-2">
                    <View className="bg-emerald-50 p-2.5 rounded-xl mr-3">
                        <Feather name="feather" size={16} color="#00C896" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs font-bold text-gray-900">Dieta Plant-Based / Keto</Text>
                        <Text className="text-[10px] text-gray-400 mt-0.5">Nutrición botánica y micronutrientes limpios</Text>
                    </View>
                </View>
                <View className={`w-5 h-5 rounded-full border items-center justify-center ${selectedGoal === 'keto' ? 'bg-[#00C896] border-[#00C896]' : 'border-gray-300'}`}>
                    {selectedGoal === 'keto' && <Ionicons name="checkmark" size={12} color="white" />}
                </View>
            </TouchableOpacity>

        </View>
    </View>

    {/* 6. TÉRMINOS Y CONDICIONES[cite: 12] */ }
    <View className="flex-row items-start mb-6 px-1">
        <TouchableOpacity
            onPress={() => setAcceptTerms(!acceptTerms)}
            className={`w-4 h-4 rounded-md mr-2 mt-0.5 items-center justify-center ${acceptTerms ? 'bg-[#00C896]' : 'border border-gray-300'}`}
        >
            {acceptTerms && <Ionicons name="checkmark" size={12} color="white" />}
        </TouchableOpacity>
        <Text className="text-[11px] text-gray-500 flex-1 leading-4">
            Acepto los <Text className="font-bold text-[#00C896]">Términos de Servicio</Text> y la <Text className="font-bold text-[#00C896]">Política de Privacidad</Text> de Nutrik[cite: 12].
        </Text>
    </View>

    {/* 7. BOTÓN PRINCIPAL: CREAR CUENTA GRATIS[cite: 12] */ }
    <TouchableOpacity
        onPress={() => navigation.navigate('MainTabNavigator')} // <--- Ruta principal tras registrarse
        className="bg-[#00C896] rounded-2xl py-4 flex-row justify-center items-center shadow-md shadow-emerald-200 mb-5"
    >
        <Ionicons name="rocket-outline" size={18} color="white" style={{ marginRight: 8 }} />
        <Text className="text-white font-bold text-base">Crear Cuenta Gratis</Text>
    </TouchableOpacity>

    {/* 8. SEPARADOR SOCIAL[cite: 12] */ }
    <View className="flex-row items-center mb-5">
        <View className="flex-1 h-[1px] bg-gray-200" />
        <Text className="text-[10px] font-bold text-gray-400 tracking-wider mx-4">O REGÍSTRATE CON</Text>
        <View className="flex-1 h-[1px] bg-gray-200" />
    </View>

    {/* 9. BOTONES DE REGISTRO SOCIAL[cite: 12] */ }
    <View className="flex-row gap-3 mb-6">
        <TouchableOpacity
            onPress={() => alert('Registro con Google')}
            className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
        >
            <Ionicons name="logo-google" size={20} color="#EA4335" />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => alert('Registro con Apple')}
            className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
        >
            <Ionicons name="logo-apple" size={20} color="#111827" />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => alert('Registro Biométrico')}
            className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
        >
            <MaterialCommunityIcons name="fingerprint" size={20} color="#00C896" />
        </TouchableOpacity>
    </View>

    {/* 10. ENLACE INFERIOR: YA TIENES UNA CUENTA[cite: 12] */ }
    <TouchableOpacity
        onPress={() => navigation.navigate('Login')} // <--- Ruta para volver al login
        className="py-2 mb-10 items-center"
    >
        <Text className="text-xs text-gray-500">
            ¿Ya tienes una cuenta en Nutrik? <Text className="font-bold text-[#00C896]">Inicia Sesión</Text>[cite: 12]
        </Text>
    </TouchableOpacity>

        </ScrollView >
    );
}