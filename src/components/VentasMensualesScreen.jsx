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
          <Text style={styles.subtitle}>Comportamiento y evolución de los ingresos mes a mes.</Text>
        </View>

        <View style={styles.grid}>
          {ventasMensuales.map((item, index) => (
            <View key={index} style={styles.beneficio}>
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
  container: { flex: 1, backgroundColor: '#ecfdf5' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 25, alignItems: 'center' },
  sectionTag: { color: '#127150', fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 4 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#127150', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#475569', textAlign: 'center' },
  grid: { gap: 15 },
  beneficio: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  mes: { fontSize: 18, fontWeight: 'bold', color: '#127150' },
  crecimiento: { fontSize: 13, fontWeight: 'bold', color: '#127150', backgroundColor: '#6afd6a', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  total: { fontSize: 24, fontWeight: '800', color: '#052e16', marginBottom: 4 },
  trans: { fontSize: 14, color: '#475569' },
});
