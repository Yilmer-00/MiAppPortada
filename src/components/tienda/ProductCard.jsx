import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ producto }) {
  const navigation = useNavigation();

  const nombre = producto?.nombre || producto?.name || "Producto";
  const imagen = producto?.imagen || producto?.image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400";

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={typeof imagen === "string" ? { uri: imagen } : imagen} style={styles.image} resizeMode="cover" />
      </View>

      <Text style={styles.nombre} numberOfLines={1}>{nombre}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProductDetail", { producto })}
      >
        <Text style={styles.buttonText}>Ver producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    width: 150,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "100%", height: "100%" },
  placeholder: { width: "100%", height: "100%", backgroundColor: "#D6D6D6" },
  nombre: { fontSize: 14, fontWeight: "bold", color: "#121212", marginBottom: 10, textAlign: "center" },
  button: {
    backgroundColor: "#2E7D32",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 12 },
});