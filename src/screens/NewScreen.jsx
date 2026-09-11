import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Star, Heart, CheckCircle2 } from "lucide-react-native";

const { width } = Dimensions.get("window");

// Productos nuevos
const newProducts = [
  {
    id: "1",
    title: "Mantequilla de Maní Crunchy",
    brand: "Nutrik Natural",
    price: "$28.000",
    image: require("../../assets/mantequilla.png"),
  },
  {
    id: "2",
    title: "Barra de Proteína Cacao",
    brand: "FitBar Organic",
    price: "$12.000",
    image: require("../../assets/barra.png"),
  },
  {
    id: "3",
    title: "Matcha Orgánico en Polvo",
    brand: "Green Tea Co",
    price: "$52.000",
    image: require("../../assets/matcha.png"),
  },
  {
    id: "4",
    title: "Creatina Monohidratada",
    brand: "Nutrik Pure",
    price: "$85.000",
    image: require("../../assets/icons/creatina.png"),
  },
  {
    id: "5",
    title: "Aceite de Coco Extra Virgen",
    brand: "BioVida",
    price: "$34.000",
    image: require("../../assets/coco.png"),
  },
  {
    id: "6",
    title: "Granola de Frutos Secos",
    brand: "Nutrik Natural",
    price: "$22.000",
    image: require("../../assets/secos.png"),
  },
];

export default function NewScreen() {
  const navigation = useNavigation();

  const handleFavorite = (product) => {
    console.log("Favorito:", product.title);
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
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* ENCABEZADO */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={23} color="#1B5E20" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Lo Nuevo</Text>
          <Text style={styles.headerSubtitle}>Productos recién llegados</Text>
        </View>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* CONTENIDO */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* PRESENTACIÓN */}
        <View style={styles.introContainer}>
          <View style={styles.introIcon}>
            <Star size={22} color="#FFFFFF" />
          </View>

          <View style={styles.introTextContainer}>
            <Text style={styles.introTitle}>Descubre lo nuevo</Text>
            <Text style={styles.introText}>
              Conoce nuestros últimos productos y novedades saludables.
            </Text>
          </View>
        </View>

        {/* TÍTULO */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nuevos productos</Text>
          <Text style={styles.productCount}>
            {newProducts.length} productos
          </Text>
        </View>

        {/* GRID */}
        <View style={styles.gridContainer}>
          {newProducts.map((item) => (
            <View key={item.id} style={styles.productCard}>
              {/* BADGE */}
              <View style={styles.tagBadge}>
                <Text style={styles.tagBadgeText}>NUEVO</Text>
              </View>

              {/* FAVORITO */}
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => handleFavorite(item)}
                activeOpacity={0.7}
              >
                <Heart size={17} color="#E53935" />
              </TouchableOpacity>

              {/* IMAGEN */}
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>

              {/* MARCA */}
              <Text style={styles.productBrand} numberOfLines={1}>
                {item.brand}
              </Text>

              {/* NOMBRE */}
              <Text style={styles.productTitle} numberOfLines={2}>
                {item.title}
              </Text>

              {/* PRECIO */}
              <View style={styles.priceBlock}>
                <Text style={styles.oldPrice}>${Math.round(Number(item.price.replace(/[^0-9]/g, "")) / 0.9).toLocaleString("es-CO")}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => handleAdd(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.detailButtonText}>Ver más →</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* FINAL */}
        <View style={styles.bottomMessage}>
          <CheckCircle2 size={18} color="#4CAF50" />
          <Text style={styles.bottomMessageText}>
            Más productos llegarán próximamente
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9F7" },
  header: { height: 70, backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#E8EDE8", elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#F0F7F1" },
  headerCenter: { alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 19, fontWeight: "800", color: "#1B5E20" },
  headerSubtitle: { fontSize: 11, color: "#777777", marginTop: 2 },
  headerPlaceholder: { width: 40 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 35 },
  introContainer: { backgroundColor: "#E8F5E9", borderRadius: 18, padding: 15, flexDirection: "row", alignItems: "center", marginBottom: 22 },
  introIcon: { width: 45, height: 45, borderRadius: 23, backgroundColor: "#2E7D32", alignItems: "center", justifyContent: "center", marginRight: 12 },
  introTextContainer: { flex: 1 },
  introTitle: { fontSize: 16, fontWeight: "800", color: "#1B5E20", marginBottom: 3 },
  introText: { fontSize: 12, color: "#55705A", lineHeight: 17 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#222222" },
  productCount: { fontSize: 12, color: "#777777" },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  productCard: { width: (width - 44) / 2, backgroundColor: "#FFFFFF", borderRadius: 10, padding: 10, marginBottom: 14, borderWidth: 1, borderColor: "#E5E8E5", position: "relative", elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  tagBadge: { position: "absolute", top: 9, left: 9, backgroundColor: "#080B09", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 3, zIndex: 2 },
  tagBadgeText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800" },
  favoriteButton: { position: "absolute", top: 9, right: 9, width: 27, height: 27, borderRadius: 14, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", zIndex: 2 },
  imageContainer: { height: 125, marginTop: 15, marginBottom: 8, backgroundColor: "#FBFBFB", alignItems: "center", justifyContent: "center" },
  productImage: { width: "88%", height: "88%" },
  productBrand: { fontSize: 9, color: "#777777", marginTop: 2, marginBottom: 3, textTransform: "uppercase", letterSpacing: 1 },
  productTitle: { fontSize: 13, fontWeight: "700", color: "#2D2D2D", lineHeight: 17, minHeight: 34 },
  priceBlock: { marginTop: 10, marginBottom: 10 },
  oldPrice: { fontSize: 9, color: "#999999", textDecorationLine: "line-through", marginBottom: 1 },
  productPrice: { fontSize: 15, fontWeight: "800", color: "#145C35" },
  detailButton: { height: 34, borderRadius: 18, backgroundColor: "#145C35", alignItems: "center", justifyContent: "center" },
  detailButtonText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  bottomMessage: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10, paddingVertical: 15 },
  bottomMessageText: { fontSize: 12, color: "#777777", marginLeft: 7 },
});
