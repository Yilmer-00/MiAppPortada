import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Para el degradado de la tarjeta
import { useNavigation } from "@react-navigation/native";

export default function PaymentMethodsScreen() {
  const navigation = useNavigation(); // Hook para manejar las rutas

  return (
    <ScrollView
      className="flex-1 bg-gray-50 px-4 pt-4"
      showsVerticalScrollIndicator={false}
    >
      {/* 1. TARJETA VIRTUAL SUPERIOR (NUTRIKPAY) */}
      <LinearGradient
        colors={["#00C896", "#028059", "#014732"]} // Degradado verde de la tarjeta
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-5 mb-6 shadow-md relative overflow-hidden"
      >
        {/* Cabecera de la Tarjeta */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="food-apple-outline"
              size={20}
              color="white"
              style={{ marginRight: 6 }}
            />
            <Text className="text-white font-bold text-lg tracking-wider">
              NutrikPay
            </Text>
          </View>
          <View className="bg-white/20 px-3 py-1 rounded-full flex-row items-center">
            <Ionicons
              name="card-outline"
              size={12}
              color="white"
              style={{ marginRight: 4 }}
            />
            <Text className="text-[10px] font-bold text-white tracking-widest">
              PLATINUM
            </Text>
          </View>
        </View>

        {/* Chip de la Tarjeta */}
        <View className="bg-amber-400 w-10 h-8 rounded-md mb-4 justify-center items-center opacity-90">
          <View className="border border-amber-600 w-full h-[1px]" />
        </View>

        {/* Número de Tarjeta oculto */}
        <Text className="text-white font-mono text-lg tracking-widest mb-4">
          •••• •••• •••• 4210
        </Text>

        {/* Pie de la Tarjeta */}
        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-[10px] text-emerald-200 uppercase tracking-wider">
              YILMER MELENGE
            </Text>
            <Text className="text-xs font-bold text-white">EXP 08/28</Text>
          </View>
          <View>
            <Text className="text-white font-black italic text-lg tracking-wider">
              VISA
            </Text>
            <Text className="text-[8px] text-emerald-200 tracking-widest text-right">
              INFINITE
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* 2. SECCIÓN: TARJETAS REGISTRADAS */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3 px-1">
          <Text className="text-xs font-bold text-gray-400 tracking-wider">
            TARJETAS REGISTRADAS
          </Text>
          <Text className="text-xs font-semibold text-gray-500">
            2 vinculadas
          </Text>
        </View>

        {/* Tarjeta 1: Visa (Predeterminada) */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CardDetailScreen", { cardId: "visa-4210" })
          }
          className="bg-white rounded-3xl p-4 mb-3 shadow-sm border border-emerald-100 flex-row justify-between items-center"
        >
          <View className="flex-row items-center flex-1">
            <View className="bg-emerald-50 p-3 rounded-2xl mr-3">
              <Ionicons name="card-outline" size={20} color="#00C896" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-sm font-bold text-gray-900 mr-2">
                  Visa Nutrik Pl...
                </Text>
                <View className="bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <Text className="text-[9px] font-bold text-[#00C896]">
                    Predeterminada
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center mt-1 space-x-3">
                <Text className="text-xs text-gray-400">•••• 4210</Text>
                <Text className="text-xs text-gray-400">• Vence 08/28</Text>
                <Text className="text-xs text-gray-400">• Uso habitual</Text>
              </View>
            </View>
          </View>
          <View className="w-6 h-6 rounded-full bg-emerald-500 items-center justify-center">
            <Ionicons name="checkmark" size={14} color="white" />
          </View>
        </TouchableOpacity>

        {/* Tarjeta 2: Mastercard Black */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CardDetailScreen", { cardId: "master-8821" })
          }
          className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex-row justify-between items-center"
        >
          <View className="flex-row items-center flex-1">
            <View className="bg-gray-100 p-3 rounded-2xl mr-3">
              <MaterialCommunityIcons
                name="wallet-outline"
                size={20}
                color="#6B7280"
              />
            </View>
            <View>
              <Text className="text-sm font-bold text-gray-900">
                Mastercard Black
              </Text>
              <Text className="text-xs text-gray-400 mt-1">
                •••• 8821 • Vence 11/26
              </Text>
            </View>
          </View>
          <View className="w-6 h-6 rounded-full bg-gray-200" />
        </TouchableOpacity>
      </View>

      {/* 3. SECCIÓN: BILLETERAS Y PAGOS RÁPIDOS */}
      <View className="mb-6">
        <Text className="text-xs font-bold text-gray-400 tracking-wider mb-3 px-1">
          BILLETERAS Y PAGOS RÁPIDOS
        </Text>

        <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-4">
          {/* Apple / Google Pay */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("WalletConfigScreen", { type: "contactless" })
            }
            className="flex-row justify-between items-center py-1"
          >
            <View className="flex-row items-center flex-1">
              <View className="bg-emerald-50 p-2.5 rounded-2xl mr-3">
                <Ionicons
                  name="phone-portrait-outline"
                  size={18}
                  color="#00C896"
                />
              </View>
              <View className="flex-1 pr-2">
                <Text className="text-sm font-bold text-gray-800">
                  Apple Pay / Google ...
                </Text>
                <Text className="text-xs text-gray-400 mt-0.5">
                  Pago contactless de 1-toque
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <View className="bg-emerald-100 px-2.5 py-0.5 rounded-full mr-2">
                <Text className="text-[10px] font-bold text-[#00C896]">
                  Activo
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <View className="h-[1px] bg-gray-100 my-1" />

          {/* Nequi & PSE */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("WalletConfigScreen", { type: "nequi-pse" })
            }
            className="flex-row justify-between items-center py-1"
          >
            <View className="flex-row items-center flex-1">
              <View className="bg-emerald-50 p-2.5 rounded-2xl mr-3">
                <Feather name="smartphone" size={18} color="#00C896" />
              </View>
              <View className="flex-1 pr-2">
                <Text className="text-sm font-bold text-gray-800">
                  Nequi & PSE Enlace
                </Text>
                <Text className="text-xs text-gray-400 mt-0.5">
                  Débito bancario en línea instantáneo
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <View className="bg-blue-50 px-2.5 py-0.5 rounded-full mr-2">
                <Text className="text-[10px] font-bold text-blue-600">
                  Vinculado
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. BOTÓN CON RUTA: AGREGAR NUEVO MÉTODO DE PAGO */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddPaymentMethodScreen")}
        className="bg-emerald-50 border border-emerald-200 border-dashed rounded-2xl py-4 flex-row justify-center items-center mb-6"
      >
        <View className="bg-[#00C896] w-6 h-6 rounded-full items-center justify-center mr-2">
          <Ionicons name="add" size={16} color="white" />
        </View>
        <Text className="text-[#00C896] font-bold text-sm">
          Agregar nuevo método de pago
        </Text>
      </TouchableOpacity>

      {/* 5. TARJETA INFORMATIVA DE SEGURIDAD */}
      <View className="bg-white rounded-3xl p-4 mb-4 shadow-sm border border-gray-100 flex-row items-start">
        <View className="bg-emerald-50 p-2.5 rounded-2xl mr-3 mt-1">
          <Feather name="shield" size={18} color="#00C896" />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-xs font-bold text-gray-800 mr-2">
              Cifrado de grado bancario
            </Text>
            <View className="bg-emerald-100 px-2 py-0.5 rounded">
              <Text className="text-[9px] font-extrabold text-[#00C896]">
                256-BIT
              </Text>
            </View>
          </View>
          <Text className="text-[11px] text-gray-500 leading-4">
            Tus datos financieros viajan encriptados bajo protocolo SSL y
            certificación PCI-DSS Nivel 1. Nutrik nunca almacena tu código CVV
            de seguridad.
          </Text>
        </View>
      </View>

      {/* 6. PIE DE PÁGINA / AUTO-CARGO */}
      <View className="bg-white rounded-2xl p-4 mb-10 shadow-sm border border-gray-100 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Ionicons
            name="sync-outline"
            size={16}
            color="#00C896"
            style={{ marginRight: 8 }}
          />
          <Text className="text-xs font-semibold text-gray-700">
            Auto-cargo para suscripción activa
          </Text>
        </View>
        <View className="bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-bold text-gray-800">Visa 4210</Text>
        </View>
      </View>
    </ScrollView>
  );
}
