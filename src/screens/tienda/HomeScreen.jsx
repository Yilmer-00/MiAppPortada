import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CategorySection from "../../components/tienda/CategorySection";
import SearchBar from "../../components/tienda/SearchBar";

// Datos de ejemplo para cada sección
const frutas = [
  { id: '1', nombre: 'Manzana', precio: '2.00', descripcion: 'Manzana roja fresca y jugosa.' },
  { id: '2', nombre: 'Pera', precio: '1.50', descripcion: 'Pera verde seleccionada.' },
  { id: '3', nombre: 'Uva', precio: '3.00', descripcion: 'Uvas dulces sin semilla.' },
  { id: '4', nombre: 'Banano', precio: '1.00', descripcion: 'Bananos frescos ricos en potasio.' },
  { id: '5', nombre: 'Fresa', precio: '2.50', descripcion: 'Fresas rojas de campo.' },
];

const snacks = [
  { id: '6', nombre: 'Almendras', precio: '4.00', descripcion: 'Almendras tostadas sin sal.' },
  { id: '7', nombre: 'Nueces', precio: '3.50', descripcion: 'Nueces mixtas seleccionadas.' },
  { id: '8', nombre: 'Barra de Cereal', precio: '1.20', descripcion: 'Barra de avena con miel.' },
  { id: '9', nombre: 'Chips de Camote', precio: '2.00', descripcion: 'Chips crujientes horneados.' },
];

const bebidas = [
  { id: '10', nombre: 'Jugo Natural', precio: '2.50', descripcion: 'Jugo 100% natural de naranja.' },
  { id: '11', nombre: 'Té Verde', precio: '1.80', descripcion: 'Té verde orgánico embotellado.' },
  { id: '12', nombre: 'Agua de Coco', precio: '2.20', descripcion: 'Agua de coco hidratante.' },
  { id: '13', nombre: 'Smoothie Verde', precio: '3.20', descripcion: 'Smoothie de espinaca y manzana.' },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();
  const filterProducts = (products) =>
    products.filter((product) =>
      product.nombre.toLowerCase().includes(normalizedSearch),
    );
  const filteredCategories = useMemo(
    () => [
      { titulo: "Frutas", productos: filterProducts(frutas) },
      { titulo: "Snacks", productos: filterProducts(snacks) },
      { titulo: "Bebidas", productos: filterProducts(bebidas) },
    ],
    [normalizedSearch],
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Todos Nuestros Productos</Text>
        <Text style={styles.subtitle}>saludables</Text>
      </View>

      <SearchBar value={search} onChangeText={setSearch} />

      {filteredCategories.map((category) => (
        <CategorySection
          key={category.titulo}
          titulo={category.titulo}
          productos={category.productos}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});