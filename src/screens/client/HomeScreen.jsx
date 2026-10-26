import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Star, Flame, Plus, ShoppingBag } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import TopHeader from "../../components/TopHeader";
import Footer from "../../components/Footer";

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;

const banners = [
  {
    id: "1",
    title: "50% OFF\nEn Tu Vida Saludable",
    subtitle: "Aprovecha hoy nuestros descuentos",
    buttonText: "Comprar Ahora",
    image: require("../../../assets/Saludable.png"),
  },
  {
    id: "2",
    title: "Nuevas Proteínas\n100% Orgánicas",
    subtitle: "Envíos gratis por compras mayores a $100k",
    buttonText: "Ver Catálogo",
    image: require("../../../assets/bannerdos.png"),
  },
  {
    id: "3",
    title: "Ofertas Especiales\nen Multivitamínicos",
    subtitle: "Fortalece tu salud este mes",
    buttonText: "Descubrir",
    image: require("../../../assets/bannertres.png"),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedTag, setSelectedTag] = useState("Todos");
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const bannerRef = useRef(null);
  const tags = ["Todos", "Orgánico", "Keto", "Vegano", "Sin Gluten"];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIndex((prevIndex) => {
        const nextIndex = prevIndex === banners.length - 1 ? 0 : prevIndex + 1;
        bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / BANNER_WIDTH);
    setActiveBannerIndex(index);
  };

  const categories = [
    { id: "1", name: "Proteínas", icon: require("../../../assets/icons/proteina.png"), bgColor: "bg-[#E8F5E9]" },
    { id: "2", name: "Vitaminas", icon: require("../../../assets/icons/vitaminas.png"), bgColor: "bg-[#FFF3E0]" },
    { id: "3", name: "Snacks", icon: require("../../../assets/icons/snacks.png"), bgColor: "bg-[#c4f783]" },
    { id: "4", name: "Bebidas", icon: require("../../../assets/icons/bebidas.png"), bgColor: "bg-[#99eff1]" },
    { id: "5", name: "Creatinas", icon: require("../../../assets/icons/creatina.png"), bgColor: "bg-[#ffaf53]" },
    { id: "6", name: "Superfoods", icon: require("../../../assets/icons/superfoods.png"), bgColor: "bg-[#ffe570]" },
  ];

  // Productos de respaldo locales
  const localProducts = [
    { id: "1", title: "Proteína Whey Gold", category: "Proteínas", price: "$140.000" },
    { id: "2", title: "Vitamina C 1000mg", category: "Vitaminas", price: "$45.000" },
    { id: "3", title: "Creatina Monohidratada", category: "Creatinas", price: "$90.000" },
    { id: "4", title: "Barra Energética Keto", category: "Snacks", price: "$8.000" },
  ];

  const deals = [
    { id: "1", title: "Combo Keto Saludable", subtitle: "30% OFF en toda la categoría", time: "Envío Gratis", image: require("../../../assets/Saludable.png") },
    { id: "2", title: "Kit de Vitaminas D3", subtitle: "Ahorra comprando el dúo", time: "20 min o menos", image: require("../../../assets/bannerdos.png") },
    { id: "3", title: "Pack Proteína Whey", subtitle: "Incluye shaker de regalo", time: "Envío Gratis", image: require("../../../assets/proteina.png") },
    { id: "4", title: "Snacks Energéticos", subtitle: "2x1 en barras seleccionadas", time: "15 min o menos", image: require("../../../assets/Questbar.png") },
  ];

  const storesNearYou = [
    { id: "1", name: "Nutrik Organic Store", category: "Orgánico • Saludable", rating: "4.8", time: "15-20 min", discount: "15% OFF", image: require("../../../assets/proteina.png"), bgAccent: "bg-[#E8F5E9]" },
    { id: "2", name: "Vida Natural Express", category: "Suplementos • Vitaminas", rating: "4.9", time: "10-15 min", discount: "20% OFF", image: require("../../../assets/barra.png"), bgAccent: "bg-[#FFF3E0]" },
  ];

  const handleAddToCart = (product) => {
    navigation.navigate("Carrito", {
      productoAgregar: {
        id: product.id,
        title: product.title,
        brand: product.category,
        price: product.price,
        numericPrice: 28000,
        weight: "1 un",
        bgAccent: "#F8FAFC",
        quantity: 1,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]" edges={["top"]}>
      <TopHeader title="Nutrik" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4">
          {/* Barra de Búsqueda */}
          <View className="flex-row items-center bg-[#f0f2f0] rounded-full px-4 h-12 mb-4">
            <Search size={18} color="#888" className="mr-2" />
            <TextInput
              placeholder="Buscar productos, marcas, suplementos..."
              placeholderTextColor="#888"
              className="flex-1 text-sm text-[#333]"
            />
          </View>

          {/* Chips / Filtros Horizontales */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingBottom: 15 }}>
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag}
                className={`px-5 py-2 rounded-full ${selectedTag === tag ? "bg-[#15803D]" : "bg-[#f0f0f0]"}`}
                onPress={() => setSelectedTag(tag)}
              >
                <Text className={`text-xs font-medium ${selectedTag === tag ? "text-white font-bold" : "text-[#666]"}`}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Banner Promocional Carrusel */}
          <View className="h-44 rounded-2xl mb-6 overflow-hidden justify-center bg-[#15803D] relative">
            <FlatList
              ref={bannerRef}
              data={banners}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              keyExtractor={(item) => item.id}
              getItemLayout={(_, index) => ({ length: BANNER_WIDTH, offset: BANNER_WIDTH * index, index })}
              renderItem={({ item }) => (
                <View style={{ width: BANNER_WIDTH }} className="h-44 relative justify-center">
                  <Image
                    source={item.image}
                    style={{ position: "absolute", right: 0, top: 0, width: "75%", height: "100%" }}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={["#15803D", "rgba(21, 128, 61, 0.8)", "transparent"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="absolute left-0 top-0 bottom-0 w-[85%] z-10"
                  />
                  <View className="p-5 w-[58%] z-20">
                    <Text className="text-white text-lg font-bold leading-5">{item.title}</Text>
                    <Text className="text-[#f0f0f0] text-xs my-1.5">{item.subtitle}</Text>
                    <TouchableOpacity className="bg-white px-4 py-2 rounded-full self-start mt-1.5" activeOpacity={0.8}>
                      <Text className="text-[#316b33] text-xs font-bold">{item.buttonText}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <View className="absolute bottom-2.5 self-center flex-row gap-1.5 z-30">
              {banners.map((_, index) => (
                <View
                  key={index}
                  className={`h-2 rounded-full ${activeBannerIndex === index ? "w-5 bg-white" : "w-2 bg-white/50"}`}
                />
              ))}
            </View>
          </View>

          {/* Sección Categorías */}
          <View className="flex-row justify-between items-center mb-4 mt-2">
            <Text className="text-lg font-bold text-[#0F172A]">Categorías</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Tienda")}>
              <Text className="text-xs text-[#15803D] font-semibold">Ver todo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 18, paddingBottom: 15 }}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} className="items-center" style={{ width: 70 }} onPress={() => navigation.navigate("Tienda")}>
                <View className={`rounded-full items-center justify-center mb-1.5 ${cat.bgColor}`} style={{ width: 60, height: 60 }}>
                  <Image source={cat.icon} style={{ width: 35, height: 35 }} resizeMode="contain" />
                </View>
                <Text className="text-xs font-medium text-[#333] text-center">{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Sección de Productos Destacados Locales */}
          <View className="flex-row justify-between items-center mb-3 mt-4">
            <Text className="text-lg font-bold text-[#0F172A]">Productos Destacados</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Tienda")}>
              <Text className="text-xs text-[#15803D] font-semibold">Ver todo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingBottom: 15 }}
          >
            {localProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0]"
                style={{ width: 160 }}
                onPress={() => handleAddToCart(product)}
              >
                <View className="bg-[#15803D]/10 items-center justify-center" style={{ height: 110 }}>
                  <ShoppingBag size={32} color="#15803D" />
                </View>
                <View className="p-3">
                  <Text className="text-sm font-bold text-[#333]" numberOfLines={1}>
                    {product.title}
                  </Text>
                  <Text className="text-xs text-[#15803D] font-bold mt-1">
                    {product.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Sección Ofertas para ti */}
          <View className="flex-row justify-between items-center mb-4 mt-2">
            <Text className="text-lg font-bold text-[#0F172A]">Ofertas para ti</Text>
            <TouchableOpacity><Text className="text-xs text-[#15803D] font-semibold">Ver todo</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 14, paddingBottom: 15 }}>
            {deals.map((deal) => (
              <View key={deal.id} className="w-52 bg-white rounded-2xl overflow-hidden shadow-sm">
                <Image source={deal.image} style={{ width: "100%", height: 96 }} resizeMode="cover" />
                <View className="p-2.5">
                  <Text className="text-sm font-bold text-[#333]">{deal.title}</Text>
                  <Text className="text-xs text-[#666] my-0.5">{deal.subtitle}</Text>
                  <View className="bg-[#E8F5E9] px-1.5 py-0.5 rounded-md self-start mt-1">
                    <Text className="text-[10px] text-[#2e7d32] font-bold">⚡ {deal.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Sección Tiendas Cercanas */}
          <View className="flex-row justify-between items-center mb-4 mt-2">
            <View className="flex-row items-center gap-1.5">
              <Flame size={18} color="#15803D" />
              <Text className="text-lg font-bold text-[#0F172A]">Tiendas Saludables Cerca</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Tienda")}>
              <Text className="text-xs text-[#15803D] font-semibold">Ver todo</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-4 pb-6">
            {storesNearYou.map((store) => (
              <TouchableOpacity
                key={store.id}
                className="bg-white rounded-2xl p-3 shadow-sm"
                activeOpacity={0.9}
                onPress={() => navigation.navigate("Tienda")}
              >
                <View className={`w-full rounded-xl items-center justify-center mb-2.5 relative ${store.bgAccent}`} style={{ height: 128 }}>
                  <Image source={store.image} style={{ width: "70%", height: "70%" }} resizeMode="contain" />
                  {store.discount && (
                    <View className="absolute top-2.5 left-2.5 bg-[#0F172A] px-2 py-0.5 rounded-lg">
                      <Text className="text-white text-[10px] font-bold">{store.discount}</Text>
                    </View>
                  )}
                </View>

                <View className="flex-row justify-between items-center mb-2">
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-[#0F172A]" numberOfLines={1}>{store.name}</Text>
                    <Text className="text-xs text-[#64748B] mt-0.5" numberOfLines={1}>{store.category}</Text>
                  </View>
                  <View className="flex-row items-center gap-1 bg-[#FEF3C7] px-1.5 py-0.5 rounded-md">
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <Text className="text-xs font-bold text-[#D97706]">{store.rating}</Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center border-t border-[#F1F5F9] pt-2">
                  <Text className="text-xs text-[#64748B] font-semibold">🕒 {store.time}</Text>
                  <TouchableOpacity
                    className="bg-[#15803D] w-7 h-7 rounded-full items-center justify-center"
                    onPress={() => handleAddToCart(store)}
                  >
                    <Plus size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}