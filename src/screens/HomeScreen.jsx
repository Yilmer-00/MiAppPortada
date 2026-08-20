import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TextInput, FlatList, TouchableOpacity, Image,
} from "react-native";
import { Search } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import TopHeader from "../components/TopHeader";
import Footer from "../components/Footer";

export default function HomeScreen() {
  const [selectedTag, setSelectedTag] = useState("Todos");

  const tags = ["Todos", "Orgánico", "Keto", "Vegano", "Sin Gluten"];

  const banners = [
    {
      id: "1",
      title: "50% OFF\nEn Tu Vida Saludable",
      subtitle: "Aprovecha hoy nuestros descuentos",
      buttonText: "Comprar Ahora",
      image: require("../../assets/Saludable.png"),
    },
    {
      id: "2",
      title: "Nuevas Proteínas\n100% Orgánicas",
      subtitle: "Envíos gratis por compras mayores a $100k",
      buttonText: "Ver Catálogo",
      image: require("../../assets/Saludable.png"), // Cambia por otra imagen
    },
  ];
  const categories = [
    {
      id: "1",
      name: "Proteínas",
      icon: require("../../assets/icons/proteina.png"),
      screen: "ProteinasScreen", // Ruta para navegación
      bgColor: "#E8F5E9",         // Color personalizado para el icono
      badge: "Populares",
    },
    {
      id: "2",
      name: "Vitaminas",
      icon: require("../../assets/icons/vitaminas.png"),
      screen: "VitaminasScreen",
      bgColor: "#FFF3E0",
    },
    {
      id: "3",
      name: "Snacks",
      icon: require("../../assets/icons/snacks.png"),
    },
    {
      id: "4",
      name: "Bebidas",
      icon: require("../../assets/icons/bebidas.png"),
    },
    {
      id: "5",
      name: "hfdga",
      icon: require("../../assets/icons/bebidas.png"),
    },
    {
      id: "7",
      name: "asdwsa",
      icon: require("../../assets/icons/bebidas.png"),
    },
    {
      id: "8",
      name: "asedsa",
      icon: require("../../assets/icons/bebidas.png"),
    },
    {
      id: "9",
      name: "asdrsa",
      icon: require("../../assets/icons/bebidas.png"),
    },


  ];

  const bestSellers = [
    {
      id: "1",
      title: "Proteína Vegan Whey",
      brand: "Nutrik Organic",
      price: "$120.000",
      discount: "-20%",
      image: require("../../assets/proteina.png"),
    },
    {
      id: "2",
      title: "Multivitamínico B12",
      brand: "Vida Saludable",
      price: "$45.000",
      discount: "-15%",
      image: require("../../assets/vitaminB2.png"),
    },
    {
      id: "3",
      title: "Multivitamínico B212",
      brand: "Vida Saludable",
      price: "$45.000",
      discount: "-15%",
      image: require("../../assets/vitaminB2.png"),
    },
    {
      id: "4",
      title: "Multivitamínico B212",
      brand: "Vida Saludable",
      price: "$45.000",
      discount: "-15%",
      image: require("../../assets/vitaminB2.png"),
    },
    {
      id: "5",
      title: "Multivitamínico B212",
      brand: "Vida Saludable",
      price: "$45.000",
      discount: "-15%",
      image: require("../../assets/vitaminB2.png"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Encabezado Superior con perfil desplegable */}
      <TopHeader title="Nutrik" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Contenido con sangría horizontal */}
        <View style={styles.body}>
          {/* Barra de Búsqueda */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔎</Text>
            <TextInput
              placeholder="Buscar productos, suplementos..."
              placeholderTextColor="#888"
              style={styles.searchInput}
            />

          </View>

          {/* Chips / Filtros Horizontales */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsContainer}
          >
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagChip,
                  selectedTag === tag && styles.tagChipActive,
                ]}
                onPress={() => setSelectedTag(tag)}
              >
                <Text
                  style={[
                    styles.tagText,
                    selectedTag === tag && styles.tagTextActive,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Banner Promocional con estilo Nutrik */}
          {/* Banner Promocional con Imagen de Fondo */}
          <View style={styles.bannerContainer}>

            <Image
              source={require("../../assets/Saludable.png")}
              style={styles.bannerImage}
            />
            <LinearGradient
              colors={[
                "#398B36",
                "rgba(57,139,54,0.8)",
                "rgba(57,139,54,0)"
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.bannerGradient}
            />

            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>
                50% OFF{"\n"}En Tu Vida Saludable
              </Text>

              <Text style={styles.bannerSubtitle}>
                Aprovecha hoy nuestros descuentos
              </Text>

              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>
                  Comprar Ahora
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* Sección Categorías */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate(cat.screen)} // <-- Agregas navegación
              >
                <View style={[styles.categoryIconCircle, { backgroundColor: cat.bgColor || '#F5F5F5' }]}>
                  <Image source={cat.icon} style={styles.categoryIconImage} />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Sección Más Vendidos */}
          {/* Sección Más Vendidos */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Más Vendidos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={bestSellers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.bestSellersCarousel}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                {item.discount && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{item.discount}</Text>
                  </View>
                )}

                <TouchableOpacity style={styles.favoriteButton}>
                  <Text style={{ fontSize: 14 }}>❤️</Text>
                </TouchableOpacity>

                <View style={styles.productImageContainer}>
                  <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            )}
          />
        </View>
        {/* Footer adaptado a borde inferior completo */}
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f2f0",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 46,
    marginBottom: 15,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  cameraButton: {
    padding: 5,
  },
  tagsContainer: {
    gap: 10,
    paddingBottom: 15,
  },
  tagChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  tagChipActive: {
    backgroundColor: "#4CAF50",
  },
  tagText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  tagTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  bannerContainer: {
    height: 170,
    borderRadius: 20,
    marginBottom: 25,
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: "#4c924ac2",
  },
  bannerGradient: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "70%",
  },
  bannerImage: {
    position: "absolute",
    right: -20,
    top: 0,
    width: "65%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerImageStyle: {
    borderRadius: 20,
    resizeMode: "cover",
  },
  bannerContent: {
    padding: 20,
    width: "58%",
    zIndex: 2,
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 22,
  },
  bannerSubtitle: {
    color: "#f0f0f0",
    fontSize: 12,
    marginVertical: 6,
  },
  bannerButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  bannerButtonText: {
    color: "#2e7d32",
    fontSize: 12,
    fontWeight: "bold",
  },
  bannerImageArea: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b5e20",
  },
  seeAllText: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "600",
  },
  categoriesContainer: {
    gap: 18,
    paddingBottom: 25,
  },
  carouselContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  categoryCard: {
    alignItems: "center",
    width: 70,
  },
  categoryIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e8f5e9", // Fondo suave verde claro
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  categoryIconImage: {
    width: 35, // Ajusta según el tamaño que prefieras
    height: 35,
    resizeMode: "contain", // Mantiene la proporción de la imagen sin deformarla
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  bestSellersGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },
  bestSellersCarousel: {
    paddingHorizontal: 16,
    gap: 14, // Espacio entre cada tarjeta de producto
  },
  productCard: {
    width: 160, // Ancho fijo obligatorio para carruseles horizontales
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    // Sombra para dar elevación
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  badgeContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    zIndex: 1,
  },
  badgeText: {
    color: "#2e7d32",
    fontSize: 10,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  productImage: {
    width: "80%",
    height: "80%",
  },
  productImageContainer: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  productBrand: {
    fontSize: 11,
    color: "#888",
  },
  productTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2e7d32",
  },
});