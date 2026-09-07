import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function ProductDetailScreen({ route }) {
  const { producto } = route.params || {};
  const image = producto?.imagen || producto?.image;
  const name = producto?.nombre || producto?.name || producto?.title;
  const price = producto?.precio || producto?.price;

  return (
    <ScrollView style={styles.container}>
      {image && (
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={styles.image}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{name || "Producto"}</Text>
        <Text style={styles.price}>${price || "0.00"}</Text>
        <Text style={styles.description}>
          {producto?.descripcion || producto?.description ||
            "Descripción detallada del producto."}
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
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 300, resizeMode: "contain" },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  price: { fontSize: 18, color: "green", marginVertical: 8 },
  description: { fontSize: 14, color: "#666", marginBottom: 20 },
  button: { padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  cartBtn: { backgroundColor: "#007AFF" },
  buyBtn: { backgroundColor: "#FF9500" },
  btnText: { color: "#fff", fontWeight: "bold" },
});