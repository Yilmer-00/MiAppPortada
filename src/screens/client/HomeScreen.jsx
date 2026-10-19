import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search,  Star, Flame, Plus } from "lucide-react-native";
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
        bannerRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
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
    { id: "1", name: "Proteínas", icon: require("../../../assets/icons/proteina.png"), screen: "ProteinasScreen", bgColor: "#E8F5E9" },
    { id: "2", name: "Vitaminas", icon: require("../../../assets/icons/vitaminas.png"), screen: "VitaminasScreen", bgColor: "#FFF3E0" },
    { id: "3", name: "Snacks", icon: require("../../../assets/icons/snacks.png"), screen: "SnacksScreen", bgColor: "#c4f783" },
    { id: "4", name: "Bebidas", icon: require("../../../assets/icons/bebidas.png"), screen: "BebidasScreen", bgColor: "#99eff1" },
    { id: "5", name: "Creatinas", icon: require("../../../assets/icons/creatina.png"), screen: "CreatinasScreen", bgColor: "#ffaf53" },
    { id: "6", name: "Superfoods", icon: require("../../../assets/icons/superfoods.png"), screen: "SuperfoodsScreen", bgColor: "#ffe570" },
  ];

  // Ampliado con más de dos ofertas para ti
  const deals = [
    {
      id: "1",
      title: "Combo Keto Saludable",
      subtitle: "30% OFF en toda la categoría",
      time: "Envío Gratis",
      image: require("../../../assets/Saludable.png"),
    },
    {
      id: "2",
      title: "Kit de Vitaminas D3",
      subtitle: "Ahorra comprando el dúo",
      time: "20 min o menos",
      image: require("../../../assets/bannerdos.png"),
    },
    {
      id: "3",
      title: "Pack Proteína Whey",
      subtitle: "Incluye shaker de regalo",
      time: "Envío Gratis",
      image: require("../../../assets/proteina.png"),
    },
    {
      id: "4",
      title: "Snacks Energéticos",
      subtitle: "2x1 en barras seleccionadas",
      time: "15 min o menos",
      image: require("../../../assets/Questbar.png"),
    },
  ];

  const storesNearYou = [
    {
      id: "1",
      name: "Nutrik Organic Store",
      category: "Orgánico • Saludable",
      rating: "4.8",
      time: "15-20 min",
      discount: "15% OFF",
      image: require("../../../assets/proteina.png"),
      bgAccent: "#E8F5E9",
    },
    {
      id: "2",
      name: "Vida Natural Express",
      category: "Suplementos • Vitaminas",
      rating: "4.9",
      time: "10-15 min",
      discount: "20% OFF",
      image: require("../../../assets/barra.png"),
      bgAccent: "#FFF3E0",
    },
  ];

  const handleAddToCart = (product) => {
    navigation.navigate("Carrito", {
      productoAgregar: {
        id: product.id,
        title: product.name || product.title,
        brand: product.category || product.brand,
        price: product.price || "$28.000",
        numericPrice: product.numericPrice || 28000,
        weight: "1 un",
        bgAccent: product.bgAccent || "#F8FAFC",
        quantity: 1,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TopHeader title="Nutrik" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          {/* Barra de Búsqueda */}
          <View style={styles.searchContainer}>
            <Search size={18} color="#888" style={styles.searchIcon} />
            <TextInput
              placeholder="Buscar productos, marcas, suplementos..."
              placeholderTextColor="#888"
              style={styles.searchInput}
            />
          </View>

          {/* Chips / Filtros Horizontales */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsContainer}>
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[styles.tagChip, selectedTag === tag && styles.tagChipActive]}
                onPress={() => setSelectedTag(tag)}
              >
                <Text style={[styles.tagText, selectedTag === tag && styles.tagTextActive]}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Banner Promocional Carrusel */}
          <View style={styles.bannerContainer}>
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
                <View style={[styles.bannerCard, { width: BANNER_WIDTH }]}>
                  <Image source={item.image} style={styles.bannerImage} />
                  <LinearGradient
                    colors={["#15803D", "rgba(21, 128, 61, 0.8)", "transparent"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.bannerGradient}
                  />
                  <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                    <TouchableOpacity style={styles.bannerButton} activeOpacity={0.8}>
                      <Text style={styles.bannerButtonText}>{item.buttonText}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <View style={styles.paginationContainer}>
              {banners.map((_, index) => (
                <View
                  key={index}
                  style={[styles.dot, activeBannerIndex === index ? styles.activeDot : styles.inactiveDot]}
                />
              ))}
            </View>
          </View>

          {/* Sección Categorías */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Tienda")}>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate("Tienda")}
              >
                <View style={[styles.categoryIconCircle, { backgroundColor: cat.bgColor || '#F5F5F5' }]}>
                  <Image source={cat.icon} style={styles.categoryIconImage} />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Sección Ofertas para ti ("Deals for you") con más de dos elementos */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ofertas para ti</Text>
            <TouchableOpacity><Text style={styles.seeAllText}>Ver todo</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsContainer}>
            {deals.map((deal) => (
              <View key={deal.id} style={styles.dealCard}>
                <Image source={deal.image} style={styles.dealImage} />
                <View style={styles.dealContent}>
                  <Text style={styles.dealTitle}>{deal.title}</Text>
                  <Text style={styles.dealSubtitle}>{deal.subtitle}</Text>
                  <View style={styles.dealBadge}>
                    <Text style={styles.dealBadgeText}>⚡ {deal.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Sección Tiendas / Marcas Cercanas */}
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Flame size={18} color="#15803D" />
              <Text style={styles.sectionTitle}>Tiendas Saludables Cerca</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Tienda")}>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.storesContainer}>
            {storesNearYou.map((store) => (
              <TouchableOpacity
                key={store.id}
                style={styles.storeCard}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("Tienda")}
              >
                <View style={[styles.storeImageWrapper, { backgroundColor: store.bgAccent }]}>
                  <Image source={store.image} style={styles.storeImage} resizeMode="contain" />
                  {store.discount && (
                    <View style={styles.storeDiscountBadge}>
                      <Text style={styles.storeDiscountText}>{store.discount}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.storeInfoRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.storeName} numberOfLines={1}>{store.name}</Text>
                    <Text style={styles.storeCategory} numberOfLines={1}>{store.category}</Text>
                  </View>
                  <View style={styles.ratingBox}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{store.rating}</Text>
                  </View>
                </View>

                <View style={styles.storeFooterRow}>
                  <Text style={styles.storeTime}>🕒 {store.time}</Text>
                  <TouchableOpacity
                    style={styles.storeAddBtn}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  body: { paddingHorizontal: 16, paddingTop: 15 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f2f0",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 46,
    marginBottom: 15,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 14, color: "#333" },
  tagsContainer: { gap: 10, paddingBottom: 15 },
  tagChip: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: "#f0f0f0" },
  tagChipActive: { backgroundColor: "#15803D" },
  tagText: { fontSize: 13, fontWeight: "500", color: "#666" },
  tagTextActive: { color: "#fff", fontWeight: "bold" },
  bannerContainer: { height: 170, borderRadius: 20, marginBottom: 25, overflow: "hidden", justifyContent: "center", backgroundColor: "#15803D" },
  bannerCard: { height: 170, position: 'relative', justifyContent: 'center' },
  paginationContainer: { position: 'absolute', bottom: 10, alignSelf: 'center', flexDirection: 'row', gap: 6, zIndex: 3 },
  dot: { height: 8, borderRadius: 4 },
  activeDot: { width: 18, backgroundColor: '#FFFFFF' },
  inactiveDot: { width: 8, backgroundColor: 'rgba(255, 255, 255, 0.5)' },
  bannerGradient: { position: "absolute", left: 0, top: 0, bottom: 0, width: "85%", zIndex: 1 },
  bannerImage: { position: "absolute", right: -20, top: 0, width: "75%", height: "100%", resizeMode: "cover" },
  bannerContent: { padding: 20, width: "58%", zIndex: 2 },
  bannerTitle: { color: "#ffffff", fontSize: 18, fontWeight: "bold", lineHeight: 22 },
  bannerSubtitle: { color: "#f0f0f0", fontSize: 12, marginVertical: 6 },
  bannerButton: { backgroundColor: "#ffffff", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, alignSelf: "flex-start", marginTop: 6 },
  bannerButtonText: { color: "#316b33", fontSize: 12, fontWeight: "bold" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#0F172A" },
  seeAllText: { fontSize: 13, color: "#15803D", fontWeight: "600" },
  categoriesContainer: { gap: 18, paddingBottom: 15 },
  categoryCard: { alignItems: "center", width: 70 },
  categoryIconCircle: { width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  categoryIconImage: { width: 35, height: 35, resizeMode: "contain" },
  categoryName: { fontSize: 12, fontWeight: "500", color: "#333", textAlign: "center" },
  dealsContainer: { gap: 14, paddingBottom: 15 },
  dealCard: { width: 220, backgroundColor: "#FFF", borderRadius: 14, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  dealImage: { width: "100%", height: 100, resizeMode: "cover" },
  dealContent: { padding: 10 },
  dealTitle: { fontSize: 14, fontWeight: "bold", color: "#333" },
  dealSubtitle: { fontSize: 11, color: "#666", marginVertical: 2 },
  dealBadge: { backgroundColor: "#E8F5E9", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, alignSelf: "flex-start", marginTop: 4 },
  dealBadgeText: { fontSize: 10, color: "#2e7d32", fontWeight: "bold" },
  storesContainer: { gap: 16, paddingBottom: 25 },
  storeCard: { backgroundColor: "#FFF", borderRadius: 16, padding: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  storeImageWrapper: { width: "100%", height: 130, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 10, position: "relative" },
  storeImage: { width: "70%", height: "70%" },
  storeDiscountBadge: { position: "absolute", top: 10, left: 10, backgroundColor: "#0F172A", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  storeDiscountText: { color: "#FFF", fontSize: 10, fontWeight: "bold" },
  storeInfoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  storeName: { fontSize: 15, fontWeight: "bold", color: "#0F172A" },
  storeCategory: { fontSize: 11, color: "#64748B", marginTop: 2 },
  ratingBox: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#FEF3C7", paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  ratingText: { fontSize: 11, fontWeight: "bold", color: "#D97706" },
  storeFooterRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: "#F1F5F9", paddingTop: 8 },
  storeTime: { fontSize: 12, color: "#64748B", fontWeight: "600" },
  storeAddBtn: { backgroundColor: "#15803D", width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
});