import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FacturaDetalleScreen({ route, navigation }) {
  // Recibimos los datos de la factura que se presionó (si no hay, usamos una por defecto)
  const { factura } = route.params || {
    id: 'FAC-0001',
    cliente: 'Juan Pérez',
    fecha: '25/08/2026',
    total: '$ 150.000',
    estado: 'Pagada',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botón Volver */}
      <TouchableOpacity
        style={styles.btnVolver}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Ionicons name="arrow-back" size={18} color="#198754" />
        <Text style={styles.btnVolverText}>Volver a Facturas</Text>
      </TouchableOpacity>

      {/* Tarjeta de Detalle */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Detalle de la Factura: {factura.id}</Text>
          <View style={[
            styles.badge,
            { backgroundColor: factura.estado === 'Pagada' ? '#d1e7dd' : '#fff3cd' }
          ]}>
            <Text style={[
              styles.badgeText,
              { color: factura.estado === 'Pagada' ? '#0f5132' : '#664d03' }
            ]}>
              {factura.estado}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.label}>CLIENTE</Text>
            <Text style={styles.value}>{factura.cliente}</Text>
          </View>
          <View>
            <Text style={styles.label}>FECHA</Text>
            <Text style={styles.value}>{factura.fecha}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>PRODUCTOS COMPRADOS</Text>

        <View style={styles.productRow}>
          <Text style={styles.productName}>Yogur Griego Natural (x1)</Text>
          <Text style={styles.productPrice}>$ 12.000</Text>
        </View>

        <View style={styles.productRow}>
          <Text style={styles.productName}>Ensalada Fresh (x1)</Text>
          <Text style={styles.productPrice}>$ 15.000</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total de Pago:</Text>
          <Text style={styles.totalValue}>{factura.total}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    paddingTop: 40,
  },
  btnVolver: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#e8f5e9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  btnVolverText: {
    color: '#198754',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 11,
    color: '#888',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  productName: {
    fontSize: 14,
    color: '#444',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#198754',
  },
});