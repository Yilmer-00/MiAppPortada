import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput } from 'react-native';

export function VentasPorFechaScreen() {
  const [fechaBusqueda, setFechaBusqueda] = useState('');
  const [resultados] = useState([
    { fecha: '2026-06-01', cliente: 'Ana María Pérez', producto: 'Plan Nutricional Deportivo', valor: '$30.00' },
    { fecha: '2026-06-02', cliente: 'Carlos Gómez', producto: 'Guía de Recetas Saludables', valor: '$5.00' },
    { fecha: '2026-06-03', cliente: 'Lucía Benítez', producto: 'Asesoría Personalizada 1on1', valor: '$30.00' },
    { fecha: '2026-06-03', cliente: 'Jorge Torres', producto: 'Plan Nutricional Deportivo', valor: '$30.00' },
  ]);

  const filtrados = fechaBusqueda
    ? resultados.filter((r) => r.fecha.includes(fechaBusqueda))
    : resultados;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.sectionTag}>FILTRADO</Text>
          <Text style={styles.title}>Ventas por Fecha</Text>
          <Text style={styles.subtitle}>Busca transacciones específicas por día (Ej. 2026-06-03).</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="🔍 Buscar por fecha (AAAA-MM-DD)"
            placeholderTextColor="#8b949e"
            value={fechaBusqueda}
            onChangeText={setFechaBusqueda}
          />
        </View>

        <View style={styles.listContainer}>
          {filtrados.length === 0 ? (
            <Text style={styles.noResult}>No se encontraron ventas para esta fecha.</Text>
          ) : (
            filtrados.map((item, index) => (
              <View key={index} style={styles.itemCard}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.itemProd}>{item.producto}</Text>
                  <Text style={styles.itemCliente}>Cliente: {item.cliente}</Text>
                  <Text style={styles.itemFecha}>📅 {item.fecha}</Text>
                </View>
                <Text style={styles.itemValor}>{item.valor}</Text>
              </View>
            ))
          )}
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
  searchContainer: { marginBottom: 20 },
  input: { backgroundColor: '#127150', borderWidth: 1, borderColor: '#aecba8', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, color: '#ffffff', fontSize: 15 },
  listContainer: { gap: 12 },
  itemCard: { backgroundColor: '#127150', padding: 16, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  itemProd: { fontSize: 15, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  itemCliente: { fontSize: 13, color: '#aecba8', marginBottom: 2 },
  itemFecha: { fontSize: 12, color: '#6afd6a', fontWeight: '600' },
  itemValor: { fontSize: 18, fontWeight: 'bold', color: '#6afd6a' },
  noResult: { color: '#aecba8', textAlign: 'center', marginTop: 20 },
});
