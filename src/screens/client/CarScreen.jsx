import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
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
  ShoppingBag,
} from "lucide-react-native";

// Mapeo estático de imágenes para evitar problemas al pasar parámetros
const PRODUCT_IMAGES = {
  "1": require("../../../assets/mantequilla.png"),
  "2": require("../../../assets/barra.png"),
  "3": require("../../../assets/matcha.png"),
  "4": require("../../../assets/proteina.png"),
};

export default function CarScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      title: "Mantequilla de Maní Crunchy",
      brand: "Nutrik Natural",
      price: "$28.000",
      numericPrice: 28000,
      weight: "500g",
      bgAccent: "#FEF3C7",
      quantity: 1,
    },
  ]);

  useEffect(() => {
    if (route.params?.productoAgregar) {
      const newProduct = route.params.productoAgregar;
      setCartItems((prevItems) => {
        const exists = prevItems.find((item) => item.id === newProduct.id);
        if (exists) {
          return prevItems.map((item) =>
            item.id === newProduct.id
              ? { ...item, quantity: item.quantity + (newProduct.quantity || 1) }
              : item
          );
        }
        return [...prevItems, { ...newProduct, quantity: newProduct.quantity || 1 }];
      });
    }
  }, [route.params?.productoAgregar]);

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
              Explora nuestro catálogo y añade tus productos saludables favoritos.
            </Text>
          </View>
        ) : (
          <View style={styles.itemsList}>
            {cartItems.map((item) => {
              const imageSource = item.image || PRODUCT_IMAGES[item.id];

              return (
                <View key={item.id} style={styles.cartCard}>
                  <View
                    style={[
                      styles.imageWrapper,
                      { backgroundColor: item.bgAccent || "#F8FAFC" },
                    ]}
                  >
                    <Image
                      source={imageSource}
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
              );
            })}

            {/* Resumen de Pago */}
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Envío</Text>
                <Text style={styles.summaryValue}>Gratis</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
              </View>

              <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.85}>
                <Text style={styles.checkoutButtonText}>Proceder al Pago</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: { alignItems: "center" },
  headerTitle: { fontSize: 16, fontWeight: "900", color: "#0F172A" },
  headerSubtitle: { fontSize: 11, color: "#64748B", fontWeight: "600" },
  trashHeaderButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF1F2",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: { padding: 20, paddingBottom: 40 },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 40,
  },
  itemsList: { gap: 14 },
  cartCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  imageWrapper: {
    width: 75,
    height: 75,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: { width: "75%", height: "75%" },
  productDetails: { flex: 1, marginLeft: 12 },
  brandText: { fontSize: 10, fontWeight: "800", color: "#94A3B8" },
  titleText: { fontSize: 14, fontWeight: "800", color: "#0F172A", marginVertical: 2 },
  priceText: { fontSize: 14, fontWeight: "900", color: "#15803D" },
  actionColumn: { alignItems: "flex-end", justifyContent: "space-between", height: 75 },
  deleteButton: { padding: 4 },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 2,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: { fontSize: 13, fontWeight: "800", color: "#0F172A", paddingHorizontal: 8 },
  summaryContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  summaryValue: { fontSize: 13, fontWeight: "800", color: "#0F172A" },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 12,
    marginTop: 6,
    marginBottom: 16,
  },
  totalLabel: { fontSize: 15, fontWeight: "900", color: "#0F172A" },
  totalValue: { fontSize: 18, fontWeight: "900", color: "#15803D" },
  checkoutButton: {
    backgroundColor: "#15803D",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#15803D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  checkoutButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
});