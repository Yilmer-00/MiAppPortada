import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { CreditCard, Minus, Plus, ShoppingCart, Zap } from "lucide-react-native";

export default function ProductDetailScreen({ route }) {
  const { producto } = route.params || {};
  const { width } = useWindowDimensions();
  const [quantity, setQuantity] = useState(1);
  const image = producto?.imagen || producto?.image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900";
  const name = producto?.nombre || producto?.name || producto?.title || "Producto";
  const price = Number(producto?.precio || producto?.price || 0);
  const discount = Number(producto?.descuento || 15);
  const oldPrice = price > 0 ? Math.round(price / (1 - discount / 100)) : 0;
  const formatPrice = (value) => `$${value.toLocaleString("es-CO")}`;
  const isWide = width >= 720;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <View style={[styles.productPanel, isWide && styles.productPanelWide]}>
        <View style={[styles.imagePanel, isWide && styles.imagePanelWide]}>
          <Image
            source={typeof image === "string" ? { uri: image } : image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.infoPanel, isWide && styles.infoPanelWide]}>
          <Text style={styles.stock}>● Disponible en Stock (12 unidades)</Text>
          <Text style={styles.category}>{producto?.marca || "NUTRIK SALUDABLE"}</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.rating}>★★★★★ <Text style={styles.ratingDetail}>4.9 (320 opiniones verificadas)</Text></Text>

          <View style={styles.priceBox}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{formatPrice(price)}</Text>
              <Text style={styles.oldPrice}>{formatPrice(oldPrice)}</Text>
              <Text style={styles.discount}>{discount}% OFF</Text>
            </View>
            <View style={styles.installmentRow}>
              <CreditCard size={12} color="#15945B" />
              <Text style={styles.installment}>Paga en hasta 3 cuotas sin interés</Text>
            </View>
          </View>

          <Text style={styles.description}>
            {producto?.descripcion || producto?.description || "Producto seleccionado para cuidar tu bienestar y darte excelentes resultados."}
          </Text>

          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Cantidad:</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={13} color="#19613B" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity + 1)}>
                <Plus size={13} color="#19613B" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.buyButton} onPress={() => alert("Comprando...")}>
            <Zap size={13} color="#FFB74D" />
            <Text style={styles.buyText}>COMPRAR AHORA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} onPress={() => alert("Añadido al carrito")}>
            <ShoppingCart size={13} color="#155C37" />
            <Text style={styles.cartText}>AGREGAR AL CARRITO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F6F2" },
  scrollContent: { padding: 16, alignItems: "center" },
  productPanel: { width: "100%", maxWidth: 980, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 20, shadowColor: "#18251C", shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 7 }, elevation: 3 },
  productPanelWide: { flexDirection: "row", gap: 20, marginTop: 4 },
  imagePanel: { height: 280, backgroundColor: "#FAFAFA", borderWidth: 1, borderColor: "#E8EAE8", borderRadius: 9, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  imagePanelWide: { flex: 1, height: 253 },
  productImage: { width: "88%", height: "88%" },
  infoPanel: { paddingTop: 18 },
  infoPanelWide: { flex: 1, paddingTop: 1, justifyContent: "center" },
  stock: { color: "#15945B", fontSize: 12, marginBottom: 12 },
  category: { color: "#68736D", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 },
  name: { color: "#202020", fontSize: 24, fontWeight: "800", lineHeight: 31, marginBottom: 7 },
  rating: { color: "#FF9252", fontSize: 14, marginBottom: 16 },
  ratingDetail: { color: "#555555", fontSize: 12 },
  priceBox: { backgroundColor: "#F5F8FC", borderColor: "#D9E3EE", borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 14 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  price: { color: "#176238", fontSize: 22, fontWeight: "800" },
  oldPrice: { color: "#8D99A2", fontSize: 12, textDecorationLine: "line-through" },
  discount: { backgroundColor: "#D92732", color: "#FFFFFF", fontSize: 10, fontWeight: "800", paddingHorizontal: 7, paddingVertical: 4, borderRadius: 4 },
  installmentRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 8 },
  installment: { color: "#15945B", fontSize: 11 },
  description: { color: "#435365", fontSize: 13, lineHeight: 20, marginBottom: 18 },
  quantityRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  quantityLabel: { color: "#27332E", fontSize: 12, fontWeight: "700", marginRight: 12 },
  quantityControl: { flexDirection: "row", alignItems: "center", borderColor: "#C9D6E2", borderWidth: 1, borderRadius: 6, padding: 4 },
  quantityButton: { width: 30, height: 30, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", borderColor: "#D7E1E9", borderWidth: 1, borderRadius: 4 },
  quantity: { width: 34, textAlign: "center", color: "#27332E", fontSize: 14, fontWeight: "700" },
  buyButton: { height: 42, borderRadius: 8, backgroundColor: "#155C37", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 9 },
  buyText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  cartButton: { height: 42, borderRadius: 8, borderColor: "#155C37", borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 },
  cartText: { color: "#155C37", fontSize: 11, fontWeight: "800" },
});

