import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ChevronRight,
  ShoppingBag,
} from "lucide-react-native";

// Productos recomendados (Cross-selling al estilo "Lo Nuevo")
const recommendedProducts = [
  {
    id: "3",
    title: "Matcha Orgánico en Polvo",
    brand: "Green Tea Co",
    price: "$52.000",
    numericPrice: 52000,
    weight: "100g",
    image: require("../../../assets/matcha.png"),
    bgAccent: "#DCFCE7",
  },
  {
    id: "4",
    title: "Creatina Monohidratada",
    brand: "Nutrik Pure",
    price: "$85.000",
    numericPrice: 85000,
    weight: "300g",
    image: require("../../../assets/proteina.png"),
    bgAccent: "#E0F2FE",
  },
];

export default function CarScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Estado del carrito inicial con la Mantequilla de Maní por defecto
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      title: "Mantequilla de Maní Crunchy",
      brand: "Nutrik Natural",
      price: "$28.000",
      numericPrice: 28000,
      weight: "500g",
      image: require("../../../assets/mantequilla.png"),
      bgAccent: "#FEF3C7",
      quantity: 1,
    },
  ]);

  // Recibir producto enviado desde ProductsScreen o LoNuevoScreen
  useEffect(() => {
    if (route.params?.productoAgregar) {
      const newProduct = route.params.productoAgregar;
      setCartItems((prevItems) => {
        const exists = prevItems.find((item) => item.id === newProduct.id);
        if (exists) {
          return prevItems.map((item) =>
            item.id === newProduct.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { ...newProduct, quantity: 1 }];
      });
    }
  }, [route.params?.productoAgregar]);

  // Funciones de gestión del carrito
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + change;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addRecommendedItem = (product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Cálculos de totales
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.numericPrice * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatCurrency = (val) =>
    "$" + val.toLocaleString("es-CO", { maximumFractionDigits: 0 });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color="#15803D" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Mi Carrito</Text>
          <Text style={styles.headerSubtitle}>
            {totalItems === 1
              ? "1 producto seleccionado"
              : `${totalItems} productos seleccionados`}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.trashHeaderButton}
          onPress={clearCart}
          activeOpacity={0.7}
        >
          <Trash2 size={20} color="#E11D48" />
        </TouchableOpacity>
      </View>

      {/* Contenido Principal */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ShoppingBag size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
            <Text style={styles.emptySubtitle}>
              Explora nuestro catálogo y añade tus snacks favoritos.
            </Text>
          </View>
        ) : (
          <View style={styles.itemsList}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartCard}>
                <View
                  style={[
                    styles.imageWrapper,
                    { backgroundColor: item.bgAccent },
                  ]}
                >
                  <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.productDetails}>
                  <Text style={styles.brandText}>{item.brand}</Text>
                  <Text style={styles.titleText} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.priceText}>
                    {formatCurrency(item.numericPrice)}
                  </Text>
                </View>

                <View style={styles.actionColumn}>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={styles.deleteButton}
                  >
                    <Trash2 size={16} color="#94A3B8" />
                  </TouchableOpacity>

                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <Minus size={14} color="#15803D" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={14} color="#15803D" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Sección Te podría interesar (Cross-selling) */}
        <View style={styles.recommendedSection}>
          <View style={styles.sectionHeader}>
            <Sparkles size={16} color="#15803D" />
            <Text style={styles.sectionTitle}>Te podría interesar</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendedProducts.map((prod) => (
              <View key={prod.id} style={styles.recommendedCard}>
                <View
                  style={[
                    styles.recommendedImgContainer,
                    { backgroundColor: prod.bgAccent },
                  ]}
                >
                  <Image
                    source={prod.image}
                    style={styles.recommendedImg}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.recommendedTitle} numberOfLines={1}>
                  {prod.title}
                </Text>
                <Text style={styles.recommendedPrice}>{prod.price}</Text>

                <TouchableOpacity
                  style={styles.addRecommendedBtn}
                  onPress={() => addRecommendedItem(prod)}
                  activeOpacity={0.8}
                >
                  <Plus size={14} color="#FFFFFF" />
                  <Text style={styles.addRecommendedText}>Agregar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Footer Fijo con Resumen y Checkout */}
      {cartItems.length > 0 && (
        <View style={styles.footerContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(subtotal)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío</Text>
            <Text style={styles.freeShippingText}>GRATIS</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total a pagar</Text>
              <Text style={styles.totalPrice}>{formatCurrency(subtotal)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              activeOpacity={0.9}
              onPress={() => {
                /* Conectar con pantalla de pago/factura */
              }}
            >
              <Text style={styles.checkoutText}>Finalizar Compra</Text>
              <ChevronRight size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#F8FAFC",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#64748B",
  },
  trashHeaderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFE4E6",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#334155",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 30,
  },
  itemsList: {
    gap: 12,
  },
  cartCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "80%",
    height: "80%",
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  brandText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
  },
  titleText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E293B",
    marginVertical: 2,
  },
  priceText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#15803D",
  },
  actionColumn: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 65,
  },
  deleteButton: {
    padding: 4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 8,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
  },
  recommendedSection: {
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  recommendedCard: {
    width: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  recommendedImgContainer: {
    height: 90,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  recommendedImg: {
    width: "75%",
    height: "75%",
  },
  recommendedTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E293B",
  },
  recommendedPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: "#15803D",
    marginVertical: 4,
  },
  addRecommendedBtn: {
    backgroundColor: "#15803D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  addRecommendedText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  footerContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#64748B",
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
  },
  freeShippingText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#15803D",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 11,
    color: "#94A3B8",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "900",
    color: "#15803D",
  },
  checkoutButton: {
    backgroundColor: "#15803D",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 18,
    gap: 6,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});