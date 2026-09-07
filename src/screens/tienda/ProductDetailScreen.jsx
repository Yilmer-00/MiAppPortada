import React from "react";
import {View,Text,Image,StyleSheet,TouchableOpacity,ScrollView,} from "react-native";

export default function ProductDetailScreen({ route }) {
  const { producto } = route.params || {};
  const image = producto?.imagen || producto?.image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900";
  const name = producto?.nombre || producto?.name || producto?.title;
  const price = Number(producto?.precio || producto?.price || 0);
  const discount = Number(producto?.descuento || 15);
  const oldPrice = price > 0 ? (price / (1 - discount / 100)).toFixed(2) : "0.00";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={styles.image}
        />
        <Text style={styles.discountBadge}>-{discount}%</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{name || "Producto"}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <Text style={styles.oldPrice}>${oldPrice}</Text>
        </View>
        <Text style={styles.offer}>Oferta especial por tiempo limitado</Text>
        <Text style={styles.description}>
          {producto?.descripcion || producto?.description ||
            "Producto seleccionado para cuidar tu bienestar y darte excelentes resultados."}
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.cartBtn]}
          onPress={() => alert("Añadido al carrito")}
        >
          <Text style={styles.btnText}>Agregar al carrito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buyBtn]}
          onPress={() => alert("Comprando...")}
        >
          <Text style={styles.btnText}>Comprar ya</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7F3" },
  imageContainer: { height: 300, backgroundColor: "#E8F0E4", position: "relative" },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  discountBadge: { position: "absolute", top: 18, right: 18, backgroundColor: "#D84315", color: "#FFF", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, fontWeight: "bold" },
  content: { padding: 20, backgroundColor: "#FFF", margin: 12, borderRadius: 16 },
  title: { fontSize: 25, fontWeight: "bold", color: "#1B3A20" },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 10 },
  price: { fontSize: 24, color: "#2E7D32", fontWeight: "bold" },
  oldPrice: { fontSize: 16, color: "#888", textDecorationLine: "line-through" },
  offer: { color: "#D84315", fontWeight: "bold", marginTop: 5 },
  description: { fontSize: 16, lineHeight: 23, color: "#666", marginVertical: 20 },
  button: { padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  cartBtn: { backgroundColor: "#007AFF" },
  buyBtn: { backgroundColor: "#FF9500" },
  btnText: { color: "#fff", fontWeight: "bold" },
});