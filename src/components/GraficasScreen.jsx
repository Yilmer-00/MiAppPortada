import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export function GraficasScreen() {
  const datosGrafica = [
    { periodo: 'Semana 1', porcentaje: '65%', altura: 130 },
    { periodo: 'Semana 2', porcentaje: '80%', altura: 160 },
    { periodo: 'Semana 3', porcentaje: '45%', altura: 90 },
    { periodo: 'Semana 4', porcentaje: '95%', altura: 190 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.sectionTag}>ANÁLISIS VISUAL</Text>
          <Text style={styles.title}>Gráficas de Crecimiento</Text>
          <Text style={styles.subtitle}>Comportamiento dinámico de ventas por periodos semanales.</Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Rendimiento Mensual Reciente</Text>
          <View style={styles.chartArea}>
            {datosGrafica.map((item, index) => (
              <View key={index} style={styles.barWrapper}>
                <Text style={styles.barValue}>{item.porcentaje}</Text>
                <View style={[styles.bar, { height: item.altura }]} />
                <Text style={styles.barLabel}>{item.periodo}</Text>
              </View>
            ))}
          </View>
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
  cardContainer: { backgroundColor: '#127150', padding: 20, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 5 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 15, textAlign: 'center' },
  chartArea: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 220, paddingTop: 10 },
  barWrapper: { alignItems: 'center' },
  barValue: { color: '#ffffff', fontSize: 11, marginBottom: 6, fontWeight: 'bold' },
  bar: { width: 36, backgroundColor: '#6afd6a', borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  barLabel: { color: '#aecba8', fontSize: 12, marginTop: 8 },
});
