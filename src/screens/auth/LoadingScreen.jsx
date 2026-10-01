import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { AuthContext } from "../../context/AuthContext";


export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('@gmail.com');
  const [password, setPassword] = useState('123456');

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const resultado = login(email, password);

    if (!resultado.success) {
      alert(resultado.message);
      return;
    }
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

        {/* Espacio vacío para equilibrar el diseño o puedes quitar este View */}
        <View />

        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
        >
          <Feather name="user" size={18} color="#034600" />
        </TouchableOpacity>
      </View>

      {/* 2. ICONO CENTRAL Y BIENVENIDA */}
      <View className="items-center mb-5">

        {/* Contenedor del Logo Central */}
        <View className="w-40 h-40 bg-white rounded-3xl items-center justify-center shadow-md border border-gray-100 mb-3 p-2">
          <Image
            source={require('../../../assets/nutrick.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain'
            }}
          />
        </View>

        {/* Badge de Nutrición Inteligente */}
        <View className="bg-emerald-100/60 px-3.5 py-1 rounded-full flex-row items-center mb-3">
          <View className="w-2 h-2 rounded-full bg-[#00C896] mr-2" />
          <Text className="text-[11px] font-bold text-emerald-800 tracking-wider">NUTRICIÓN INTELIGENTE</Text>
        </View>

        <Text className="text-2xl font-black text-gray-900 text-center mb-1">¡Hola de nuevo!</Text>
        <Text className="text-xs text-gray-500 text-center px-6 leading-4">
          Accede a tu nutrición personalizada, metas fit y pedidos en curso.
        </Text>
      </View>
      {/* 3. PESTAÑAS (INICIAR SESIÓN / REGISTRARSE)[cite: 11] */}
      <View className="flex-row bg-gray-200/50 p-1 rounded-2xl mb-5 border border-gray-200/40">
        <TouchableOpacity className="flex-1 py-3 rounded-xl bg-white shadow-sm items-center justify-center">
          <Text className="text-xs font-bold text-gray-900">Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')} // <--- Ruta de Registro
          className="flex-1 py-3 rounded-xl items-center justify-center"
        >
          <Text className="text-xs font-bold text-gray-500">Registrarse</Text>
        </TouchableOpacity>
      </View>

      {/* 4. CAMPOS DE CREDENCIALES[cite: 11] */}
      <View className="space-y-3.5 mb-4">

        {/* Correo electrónico */}
        <View className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Feather name="at-sign" size={18} color="#6B7280" style={{ marginRight: 10 }} />
            <View className="flex-1">
              <Text className="text-[10px] text-gray-400 font-medium">Correo electrónico</Text>
              <TextInput
                className="text-xs font-bold text-gray-900 mt-0.5 p-0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          </View>
          <View className="w-5 h-5 rounded-full bg-emerald-100 items-center justify-center">
            <Ionicons name="checkmark" size={12} color="#00C896" />
          </View>
        </View>

        {/* Contraseña */}
        <View className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Feather name="lock" size={18} color="#6B7280" style={{ marginRight: 10 }} />
            <View className="flex-1">
              <Text className="text-[10px] text-gray-400 font-medium">Contraseña</Text>
              <TextInput
                className="text-xs font-bold text-gray-900 mt-0.5 p-0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

      </View>

      {/* 5. OPCIONES SECUNDARIAS[cite: 11] */}
      <View className="flex-row justify-between items-center mb-6 px-1">
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          className="flex-row items-center"
        >
          <View className={`w-4 h-4 rounded-md mr-2 items-center justify-center ${rememberMe ? 'bg-[#00C896]' : 'border border-gray-300'}`}>
            {rememberMe && <Ionicons name="checkmark" size={12} color="white" />}
          </View>
          <Text className="text-xs font-semibold text-gray-700">Recordar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text className="text-xs font-bold text-[#00C896]">¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      {/* 6. BOTÓN PRINCIPAL DE ACCESO[cite: 11] */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-[#00C896] rounded-2xl py-4 flex-row justify-center items-center shadow-md shadow-emerald-200 mb-3.5"
      >
        <Text className="text-white font-bold text-base mr-2">Iniciar Sesión</Text>
        <Ionicons name="arrow-forward" size={16} color="white" />
      </TouchableOpacity>

      {/* 7. ACCESO BIOMÉTRICO[cite: 11] */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('BiometricLoginScreen')}
        className="bg-emerald-50/80 border border-emerald-200/60 rounded-2xl py-3.5 flex-row justify-center items-center mb-6"
      >
        <MaterialCommunityIcons name="face-recognition" size={18} color="#00C896" style={{ marginRight: 8 }} />
        <Text className="text-xs font-bold text-emerald-900 mr-2">Acceder con Face ID / Huella</Text>
        <Feather name="lock" size={12} color="#00C896" />
      </TouchableOpacity> */}

      {/* 8. SEPARADOR SOCIAL[cite: 11] */}
      <View className="flex-row items-center mb-5">
        <View className="flex-1 h-[1px] bg-gray-200" />
        <Text className="text-[10px] font-bold text-gray-400 tracking-wider mx-4">O CONTINÚA CON</Text>
        <View className="flex-1 h-[1px] bg-gray-200" />
      </View>

      {/* 9. BOTONES DE ACCESO SOCIAL / PASSKEY[cite: 11] */}
      <View className="flex-row gap-3 mb-6">
        <TouchableOpacity
          onPress={() => alert('Apple Login')}
          className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
        >
          <Ionicons name="logo-apple" size={20} color="#111827" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => alert('Google Login')}
          className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
        >
          <Ionicons name="logo-google" size={20} color="#EA4335" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => alert('Passkey Login')}
          className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
        >
          <MaterialCommunityIcons name="key-variant" size={20} color="#00C896" />
        </TouchableOpacity>
      </View>

      {/* 10. TARJETA DE RACHA ACTIVA (Con Ruta)[cite: 11] */}
      <TouchableOpacity
        onPress={() => navigation.navigate('StreakScreen')}
        className="bg-white rounded-3xl p-4 mb-6 shadow-sm border border-emerald-100 flex-row items-center justify-between"
      >
        <View className="flex-row items-center flex-1 mr-3">
          <View className="bg-emerald-50 p-3 rounded-2xl mr-3">
            <Ionicons name="flash-outline" size={20} color="#00C896" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-bold text-gray-900">Tu racha: 14 días activo</Text>
            <Text className="text-[11px] text-gray-400 mt-0.5" numberOfLines={1}>Inicia para sincronizar tus macro...</Text>
          </View>
        </View>
        <View className="bg-emerald-100 px-2.5 py-1 rounded-full">
          <Text className="text-[10px] font-extrabold text-[#00C896]">+50 XP</Text>
        </View>
      </TouchableOpacity>

      {/* 11. PIE DE PÁGINA Y SEGURIDAD[cite: 11] */}
      <View className="items-center mb-10">
        <View className="flex-row items-center mb-1">
          <Feather name="shield" size={12} color="#9CA3AF" style={{ marginRight: 4 }} />
          <Text className="text-[11px] text-gray-400 font-medium">Conexión segura cifrada con TLS 1.3</Text>
        </View>
        <Text className="text-[10px] text-gray-400">Nutrik Health & Fitness Ecosystem © 2025</Text>
      </View>

    </ScrollView >
  );
}