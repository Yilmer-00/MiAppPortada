import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FacturasScreen({ navigation }) {
  const facturas = [
    { id: 'FAC-0001', cliente: 'Juan Pérez', fecha: '25/08/2026', total: '$ 150.000', estado: 'Pagada' },
    { id: 'FAC-0002', cliente: 'Ana López', fecha: '24/08/2026', total: '$ 230.000', estado: 'Pagada' },
    { id: 'FAC-0003', cliente: 'Pedro Gómez', fecha: '24/08/2026', total: '$ 89.000', estado: 'Pendiente' },
    { id: 'FAC-0004', cliente: 'María Torres', fecha: '23/08/2026', total: '$ 120.000', estado: 'Pagada' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Facturación</Text>
        <Text style={styles.subtitle}>Gestiona tus facturas de forma rápida y ordenada.</Text>
        
        <TouchableOpacity style={styles.btnNueva}>
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.btnNuevaText}>Nueva factura</Text>
        </TouchableOpacity>
      </View>

      {facturas.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.facturaId}>{item.id}</Text>
            <View style={[
              styles.badge, 
              { backgroundColor: item.estado === 'Pagada' ? '#d1e7dd' : '#fff3cd' }
            ]}>
              <Text style={[
                styles.badgeText, 
                { color: item.estado === 'Pagada' ? '#0f5132' : '#664d03' }
              ]}>
                {item.estado}
              </Text>
            </View>
          </View>

          <Text style={styles.clientName}>{item.cliente}</Text>
          
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.label}>Fecha: {item.fecha}</Text>
              <Text style={styles.totalText}>{item.total}</Text>
            </View>
            
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => navigation.navigate('FacturaDetalle', { factura: item })}
              >
                <Text style={styles.actionTextVer}>Ver</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.downloadBtn]}>
                <Text style={styles.actionTextDownload}>Descargar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    paddingTop: 50,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 12,
  },
  btnNueva: {
    backgroundColor: '#198754',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnNuevaText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  facturaId: {
    fontWeight: 'bold',
    color: '#198754',
    fontSize: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  label: {
    fontSize: 12,
    color: '#888',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
    backgroundColor: '#f1f3f5',
  },
  downloadBtn: {
    backgroundColor: '#e7f5ff',
  },
  actionTextVer: {
    color: '#0d6efd',
    fontWeight: '600',
    fontSize: 13,
  },
  actionTextDownload: {
    color: '#0366d6',
    fontWeight: '600',
    fontSize: 13,
  },
});