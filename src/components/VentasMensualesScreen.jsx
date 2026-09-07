import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export function VentasMensualesScreen() {
  const ventasMensuales = [
    { mes: 'Enero', total: '$1,450.00', transacciones: 35, crecimiento: '+12%' },
    { mes: 'Febrero', total: '$1,890.00', transacciones: 42, crecimiento: '+18%' },
    { mes: 'Marzo', total: '$2,300.00', transacciones: 53, crecimiento: '+22%' },
    { mes: 'Abril', total: '$1,980.00', transacciones: 48, crecimiento: '-5%' },
    { mes: 'Mayo', total: '$2,650.00', transacciones: 61, crecimiento: '+28%' },
    { mes: 'Junio', total: '$3,100.00', transacciones: 74, crecimiento: '+35%' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.sectionTag}>FINANZAS</Text>
          <Text style={styles.title}>Ventas Mensuales</Text>
          <Text style={styles.subtitle}>Comportamiento detallado de los ingresos mes a mes.</Text>
        </View>

        <View style={styles.grid}>
          {ventasMensuales.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.mes}>{item.mes}</Text>
                <Text style={styles.crecimiento}>{item.crecimiento}</Text>
              </View>
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
  header: { marginBottom: 20, alignItems: 'center' },
  sectionTag: { color: '#6afd6a', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 4 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#ffffff', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#aecba8', textAlign: 'center' },
  grid: { gap: 14 },
  card: { backgroundColor: '#127150', padding: 20, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 5 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  mes: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  crecimiento: { fontSize: 13, fontWeight: 'bold', color: '#6afd6a', backgroundColor: 'rgba(106, 253, 106, 0.15px)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  total: { fontSize: 24, fontWeight: '800', color: '#ffffff', marginBottom: 4 },
  trans: { fontSize: 13, color: '#aecba8' },
});
