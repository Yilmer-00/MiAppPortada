import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CategorySection from "../../components/tienda/CategorySection";
import SearchBar from "../../components/tienda/SearchBar";

// Datos de ejemplo para cada sección
const frutas = [
  { id: '1', nombre: 'Manzana', precio: '2.00', descuento: 10, imagen: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600', descripcion: 'Manzana roja fresca y jugosa, ideal para una merienda saludable.' },
  { id: '2', nombre: 'Pera', precio: '1.50', descuento: 10, imagen: 'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=600', descripcion: 'Pera verde seleccionada, dulce y refrescante.' },
  { id: '3', nombre: 'Uva', precio: '3.00', descuento: 15, imagen: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600', descripcion: 'Uvas dulces sin semilla, perfectas para compartir.' },
  { id: '4', nombre: 'Banano', precio: '1.00', descuento: 10, imagen: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600', descripcion: 'Bananos frescos ricos en potasio y energía natural.' },
  { id: '5', nombre: 'Fresa', precio: '2.50', descuento: 15, imagen: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600', descripcion: 'Fresas rojas de campo, frescas y llenas de sabor.' },
];

const snacks = [
  { id: '6', nombre: 'Almendras', precio: '4.00', descuento: 10, imagen: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600', descripcion: 'Almendras tostadas sin sal, crujientes y nutritivas.' },
  { id: '7', nombre: 'Nueces', precio: '3.50', descuento: 15, imagen: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=600', descripcion: 'Nueces mixtas seleccionadas para una merienda saludable.' },
  { id: '8', nombre: 'Barra de Cereal', precio: '1.20', descuento: 10, imagen: 'https://images.unsplash.com/photo-1517093728432-a0440f8d45af?w=600', descripcion: 'Barra de avena con miel, práctica para llevar.' },
  { id: '9', nombre: 'Chips de Camote', precio: '2.00', descuento: 15, imagen: 'https://images.unsplash.com/photo-1621447504864-d8686c8e2d7a?w=600', descripcion: 'Chips crujientes de camote horneados.' },
];

const bebidas = [
  { id: '10', nombre: 'Jugo Natural', precio: '2.50', descuento: 10, imagen: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600', descripcion: 'Jugo 100% natural de naranja, refrescante y delicioso.' },
  { id: '11', nombre: 'Té Verde', precio: '1.80', descuento: 10, imagen: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600', descripcion: 'Té verde orgánico embotellado para disfrutar frío o caliente.' },
  { id: '12', nombre: 'Agua de Coco', precio: '2.20', descuento: 15, imagen: 'https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?w=600', descripcion: 'Agua de coco hidratante y naturalmente refrescante.' },
  { id: '13', nombre: 'Smoothie Verde', precio: '3.20', descuento: 20, imagen: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600', descripcion: 'Smoothie de espinaca y manzana, fresco y nutritivo.' },
];

const keratinas = [
  { id: '14', nombre: 'Keratina Reparadora', precio: '12.00', descuento: 20, imagen: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600', descripcion: 'Tratamiento para cabello seco y maltratado, con brillo y suavidad.' },
  { id: '15', nombre: 'Keratina Brasilera', precio: '18.00', descuento: 15, imagen: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600', descripcion: 'Alisado y brillo duradero para transformar tu cabello.' },
  { id: '16', nombre: 'Keratina de Coco', precio: '15.00', descuento: 20, imagen: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600', descripcion: 'Tratamiento nutritivo con aceite de coco para hidratar.' },
  { id: '17', nombre: 'Keratina Express', precio: '10.00', descuento: 10, imagen: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600', descripcion: 'Tratamiento rápido para suavizar y cuidar el cabello.' },
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
      { titulo: "Keratinas", productos: filterProducts(keratinas) },
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