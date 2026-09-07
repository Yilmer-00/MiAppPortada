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
            <View key={index} style={styles.beneficio}>
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
  container: { flex: 1, backgroundColor: '#ecfdf5' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 20, alignItems: 'center' },
  sectionTag: { color: '#127150', fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 4 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#127150', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#475569', textAlign: 'center' },
  listContainer: { gap: 14 },
  beneficio: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  rankBadge: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#aecba8', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  rankText: { color: '#052e16', fontWeight: 'bold', fontSize: 16 },
  info: { flex: 1, marginRight: 10 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#127150', marginBottom: 4 },
  detalles: { fontSize: 13, color: '#475569' },
  ingresos: { fontSize: 16, fontWeight: 'bold', color: '#052e16' },
});
