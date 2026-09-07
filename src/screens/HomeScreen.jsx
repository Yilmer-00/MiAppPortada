import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import { Search } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import TopHeader from "../components/TopHeader";
import Footer from "../components/Footer";

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;
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
    image: require("../../assets/bannerdos.png"),
  },
  {
    id: "3",
    title: "Ofertas Especiales\nen Multivitamínicos",
    subtitle: "Fortalece tu salud este mes",
    buttonText: "Descubrir",
    image: require("../../assets/bannertres.png"),
  },
];
export default function HomeScreen() {
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
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(timer);
  }, []);
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / BANNER_WIDTH);
    setActiveBannerIndex(index);
  };
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
      screen: "SnacksScreen",
      bgColor: "#c4f783",
    },
    {
      id: "4",
      name: "Bebidas",
      icon: require("../../assets/icons/bebidas.png"),
      screen: "BebidasScreen",
      bgColor: "#99eff1",
    },
    {
      id: "5",
      name: "Creatinas",
      icon: require("../../assets/icons/creatina.png"),
      screen: "CreatinasScreen",
      bgColor: "#ffaf53",
    },
    {
      id: "7",
      name: "Superfoods",
      icon: require("../../assets/icons/superfoods.png"),
      screen: "SuperfoodsScreen",
      bgColor: "#ffe570",
    },
    {
      id: "8",
      name: "Frutas",
      icon: require("../../assets/icons/frutas.png"),
      screen: "FrutasScreen",
      bgColor: "#58fc7c",
    },
    {
      id: "9",
      name: "Accesorios",
      icon: require("../../assets/icons/accesorios.png"),
      screen: "AccesoriosScreen",
      bgColor: "#acaba9",
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
      image: require("../../assets/proteina.png"),
    },
    {
      id: "3",
      title: "Barra Energética Quest",
      brand: "Vida Saludable",
      price: "$45.000",
      discount: "-15%",
      image: require("../../assets/Questbar.png"),
    },
    {
      id: "4",
      title: "Mantequilla Nutrelle",
      brand: "Vida Saludable",
      price: "$45.000",
      discount: "-15%",
      image: require("../../assets/mantequillaNutrelle.png"),
    },
    {
      id: "5",
      title: "Electrolit",
      brand: "Vida Saludable",
      price: "$45.000",
      discount: "-15%",
      image: require("../../assets/electrolit.png"),
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
          {/* Banner Promocional con Carrusel y Punticos */}
          <View style={styles.bannerContainer}>
            <FlatList
              ref={bannerRef}
              data={banners}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              keyExtractor={(item) => item.id}
              getItemLayout={(_, index) => ({
                length: BANNER_WIDTH,
                offset: BANNER_WIDTH * index,
                index,
              })}
              renderItem={({ item }) => (
                <View style={[styles.bannerCard, { width: BANNER_WIDTH }]}>
                  <Image source={item.image} style={styles.bannerImage} />
                  <LinearGradient
                    colors={[
                      "#448d41",
                      "rgba(90, 192, 87, 0.8)",
                      "rgba(10, 22, 9, 0)"
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.bannerGradient}
                  />

                  <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                    <TouchableOpacity style={styles.bannerButton}>
                      <Text style={styles.bannerButtonText}>{item.buttonText}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            {/* Punticos de Navegación */}
            <View style={styles.paginationContainer}>
              {banners.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    activeBannerIndex === index ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
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
  bannerCard: {
    height: 170,
    position: 'relative',
    justifyContent: 'center',
  },
  // Estilos para los punticos de navegación
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 18, // Hace el puntico activo un poco más ancho (estilo alargado)
    backgroundColor: '#FFFFFF',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  bannerGradient: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "85%",
  },
  bannerImage: {
    position: "absolute",
    right: -20,
    top: 0,
    width: "75%",
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
    color: "#316b33",
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