import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Sparkles,
  Heart,
  Plus,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react-native";

// Productos con datos mejorados
const newProducts = [
  {
    id: "1",
    title: "Mantequilla de Maní Crunchy",
    brand: "Nutrik Natural",
    price: "$28.000",
    weight: "500g",
    image: require("../../assets/mantequilla.png"),
  },
  {
    id: "2",
    title: "Barra de Proteína Cacao",
    brand: "FitBar Organic",
    price: "$12.000",
    weight: "60g",
    image: require("../../assets/barra.png"),
  },
  {
    id: "3",
    title: "Matcha Orgánico en Polvo",
    brand: "Green Tea Co",
    price: "$52.000",
    weight: "100g",
    image: require("../../assets/matcha.png"),
  },
  {
    id: "4",
    title: "Creatina Monohidratada",
    brand: "Nutrik Pure",
    price: "$85.000",
    weight: "300g",
    image: require("../../assets/creatina.png"),
  },
  {
    id: "5",
    title: "Aceite de Coco Extra Virgen",
    brand: "BioVida",
    price: "$34.000",
    weight: "450ml",
    image: require("../../assets/coco.png"),
  },
  {
    id: "6",
    title: "Granola de Frutos Secos",
    brand: "Nutrik Natural",
    price: "$22.000",
    weight: "400g",
    image: require("../../assets/secos.png"),
  },
];

export default function NewScreen() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleAdd = (product) => {
    console.log("Producto agregado:", product.title);
  };

  return (
    <SafeAreaView className="flex-1 bg-stone-50" edges={["top"]}>
      {/* HEADER MODERNO */}
      <View className="flex-row items-center justify-between px-5 py-3.5 bg-white border-b border-stone-100 shadow-sm shadow-stone-200/50">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          className="w-10 h-10 rounded-full bg-emerald-50/80 items-center justify-center border border-emerald-100/60"
        >
          <ArrowLeft size={20} color="#065F46" />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-lg font-black tracking-tight text-emerald-950">
            Lo Nuevo
          </Text>
          <Text className="text-xs font-medium text-stone-400">
            Recién llegados a la tienda
          </Text>
        </View>

        {/* Botón de filtro para mantener simetría en el header */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-10 h-10 rounded-full bg-stone-100/80 items-center justify-center border border-stone-200/60"
        >
          <SlidersHorizontal size={18} color="#57534E" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 }}
      >
        {/* BANNER DESTACADO */}
        <View className="bg-emerald-800 rounded-3xl p-5 mb-6 flex-row items-center overflow-hidden shadow-lg shadow-emerald-900/20">
          <View className="w-12 h-12 rounded-2xl bg-white/15 items-center justify-center mr-4 border border-white/20">
            <Sparkles size={22} color="#A7F3D0" />
          </View>

          <View className="flex-1 pr-1">
            <View className="self-start px-2 py-0.5 rounded-full bg-emerald-700/80 border border-emerald-500/30 mb-1">
              <Text className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">
                Lanzamientos
              </Text>
            </View>
            <Text className="text-white text-base font-bold tracking-tight">
              Descubre lo más fresco
            </Text>
            <Text className="text-emerald-100/80 text-xs leading-4 mt-0.5">
              Productos seleccionados para impulsar tu estilo de vida saludable.
            </Text>
          </View>
        </View>

        {/* SECCIÓN Y CONTADOR */}
        <View className="flex-row items-center justify-between mb-4 px-1">
          <View className="flex-row items-baseline gap-2">
            <Text className="text-lg font-extrabold text-stone-900 tracking-tight">
              Catálogo Nuevo
            </Text>
            <Text className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {newProducts.length} items
            </Text>
          </View>
          <Text className="text-xs font-medium text-stone-400">
            Ordenar por novedad
          </Text>
        </View>

        {/* GRID DE PRODUCTOS */}
        <View className="flex-row flex-wrap justify-between">
          {newProducts.map((item) => {
            const isFav = !!favorites[item.id];

            return (
              <View
                key={item.id}
                className="w-[48%] bg-white rounded-3xl p-3 mb-4 border border-stone-100 shadow-sm shadow-stone-300/40 relative"
              >
                {/* BADGE "NUEVO" */}
                <View className="absolute top-3 left-3 z-10 bg-emerald-600 px-2.5 py-0.5 rounded-full shadow-sm shadow-emerald-700/30">
                  <Text className="text-[9px] font-black tracking-wider text-white uppercase">
                    NUEVO
                  </Text>
                </View>

                {/* BOTÓN FAVORITO INTERACTIVO */}
                <TouchableOpacity
                  onPress={() => toggleFavorite(item.id)}
                  activeOpacity={0.7}
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/90 items-center justify-center shadow-sm border border-stone-100"
                >
                  <Heart
                    size={15}
                    color={isFav ? "#EF4444" : "#A8A29E"}
                    fill={isFav ? "#EF4444" : "transparent"}
                  />
                </TouchableOpacity>

                {/* CONTENEDOR DE IMAGEN */}
                <View className="h-32 bg-stone-50/80 rounded-2xl items-center justify-center p-2 mb-2.5 mt-4">
                  <Image
                    source={item.image}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                </View>

                {/* INFORMACIÓN DEL PRODUCTO */}
                <View className="flex-row items-center justify-between mb-1">
                  <Text
                    numberOfLines={1}
                    className="text-[10px] font-bold text-emerald-800 tracking-wide uppercase"
                  >
                    {item.brand}
                  </Text>
                  {item.weight && (
                    <Text className="text-[10px] font-medium text-stone-400">
                      {item.weight}
                    </Text>
                  )}
                </View>

                <Text
                  numberOfLines={2}
                  className="text-xs font-bold text-stone-800 leading-4 min-h-[32px]"
                >
                  {item.title}
                </Text>

                {/* FILA INFERIOR (PRECIO + BOTÓN AGREGAR) */}
                <View className="flex-row items-center justify-between mt-3 pt-2 border-t border-stone-50">
                  <View>
                    <Text className="text-[9px] font-medium text-stone-400">
                      Precio
                    </Text>
                    <Text className="text-sm font-black text-emerald-900 tracking-tight">
                      {item.price}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleAdd(item)}
                    activeOpacity={0.8}
                    className="w-8 h-8 rounded-full bg-emerald-600 items-center justify-center shadow-md shadow-emerald-700/30"
                  >
                    <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* MENSAJE FINAL */}
        <View className="flex-row items-center justify-center py-6 gap-2">
          <CheckCircle2 size={16} color="#10B981" />
          <Text className="text-xs font-medium text-stone-500">
            Estás al día con todos los nuevos lanzamientos
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}