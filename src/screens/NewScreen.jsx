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
import { ArrowLeft, Star, Heart, Plus, CheckCircle2 } from "lucide-react-native";

const { width } = Dimensions.get("window");

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
    navigation.navigate("Tienda", {
      screen: "ProductDetail",
      params: {
        producto: {
          id: product.id,
          nombre: product.title,
          precio: Number(product.price.replace(/[^0-9]/g, "")),
          imagen: product.image,
            descuento: 10,
            marca: product.brand,
          descripcion: `${product.title} de ${product.brand}, recién llegado a nuestra tienda.`,
        },
      },
    });
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

              {/* PRECIO */}
              <View style={styles.bottomRow}>
                <View>
                  <Text style={styles.priceLabel}>Precio</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>

                {/* AGREGAR */}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAdd(item)}
                  activeOpacity={0.8}
                >
                  <Plus size={19} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9F7",
  },
  header: {
    height: 70,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDE8",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F7F1",
  },
  headerCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1B5E20",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#777777",
    marginTop: 2,
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 35,
  },
  introContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  introIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  introTextContainer: {
    flex: 1,
  },
  introTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1B5E20",
    marginBottom: 3,
  },
  introText: {
    fontSize: 12,
    color: "#55705A",
    lineHeight: 17,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#222222",
  },
  productCount: {
    fontSize: 12,
    color: "#777777",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: (width - 44) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E9EDE9",
    position: "relative",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  tagBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#2E7D32",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 2,
  },
  tagBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  favoriteButton: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  imageContainer: {
    height: 125,
    marginTop: 15,
    marginBottom: 8,
    backgroundColor: "#F8FAF8",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "88%",
    height: "88%",
  },
  productBrand: {
    fontSize: 10,
    color: "#888888",
    marginTop: 2,
    marginBottom: 3,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2D2D2D",
    lineHeight: 17,
    minHeight: 34,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 10,
  },
  priceLabel: {
    fontSize: 9,
    color: "#999999",
    marginBottom: 1,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2E7D32",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  bottomMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 15,
  },
  bottomMessageText: {
    fontSize: 12,
    color: "#777777",
    marginLeft: 7,
  },
});