import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PreferencesScreen() {
  const navigation = useNavigation(); // Hook de navegación

  // Estados interactivos para las selecciones de la pantalla
  const [diets, setDiets] = useState({
    keto: true,
    organico: true,
    vegano: false,
    vegetariano: false,
    bajoCarbohidratos: false,
    paleo: false,
    highProtein: false,
  });

  const [allergies, setAllergies] = useState({
    sinGluten: true,
    sinLactosa: false,
    sinSoja: false,
    sinAzucar: true,
  });

  const [objective, setObjective] = useState("ganancia"); // 'ganancia', 'perdida', 'energia', 'rendimiento'

  // Función para alternar dietas
  const toggleDiet = (key) => {
    setDiets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Función para alternar alergias
  const toggleAllergy = (key) => {
    setAllergies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50 px-4 pt-4"
      showsVerticalScrollIndicator={false}
    >
      {/* 1. BANNER SUPERIOR: NUTRIK AI */}
      <View className="bg-white rounded-3xl p-5 mb-6 shadow-sm border border-emerald-100">
        <View className="flex-row items-center mb-3">
          <View className="bg-emerald-100 p-2.5 rounded-2xl mr-3">
            <MaterialCommunityIcons
              name="food-apple-outline"
              size={22}
              color="#00C896"
            />
          </View>
          <View className="bg-emerald-50 px-3 py-1 rounded-full flex-row items-center">
            <Text className="text-xs font-bold text-[#00C896]">Nutrik AI</Text>
            <Text className="text-xs text-gray-400 ml-1">
              • Catálogo a tu medida
            </Text>
          </View>
        </View>

        <Text className="text-xs text-gray-600 leading-5 mb-4">
          Personaliza tu catálogo y recomendaciones automáticas de
          suplementación y nutrición según tu estilo de vida.
        </Text>

        <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
          <View className="flex-row items-center bg-gray-50 px-3 py-1.5 rounded-2xl">
            <Feather
              name="sliders"
              size={14}
              color="#4B5563"
              style={{ marginRight: 6 }}
            />
            <Text className="text-xs font-semibold text-gray-700">
              4 filtros activos
            </Text>
          </View>
          <View className="bg-emerald-50 px-3 py-1.5 rounded-2xl">
            <Text className="text-xs font-bold text-[#00C896]">
              Actualizado
            </Text>
          </View>
        </View>
      </View>

      {/* 2. SECCIÓN: ENFOQUE O TIPO DE DIETA */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3 px-1">
          <Text className="text-xs font-bold text-gray-400 tracking-wider">
            ● ENFOQUE O TIPO DE DIETA
          </Text>
          <Text className="text-xs font-medium text-gray-400">
            Múltiple selección
          </Text>
        </View>

        <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex-row flex-wrap gap-2">
          {/* Chip Keto */}
          <TouchableOpacity
            onPress={() => toggleDiet("keto")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${diets.keto ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {diets.keto && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color="white"
                style={{ marginRight: 6 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${diets.keto ? "text-white" : "text-gray-700"}`}
            >
              Keto / Cetogénica
            </Text>
          </TouchableOpacity>

          {/* Chip Orgánico */}
          <TouchableOpacity
            onPress={() => toggleDiet("organico")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${diets.organico ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {diets.organico && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color="white"
                style={{ marginRight: 6 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${diets.organico ? "text-white" : "text-gray-700"}`}
            >
              Orgánico & Clean
            </Text>
          </TouchableOpacity>

          {/* Chip Vegano */}
          <TouchableOpacity
            onPress={() => toggleDiet("vegano")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${diets.vegano ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {!diets.vegano && (
              <Ionicons
                name="add"
                size={16}
                color="#6B7280"
                style={{ marginRight: 4 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${diets.vegano ? "text-white" : "text-gray-700"}`}
            >
              Vegano / Plant-Based
            </Text>
          </TouchableOpacity>

          {/* Chip Vegetariano */}
          <TouchableOpacity
            onPress={() => toggleDiet("vegetariano")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${diets.vegetariano ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {!diets.vegetariano && (
              <Ionicons
                name="add"
                size={16}
                color="#6B7280"
                style={{ marginRight: 4 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${diets.vegetariano ? "text-white" : "text-gray-700"}`}
            >
              Vegetariano
            </Text>
          </TouchableOpacity>

          {/* Chip Bajo en Carbohidratos */}
          <TouchableOpacity
            onPress={() => toggleDiet("bajoCarbohidratos")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${diets.bajoCarbohidratos ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {!diets.bajoCarbohidratos && (
              <Ionicons
                name="add"
                size={16}
                color="#6B7280"
                style={{ marginRight: 4 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${diets.bajoCarbohidratos ? "text-white" : "text-gray-700"}`}
            >
              Bajo en Carbohidratos
            </Text>
          </TouchableOpacity>

          {/* Chip Paleo */}
          <TouchableOpacity
            onPress={() => toggleDiet("paleo")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${diets.paleo ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {!diets.paleo && (
              <Ionicons
                name="add"
                size={16}
                color="#6B7280"
                style={{ marginRight: 4 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${diets.paleo ? "text-white" : "text-gray-700"}`}
            >
              Paleo
            </Text>
          </TouchableOpacity>

          {/* Chip High Protein */}
          <TouchableOpacity
            onPress={() => toggleDiet("highProtein")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${diets.highProtein ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {!diets.highProtein && (
              <Ionicons
                name="add"
                size={16}
                color="#6B7280"
                style={{ marginRight: 4 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${diets.highProtein ? "text-white" : "text-gray-700"}`}
            >
              High Protein / Fitness
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. SECCIÓN: ALERGIAS E INTOLERANCIAS */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3 px-1">
          <Text className="text-xs font-bold text-gray-400 tracking-wider">
            ● ALERGIAS E INTOLERANCIAS
          </Text>
          <Text className="text-xs font-medium text-gray-400">
            Excluir ingredientes
          </Text>
        </View>

        <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex-row flex-wrap gap-2">
          {/* Sin Gluten */}
          <TouchableOpacity
            onPress={() => toggleAllergy("sinGluten")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${allergies.sinGluten ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {allergies.sinGluten && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color="white"
                style={{ marginRight: 6 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${allergies.sinGluten ? "text-white" : "text-gray-700"}`}
            >
              Sin Gluten
            </Text>
          </TouchableOpacity>

          {/* Sin Lactosa */}
          <TouchableOpacity
            onPress={() => toggleAllergy("sinLactosa")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${allergies.sinLactosa ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {!allergies.sinLactosa && (
              <Ionicons
                name="ban-outline"
                size={16}
                color="#9CA3AF"
                style={{ marginRight: 4 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${allergies.sinLactosa ? "text-white" : "text-gray-700"}`}
            >
              Sin Lactosa
            </Text>
          </TouchableOpacity>

          {/* Sin Soja */}
          <TouchableOpacity
            onPress={() => toggleAllergy("sinSoja")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${allergies.sinSoja ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {!allergies.sinSoja && (
              <Ionicons
                name="ban-outline"
                size={16}
                color="#9CA3AF"
                style={{ marginRight: 4 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${allergies.sinSoja ? "text-white" : "text-gray-700"}`}
            >
              Sin Soja
            </Text>
          </TouchableOpacity>

          {/* Sin Azúcar Añadida */}
          <TouchableOpacity
            onPress={() => toggleAllergy("sinAzucar")}
            className={`flex-row items-center px-4 py-2.5 rounded-full border ${allergies.sinAzucar ? "bg-[#00C896] border-[#00C896]" : "bg-gray-50 border-gray-200"}`}
          >
            {allergies.sinAzucar && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color="white"
                style={{ marginRight: 6 }}
              />
            )}
            <Text
              className={`text-xs font-bold ${allergies.sinAzucar ? "text-white" : "text-gray-700"}`}
            >
              Sin Azúcar Añadida
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. SECCIÓN: OBJETIVO PRINCIPAL */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3 px-1">
          <Text className="text-xs font-bold text-gray-400 tracking-wider">
            ● OBJETIVO PRINCIPAL
          </Text>
          <Text className="text-xs font-bold text-[#00C896]">
            1 Seleccionado
          </Text>
        </View>

        {/* Grid de 2x2 para Objetivos */}
        <View className="flex-row gap-3 mb-3">
          {/* Tarjeta 1: Ganancia Muscular */}
          <TouchableOpacity
            onPress={() => setObjective("ganancia")}
            className={`flex-1 bg-white rounded-3xl p-4 border relative ${objective === "ganancia" ? "border-[#00C896] bg-emerald-50/20 shadow-sm" : "border-gray-100 shadow-sm"}`}
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="bg-emerald-100 p-2.5 rounded-2xl">
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={18}
                  color="#00C896"
                />
              </View>
              {objective === "ganancia" && (
                <View className="bg-[#00C896] w-5 h-5 rounded-full items-center justify-center">
                  <Ionicons name="checkmark" size={12} color="white" />
                </View>
              )}
            </View>
            <Text className="text-sm font-bold text-gray-900 mb-1">
              Ganancia Muscular
            </Text>
            <Text className="text-xs text-gray-500 leading-4">
              Proteínas y aminoácidos
            </Text>
          </TouchableOpacity>

          {/* Tarjeta 2: Pérdida de Grasa */}
          <TouchableOpacity
            onPress={() => setObjective("perdida")}
            className={`flex-1 bg-white rounded-3xl p-4 border relative ${objective === "perdida" ? "border-[#00C896] bg-emerald-50/20 shadow-sm" : "border-gray-100 shadow-sm"}`}
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="bg-gray-100 p-2.5 rounded-2xl">
                <Ionicons name="flame-outline" size={18} color="#6B7280" />
              </View>
            </View>
            <Text className="text-sm font-bold text-gray-900 mb-1">
              Pérdida de Grasa
            </Text>
            <Text className="text-xs text-gray-500 leading-4">
              Metabolismo y saciedad
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-3">
          {/* Tarjeta 3: Energía & Vitalidad */}
          <TouchableOpacity
            onPress={() => setObjective("energia")}
            className={`flex-1 bg-white rounded-3xl p-4 border relative ${objective === "energia" ? "border-[#00C896] bg-emerald-50/20 shadow-sm" : "border-gray-100 shadow-sm"}`}
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="bg-gray-100 p-2.5 rounded-2xl">
                <Ionicons name="flash-outline" size={18} color="#6B7280" />
              </View>
            </View>
            <Text className="text-sm font-bold text-gray-900 mb-1">
              Energía & Vitalidad
            </Text>
            <Text className="text-xs text-gray-500 leading-4">
              Vitaminas y micronutrientes
            </Text>
          </TouchableOpacity>

          {/* Tarjeta 4: Rendimiento */}
          <TouchableOpacity
            onPress={() => setObjective("rendimiento")}
            className={`flex-1 bg-white rounded-3xl p-4 border relative ${objective === "rendimiento" ? "border-[#00C896] bg-emerald-50/20 shadow-sm" : "border-gray-100 shadow-sm"}`}
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="bg-gray-100 p-2.5 rounded-2xl">
                <MaterialCommunityIcons
                  name="run-fast"
                  size={18}
                  color="#6B7280"
                />
              </View>
            </View>
            <Text className="text-sm font-bold text-gray-900 mb-1">
              Rendimiento
            </Text>
            <Text className="text-xs text-gray-500 leading-4">
              Resistencia e hidratación
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 5. SECCIÓN: PRODUCTOS QUE VERÁS SUGERIDOS */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3 px-1">
          <View className="flex-row items-center">
            <Feather
              name="sparkles"
              size={14}
              color="#00C896"
              style={{ marginRight: 6 }}
            />
            <Text className="text-xs font-bold text-gray-800">
              Productos que verás sugeridos
            </Text>
          </View>
          <View className="bg-blue-50 px-2.5 py-0.5 rounded-full">
            <Text className="text-[10px] font-bold text-blue-600">Preview</Text>
          </View>
        </View>

        {/* Tarjetas de productos sugeridos (Scroll horizontal) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-3"
        >
          {/* Producto 1 */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetailScreen", { productId: "whey" })
            }
            className="bg-white rounded-3xl p-3 border border-gray-100 shadow-sm w-48 mr-3 flex-row items-center"
          >
            <View className="bg-gray-100 rounded-2xl p-2 mr-3">
              {/* Cambia esto por tu imagen local con require() si lo deseas */}
              <View className="w-10 h-10 bg-emerald-50 rounded-xl items-center justify-center">
                <MaterialCommunityIcons
                  name="bottle-tonic-outline"
                  size={20}
                  color="#00C896"
                />
              </View>
            </View>
            <View className="flex-1">
              <Text
                className="text-xs font-bold text-gray-900"
                numberOfLines={1}
              >
                Clean Whey Isolate
              </Text>
              <Text className="text-[10px] font-semibold text-[#00C896] mt-0.5">
                98% Keto Match
              </Text>
            </View>
          </TouchableOpacity>

          {/* Producto 2 */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetailScreen", {
                productId: "electrolitos",
              })
            }
            className="bg-white rounded-3xl p-3 border border-gray-100 shadow-sm w-48 flex-row items-center"
          >
            <View className="bg-gray-100 rounded-2xl p-2 mr-3">
              <View className="w-10 h-10 bg-emerald-50 rounded-xl items-center justify-center">
                <MaterialCommunityIcons
                  name="water-outline"
                  size={20}
                  color="#00C896"
                />
              </View>
            </View>
            <View className="flex-1">
              <Text
                className="text-xs font-bold text-gray-900"
                numberOfLines={1}
              >
                Electrolitos Pro
              </Text>
              <Text className="text-[10px] font-semibold text-[#00C896] mt-0.5">
                Sin Azúcar
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 6. BOTÓN INFERIOR: GUARDAR PREFERENCIAS */}
      <View className="mb-10">
        <TouchableOpacity
          onPress={() => {
            alert("¡Preferencias guardadas con éxito!");
            navigation.goBack(); // Vuelve a la pantalla anterior
          }}
          className="bg-[#00C896] rounded-2xl py-4 flex-row justify-center items-center shadow-md shadow-emerald-200"
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white font-bold text-base">
            Guardar Preferencias
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-[11px] text-gray-400 mt-3 px-4">
          Tus filtros se aplicarán de inmediato a todo el catálogo Nutrik.
        </Text>
      </View>
    </ScrollView>
  );
}
