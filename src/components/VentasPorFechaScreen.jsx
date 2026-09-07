import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

export function VentasPorFechaScreen() {
  const [fechaBusqueda, setFechaBusqueda] = useState('');
  const [resultados, setResultados] = useState([
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
            placeholder="AAAA-MM-DD"
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
                <View>
                  <Text style={styles.itemProd}>{item.producto}</Text>
                  <Text style={styles.itemCliente}>Cliente: {item.cliente}</Text>
                  <Text style={styles.itemFecha}>Fecha: {item.fecha}</Text>
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
  title: { fontSize: 26, fontWeight: 'bold', color: '#ffffff', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#aecba8', textAlign: 'center' },
  searchContainer: { marginBottom: 20 },
  input: { backgroundColor: '#127150', borderWidth: 1, borderColor: '#aecba8', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, color: '#ffffff', fontSize: 16 },
  listContainer: { gap: 12 },
  itemCard: { backgroundColor: '#127150', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  itemProd: { fontSize: 15, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  itemCliente: { fontSize: 13, color: '#aecba8', marginBottom: 2 },
  itemFecha: { fontSize: 12, color: '#6afd6a' },
  itemValor: { fontSize: 18, fontWeight: 'bold', color: '#6afd6a' },
  noResult: { color: '#aecba8', textAlign: 'center', marginTop: 20 },
});
