import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export function ProductosMasVendidosScreen() {
  const productos = [
    { rank: '#1', nombre: 'Plan Nutricional Deportivo', vendidos: '120 unidades', ingresos: '$3,600.00' },
    { rank: '#2', nombre: 'Guía de Recetas Saludables', vendidos: '95 unidades', ingresos: '$475.00' },
    { rank: '#3', nombre: 'Asesoría Personalizada 1on1', vendidos: '60 unidades', ingresos: '$1,800.00' },
    { rank: '#4', nombre: 'Suplemento Proteico Natural', vendidos: '40 unidades', ingresos: '$1,200.00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.sectionTag}>RANKING</Text>
          <Text style={styles.title}>Productos Más Vendidos</Text>
          <Text style={styles.subtitle}>Los productos y servicios con mayor éxito comercial.</Text>
        </View>

        <View style={styles.listContainer}>
          {productos.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{item.rank}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.detalles}>Total vendidos: {item.vendidos}</Text>
              </View>
              <Text style={styles.ingresos}>{item.ingresos}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#052e16' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 25, alignItems: 'center' },
  sectionTag: { color: '#6afd6a', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 4 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#ffffff', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#aecba8', textAlign: 'center' },
  listContainer: { gap: 15 },
  card: { backgroundColor: '#127150', padding: 15, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  rankBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#6afd6a', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  rankText: { color: '#052e16', fontWeight: 'bold', fontSize: 15 },
  info: { flex: 1, marginRight: 10 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  detalles: { fontSize: 13, color: '#aecba8' },
  ingresos: { fontSize: 16, fontWeight: 'bold', color: '#6afd6a' },
});
