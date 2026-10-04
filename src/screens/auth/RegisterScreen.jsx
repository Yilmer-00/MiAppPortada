import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';


export default function RegisterScreen({navigation}) {
    const insets = useSafeAreaInsets();

    // Estados interactivos para el formulario de registro
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
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
        <LinearGradient
            colors={['#f7faf7', '#04a51a']} // El color inicial (0%) y el color final (100%)
            locations={[0, 0.52]}
            style={{ flex: 1 }}
        >
            <ScrollView
                className="flex-1 bg-emerald-50/40"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >

                {/* 1. CABECERA SUPERIOR */}
                <View
                    style={{ paddingTop: insets.top + 10 }}
                    className="flex-row justify-between items-center px-5 mb-2"
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                        style={{ elevation: 2 }}
                    >
                        <Ionicons name="chevron-back" size={20} color="#0a111f" />
                    </TouchableOpacity>

                    <View />

                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProfileScreen')}
                        className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                        style={{ elevation: 2 }}
                    >
                        <Feather name="user" size={18} color="#00C896" />
                    </TouchableOpacity>
                </View>

                {/* 2. LOGO CENTRAL */}
                <View className="items-center px-5 mb-6">
                    <View
                        className="w-32 h-32 bg-white rounded-3xl items-center justify-center shadow-md border border-gray-100 mb-3 p-2"
                        style={{ elevation: 4 }}
                    >
                        <Image
                            source={require('../../../assets/nutrick.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                </View>

                {/* 3. CONTENEDOR PRINCIPAL (RECUADRO BLANCO TIPO TARJETA) */}
                <View
                    className="bg-white rounded-t-[35px] pt-6 px-6 pb-10 flex-1 shadow-2xl border-t border-gray-100"
                    style={{ elevation: 15 }}
                >
                    {/* Pestañas (Iniciar Sesión / Registrarse) */}
                    <View className="flex-row bg-gray-200/50 p-1 rounded-2xl mb-5 border border-gray-200/40">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            className="flex-1 py-3 rounded-xl items-center justify-center"
                        >
                            <Text className="text-xs font-bold text-gray-500">Iniciar Sesión</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-1 py-3 rounded-xl bg-white shadow-sm flex-row items-center justify-center" style={{ elevation: 1 }}>
                            <View className="w-2 h-2 rounded-full bg-[#00C896] mr-1.5" />
                            <Text className="text-xs font-bold text-gray-900">Registrarse</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Banner de Bienvenida / Promoción */}
                    <View className="bg-white rounded-3xl p-5 mb-5 shadow-sm border border-emerald-100 relative overflow-hidden" style={{ elevation: 1 }}>
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
                            Únete hoy a Nutrik y recibe <Text className="font-bold text-emerald-700">15% OFF</Text> en tu primer pedido de nutrición y suplementos.
                        </Text>

                        <View className="pt-3 border-t border-gray-100">
                            <Text className="text-[10px] text-gray-400 font-medium leading-4">
                                Planes personalizados • Envíos gratis desde $300.000 cop • Asesoría IA
                            </Text>
                        </View>
                    </View>

                    {/* Campos del Formulario de Registro */}
                    <View className="space-y-3.5 mb-5">
                        {/* Nombre Completo */}
                        <View className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 mb-3.5" style={{ elevation: 2 }}>
                            <View className="flex-row justify-between items-center mb-1">
                                <Text className="text-[10px] font-bold text-gray-400 tracking-wider">NOMBRE COMPLETO</Text>
                                <Feather name="user" size={14} color="#9CA3AF" />
                            </View>
                            <View className="flex-row items-center">
                                <TextInput
                                    className="flex-1 text-xs font-bold text-gray-900 p-0"
                                    value={nombre}
                                    onChangeText={setNombre}
                                    placeholder="Ej. Jhosman Chango"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        {/* Correo Electrónico */}
                        <View className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 mb-3.5" style={{ elevation: 2 }}>
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
                                    placeholder="Usuario@gmail.com"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        {/* Contraseña Segura */}
                        <View className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 mb-4" style={{ elevation: 2 }}>
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
                                <View className={`bg-[#00C896] h-full ${getProgressBarWidth()}`} />
                            </View>

                            {/* Checklist interactivo */}
                            <View className="flex-row justify-between pt-1">
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

                    {/* Sección: ¿Cuál es tu meta principal? */}
                    <View className="mb-5">
                        <View className="flex-row justify-between items-center mb-3 px-1">
                            <Text className="text-[10px] font-bold text-gray-400 tracking-wider">¿CUÁL ES TU META PRINCIPAL?</Text>
                            <Text className="text-[10px] font-bold text-[#00C896]">Personalizado</Text>
                        </View>

                        <View className="space-y-2.5">
                            {[
                                {
                                    id: 'fitness',
                                    title: 'Rendimiento / Fitness',
                                    description: 'Fuerza, masa magra y energía activa',
                                    icon: 'flash-outline',
                                    lib: Ionicons,
                                    iconColor: '#F59E0B',
                                    bgIcon: 'bg-amber-50',
                                },
                                {
                                    id: 'saludable',
                                    title: 'Estilo de Vida Saludable',
                                    description: 'Vitalidad diaria, peso y digestión equilibrada',
                                    icon: 'food-apple-outline',
                                    lib: MaterialCommunityIcons,
                                    iconColor: '#00C896',
                                    bgIcon: 'bg-emerald-100',
                                },
                                {
                                    id: 'keto',
                                    title: 'Dieta Plant-Based / Keto',
                                    description: 'Nutrición botánica y micronutrientes limpios',
                                    icon: 'feather',
                                    lib: Feather,
                                    iconColor: '#00C896',
                                    bgIcon: 'bg-emerald-50',
                                },
                            ].map((item) => {
                                const isSelected = selectedGoal === item.id;
                                const IconComponent = item.lib;

                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => setSelectedGoal(item.id)}
                                        activeOpacity={0.85}
                                        className={`bg-white rounded-2xl p-4 border flex-row items-center justify-between mb-2.5 ${isSelected ? 'border-[#00C896] bg-emerald-50/30' : 'border-gray-100 shadow-sm'
                                            }`}
                                        style={{ elevation: isSelected ? 2 : 1 }}
                                    >
                                        <View className="flex-row items-center flex-1 mr-2">
                                            <View className={`${item.bgIcon} p-2.5 rounded-xl mr-3`}>
                                                <IconComponent name={item.icon} size={16} color={item.iconColor} />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-xs font-bold text-gray-900">{item.title}</Text>
                                                <Text className="text-[10px] text-gray-500 mt-0.5">{item.description}</Text>
                                            </View>
                                        </View>

                                        <View
                                            className={`w-5 h-5 rounded-full border items-center justify-center ${isSelected ? 'bg-[#00C896] border-[#00C896]' : 'border-gray-300'
                                                }`}
                                        >
                                            {isSelected && <Ionicons name="checkmark" size={12} color="white" />}
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Términos y Condiciones */}
                    <View className="flex-row items-start mb-6 px-1">
                        <TouchableOpacity
                            onPress={() => setAcceptTerms(!acceptTerms)}
                            className={`w-4 h-4 rounded-md mr-2 mt-0.5 items-center justify-center ${acceptTerms ? 'bg-[#00C896]' : 'border border-gray-300'}`}
                        >
                            {acceptTerms && <Ionicons name="checkmark" size={12} color="white" />}
                        </TouchableOpacity>
                        <Text className="text-[11px] text-gray-500 flex-1 leading-4">
                            Acepto los <Text className="font-bold text-[#00C896]">Términos de Servicio</Text> y la <Text className="font-bold text-[#00C896]">Política de Privacidad</Text> de Nutrik.
                        </Text>
                    </View>

                    {/* Botón Principal: Crear Cuenta Gratis */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MainTabNavigator')}
                        activeOpacity={0.85}
                        className="bg-[#00C896] rounded-2xl py-4 flex-row justify-center items-center mb-5"
                        style={{
                            elevation: 6,
                            shadowColor: '#00C896',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.35,
                            shadowRadius: 8,
                        }}
                    >
                        <Ionicons name="rocket-outline" size={18} color="white" style={{ marginRight: 8 }} />
                        <Text className="text-white font-bold text-base tracking-wide">Crear Cuenta Gratis</Text>
                    </TouchableOpacity>

                    {/* Separador Social */}
                    <View className="flex-row items-center mb-5">
                        <View className="flex-1 h-[1px] bg-gray-200" />
                        <Text className="text-[10px] font-bold text-gray-400 tracking-wider mx-4">O REGÍSTRATE CON</Text>
                        <View className="flex-1 h-[1px] bg-gray-200" />
                    </View>

                    {/* Botones de Registro Social */}
                    <View className="flex-row gap-3 mb-6">
                        <TouchableOpacity
                            onPress={() => alert('Registro con Google')}
                            className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
                            style={{ elevation: 2 }}
                        >
                            <Ionicons name="logo-google" size={20} color="#EA4335" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => alert('Registro con Apple')}
                            className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
                            style={{ elevation: 2 }}
                        >
                            <Ionicons name="logo-apple" size={20} color="#111827" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => alert('Registro Biométrico')}
                            className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
                            style={{ elevation: 2 }}
                        >
                            <MaterialCommunityIcons name="fingerprint" size={20} color="#00C896" />
                        </TouchableOpacity>
                    </View>

                    {/* Enlace Inferior */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        className="py-2 mb-10 items-center"
                    >
                        <Text className="text-xs text-gray-500">
                            ¿Ya tienes una cuenta en Nutrik? <Text className="font-bold text-[#00C896]">Inicia Sesión</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}