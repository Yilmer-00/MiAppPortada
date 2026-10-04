import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { AuthContext } from "../../context/AuthContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('@gmail.com');
  const [password, setPassword] = useState('123456');

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const handleLogin = () => {
    const resultado = login(email, password);

    if (!resultado.success) {
      alert(resultado.message);
      return;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-800">
      <LinearGradient
        colors={['#f7faf7', '#04a51a']} // El color inicial (0%) y el color final (100%)
        locations={[0, 0.52]}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}
        >

          {/* 1. CABECERA SUPERIOR */}
          <View style={{ paddingTop: insets.top + 10 }}
            className="flex-row justify-between items-center px-5 pt-4 mb-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
              style={{ elevation: 2 }}
            >
              <Ionicons name="chevron-back" size={20} color="#1f283a" />
            </TouchableOpacity>

            <View />

            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
              style={{ elevation: 2 }}
            >
              <Feather name="user" size={18} color="#0e180d" />
            </TouchableOpacity>
          </View>

          {/* 2. ICONO CENTRAL Y BIENVENIDA */}
          <View className="items-center px-5 mb-6">
            {/* Contenedor del Logo Central */}
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

            {/* Badge de Nutrición Inteligente */}
            <View className="bg-emerald-100/60 px-3.5 py-1 rounded-full flex-row items-center mb-3">
              <Animated.View
                style={{ opacity: pulseAnim }}
                className="w-2 h-2 rounded-full bg-[#00FF62] mr-2"
              />
              <Text className="text-[11px] font-bold text-green-800 tracking-wider">NUTRICIÓN INTELIGENTE</Text>
            </View>

            <Text className="text-2xl font-black text-white text-center mb-1">¡Hola de nuevo!</Text>
            <Text className="text-xs text-green-50 text-center px-6 leading-4">
              Accede a tu nutrición personalizada, metas fit y pedidos en curso.
            </Text>
          </View>

          {/* CONTENEDOR PRINCIPAL (RECUADRO BLANCO TIPO TARJETA) */}
          <View
            className="bg-white rounded-t-[35px] pt-6 px-6 pb-10 flex-1 shadow-2xl border-t border-gray-100"
            style={{ elevation: 15 }}
          >

            {/* 3. PESTAÑAS (INICIAR SESIÓN / REGISTRARSE) */}
            <View className="flex-row bg-gray-100 p-1 rounded-2xl mb-5 border border-gray-200/40">
              <TouchableOpacity className="flex-1 py-3 rounded-xl bg-white shadow-sm items-center justify-center" style={{ elevation: 1 }}>
                <Text className="text-xs font-bold text-gray-900">Iniciar Sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                className="flex-1 py-3 rounded-xl items-center justify-center"
              >
                <Text className="text-xs font-bold text-gray-500">Registrarse</Text>
              </TouchableOpacity>
            </View>

            {/* 4. CAMPOS DE CREDENCIALES */}
            <View className="space-y-3.5 mb-4">
              {/* Correo electrónico */}
              <View
                className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 flex-row items-center justify-between mb-3.5"
                style={{ elevation: 2 }}
              >
                <View className="flex-row items-center flex-1">
                  <Feather name="at-sign" size={18} color="#687285" style={{ marginRight: 10 }} />
                  <View className="flex-1">
                    <Text className="text-[10px] text-gray-400 font-medium">Correo electrónico</Text>
                    <TextInput
                      className="text-xs font-bold text-gray-900 mt-0.5 p-0"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>
                <View className="w-5 h-5 rounded-full bg-emerald-100 items-center justify-center">
                  <Ionicons name="checkmark" size={12} color="#0f6b54" />
                </View>
              </View>

              {/* Contraseña */}
              <View
                className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 flex-row items-center justify-between"
                style={{ elevation: 2 }}
              >
                <View className="flex-row items-center flex-1">
                  <Feather name="lock" size={18} color="#62666d" style={{ marginRight: 10 }} />
                  <View className="flex-1">
                    <Text className="text-[10px] text-gray-400 font-medium">Contraseña</Text>
                    <TextInput
                      className="text-xs font-bold text-gray-900 mt-0.5 p-0"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* 5. OPCIONES SECUNDARIAS */}
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

            {/* 6. BOTÓN PRINCIPAL DE ACCESO */}
            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.85}
              className="bg-[#27A855] rounded-2xl py-4 flex-row justify-center items-center mb-6"
              style={{
                elevation: 6,
                shadowColor: '#0c4b0c',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 8,
              }}
            >
              <Text className="text-white font-bold text-base mr-2 tracking-wide">Iniciar Sesión</Text>
              <Ionicons name="arrow-forward" size={18} color="white" />
            </TouchableOpacity>

            {/* 8. SEPARADOR SOCIAL */}
            <View className="flex-row items-center mb-5">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="text-[10px] font-bold text-gray-400 tracking-wider mx-4">O CONTINÚA CON</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            {/* 9. BOTONES DE ACCESO SOCIAL / PASSKEY */}
            <View className="flex-row gap-3 mb-6">
              <TouchableOpacity
                onPress={() => alert('Apple Login')}
                className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
                style={{ elevation: 2 }}
              >
                <Ionicons name="logo-apple" size={20} color="#111827" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => alert('Google Login')}
                className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
                style={{ elevation: 2 }}
              >
                <Ionicons name="logo-google" size={20} color="#EA4335" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => alert('Passkey Login')}
                className="flex-1 bg-white border border-gray-100 py-3.5 rounded-2xl items-center shadow-sm"
                style={{ elevation: 2 }}
              >
                <MaterialCommunityIcons name="key-variant" size={20} color="#00C896" />
              </TouchableOpacity>
            </View>

            {/* 10. TARJETA DE RACHA ACTIVA */}
            <TouchableOpacity
              onPress={() => navigation.navigate('StreakScreen')}
              className="bg-emerald-50/50 rounded-3xl p-4 mb-6 shadow-sm border border-emerald-100 flex-row items-center justify-between"
              style={{ elevation: 1 }}
            >
              <View className="flex-row items-center flex-1 mr-3">
                <View className="bg-emerald-100 p-3 rounded-2xl mr-3">
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

            {/* 11. PIE DE PÁGINA Y SEGURIDAD */}
            <View className="items-center mb-4">
              <View className="flex-row items-center mb-1">
                <Feather name="shield" size={12} color="#9CA3AF" style={{ marginRight: 4 }} />
                <Text className="text-[11px] text-gray-400 font-medium">Conexión segura cifrada con TLS 1.3</Text>
              </View>
              <Text className="text-[10px] text-gray-400">Nutrik Health & Fitness Ecosystem © 2025</Text>
            </View>

          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}