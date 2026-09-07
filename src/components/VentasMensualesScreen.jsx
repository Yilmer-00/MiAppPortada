import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export function VentasMensualesScreen() {
  const ventasMensuales = [
    { mes: 'Enero', total: '$1,450.00', transacciones: 35 },
    { mes: 'Febrero', total: '$1,890.00', transacciones: 42 },
    { mes: 'Marzo', total: '$2,300.00', transacciones: 53 },
    { mes: 'Abril', total: '$1,980.00', transacciones: 48 },
    { mes: 'Mayo', total: '$2,650.00', transacciones: 61 },
    { mes: 'Junio', total: '$3,100.00', transacciones: 74 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.sectionTag}>FINANZAS</Text>
          <Text style={styles.title}>Ventas Mensuales</Text>
          <Text style={styles.subtitle}>Comportamiento de los ingresos mes a mes en la plataforma.</Text>
        </View>

        <View style={styles.grid}>
          {ventasMensuales.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.mes}>{item.mes}</Text>
              <Text style={styles.total}>{item.total}</Text>
              <Text style={styles.trans}>Transacciones: {item.transacciones}</Text>
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
  grid: { gap: 15 },
  card: { backgroundColor: '#127150', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  mes: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginBottom: 5 },
  total: { fontSize: 22, fontWeight: '800', color: '#6afd6a', marginBottom: 4 },
  trans: { fontSize: 14, color: '#aecba8' },
});
