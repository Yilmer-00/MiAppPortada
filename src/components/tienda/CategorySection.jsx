import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "./ProductCard";

export default function CategorySection({ titulo, productos }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{titulo}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("CategoryDetail", { titulo, productos })}
        >
          <Text style={styles.verMas}>Ver más...</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={productos ? productos.slice(0, 3) : []}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => <ProductCard producto={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 25 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  titulo: { fontSize: 20, fontWeight: "bold" },
  verMas: { color: "#2E7D32", fontWeight: "bold" },
});