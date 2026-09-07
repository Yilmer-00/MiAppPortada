import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import ProductCard from "../../components/tienda/ProductCard";

export default function CategoryDetailScreen({ route }) {
  const { titulo, productos } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{titulo || "Categoría"}</Text>
        <Text style={styles.subtitulo}>{productos?.length || 0} productos disponibles</Text>
      </View>

      <FlatList
        data={productos}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        numColumns={2}
        contentContainerStyle={styles.lista}
        columnWrapperStyle={styles.columna}
        renderItem={({ item }) => <ProductCard producto={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#2E7D32" },
  subtitulo: { fontSize: 14, color: "#666", marginTop: 4 },
  lista: { padding: 12 },
  columna: { justifyContent: "space-between", marginBottom: 12 },
});