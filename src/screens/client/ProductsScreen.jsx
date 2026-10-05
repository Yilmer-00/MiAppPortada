import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Plus,
  Grid,
  ChevronLeft,
  Bell,
  ShoppingBag,
} from "lucide-react-native";

// Categorías según la UI de las imágenes
const categories = [
  { id: "all", name: "All", icon: "grid" },
  { id: "peanut", name: "Maní", icon: "🥜" },
  { id: "protein", name: "Proteína", icon: "🍫" },
  { id: "tea", name: "Té & Matcha", icon: "🍵" },
  { id: "creatine", name: "Suplementos", icon: "⚡" },
];

const productsData = [
  {
    id: "1",
    category: "peanut",
    title: "Mantequilla de Maní Crunchy",
    brand: "NUTRIK NATURAL",
    description: "Crema de maní 100% natural libre de azúcares añadidos.",
    oldPrice: "$31.111",
    price: "$28.000",
    numericPrice: 28000,
    weight: "500g",
    discount: "-10%",
    rating: "4.8",
    calories: "190 Cal",
    image: require("../../../assets/mantequilla.png"),
    badge: "NUEVO",
    bgAccent: "#FEF3C7",
  },
  {
    id: "2",
    category: "protein",
    title: "Barra de Proteína Cacao",
    brand: "FITBAR ORGANIC",
    description: "Barra energética con 20g de proteína de suero aislada.",
    oldPrice: "$13.333",
    price: "$12.000",
    numericPrice: 12000,
    weight: "60g",
    discount: "-15%",
    rating: "4.9",
    calories: "210 Cal",
    image: require("../../../assets/barra.png"),
    badge: "NUEVO",
    bgAccent: "#FFEDD5",
  },
  {
    id: "3",
    category: "tea",
    title: "Matcha Orgánico en Polvo",
    brand: "GREEN TEA CO",
    description: "Matcha grado ceremonial 100% orgánico importado.",
    oldPrice: "$58.000",
    price: "$52.000",
    numericPrice: 52000,
    weight: "100g",
    discount: "-12%",
    rating: "4.7",
    calories: "15 Cal",
    image: require("../../../assets/matcha.png"),
    badge: "NUEVO",
    bgAccent: "#DCFCE7",
  },
  {
    id: "4",
    category: "creatine",
    title: "Creatina Monohidratada",
    brand: "NUTRIK PURE",
    description: "Creatina 100% pura en polvo de alta absorción.",
    oldPrice: "$95.000",
    price: "$85.000",
    numericPrice: 85000,
    weight: "300g",
    discount: "-20%",
    rating: "5.0",
    calories: "0 Cal",
    image: require("../../../assets/proteina.png"),
    badge: "NUEVO",
    bgAccent: "#E0F2FE",
  },
];

export default function ProductsScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filtrado dinámico únicamente por categoría
  const filteredProducts = productsData.filter((product) => {
    return selectedCategory === "all" || product.category === selectedCategory;
  });

  // Ir a la pantalla de detalle (Imagen 3)
  const handleOpenDetail = (product) => {
    navigation.navigate("ProductDetail", { product });
  };

  // Enviar directamente al Carrito
  const handleAddToCart = (product) => {
    navigation.navigate("Carrito", {
      productoAgregar: {
        id: product.id,
        title: product.title,
        brand: product.brand,
        price: product.price,
        numericPrice: product.numericPrice,
        weight: product.weight,
        image: product.image,
        bgAccent: product.bgAccent,
      },
    });
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => handleOpenDetail(item)}
    >
      {/* Imagen Principal */}
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      </View>

      {/* Badge de Descuento */}
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}

      {/* Título y Marca */}
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.cardSubtitle} numberOfLines={1}>
        {item.brand} • {item.weight}
      </Text>

      {/* Precio y Botón (+) */}
      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>{item.price}</Text>

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => handleAddToCart(item)}
          activeOpacity={0.8}
        >
          <Plus size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Catálogo</Text>
          <Text style={styles.locationTitle}>Nutrik Store ✦</Text>
        </View>

        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Bell size={18} color="#0F172A" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => navigation.navigate("Carrito")}
          >
            <ShoppingBag size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Título Principal */}
      <View style={styles.heroTextContainer}>
        <Text style={styles.heroTitle}>
          ¿Buscando algo <Text style={styles.heroBold}>Saludable?</Text>
        </Text>
      </View>

      {/* Selector Horizontal de Categorías */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryItem,
                  isSelected && styles.categoryItemSelected,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.categoryIconCircle,
                    isSelected && styles.categoryIconCircleSelected,
                  ]}
                >
                  {cat.icon === "grid" ? (
                    <Grid size={18} color={isSelected ? "#FFFFFF" : "#0F172A"} />
                  ) : (
                    <Text style={styles.categoryEmoji}>{cat.icon}</Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                  ]}
                >
                  {cat.name}
                </Text>
                {isSelected && <View style={styles.activeDot} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Grilla de Productos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.productListContent}
        renderItem={renderProductCard}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No hay productos disponibles en esta categoría.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  locationContainer: {
    alignItems: "center",
  },
  locationLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  headerRightIcons: {
    flexDirection: "row",
    gap: 8,
  },
  heroTextContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "#64748B",
  },
  heroBold: {
    fontWeight: "900",
    color: "#0F172A",
  },
  categoriesWrapper: {
    marginVertical: 12,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryItem: {
    alignItems: "center",
    width: 64,
  },
  categoryIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  categoryIconCircleSelected: {
    backgroundColor: "#0F172A",
  },
  categoryEmoji: {
    fontSize: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  categoryTextSelected: {
    color: "#0F172A",
    fontWeight: "800",
  },
  activeDot: {
    width: 16,
    height: 3,
    backgroundColor: "#0F172A",
    borderRadius: 2,
    marginTop: 4,
  },
  productListContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 12,
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F8FAFC",
  },
  imageWrapper: {
    width: "100%",
    height: 125,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  productImage: {
    width: "90%",
    height: "90%",
  },
  discountBadge: {
    position: "absolute",
    top: 14,
    backgroundColor: "#0F172A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginTop: 4,
    width: "100%",
  },
  cardSubtitle: {
    fontSize: 10,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 4,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "900",
    color: "#0F172A",
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 13,
  },
});