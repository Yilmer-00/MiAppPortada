import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export default function SalesScreen() {
  // Datos simulados orientados al proyecto Nutrick
  const ventasMensuales = [
    { mes: 'Enero', total: '$1,450.00' },
    { mes: 'Febrero', total: '$1,890.00' },
    { mes: 'Marzo', total: '$2,300.00' },
  ];

  const productosMasVendidos = [
    { id: '1', nombre: 'Plan Nutricional Deportivo', cantidad: 45, ingresos: '$1,350.00' },
    { id: '2', nombre: 'Asesoría Personalizada 1on1', cantidad: 30, ingresos: '$900.00' },
    { id: '3', nombre: 'Guía de Recetas Saludables', cantidad: 85, ingresos: '$425.00' },
  ];

  const ventasPorFecha = [
    { fecha: '2026-06-01', producto: 'Guía de Recetas Saludables', valor: '$5.00' },
    { fecha: '2026-06-02', producto: 'Plan Nutricional Deportivo', valor: '$30.00' },
    { fecha: '2026-06-03', producto: 'Asesoría Personalizada 1on1', valor: '$30.00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HERO / BIENVENIDA */}
        <View style={styles.hero}>
          <View style={styles.heroTexto}>
            <Text style={styles.sectionTag}>PANEL ADMINISTRATIVO</Text>
            <Text style={styles.title}>
              Control de <Text style={styles.titleSpan}>Ventas e Ingresos</Text>
            </Text>
            <Text style={styles.heroDesc}>
              Supervisa el rendimiento financiero de tu plataforma Nutrick en tiempo real, analiza los productos con mayor demanda y el flujo de ventas diarias.
            </Text>
          </View>
        </View>

        {/* STATS / VENTAS TOTALES */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <h2 style={{margin: 0, fontSize: '48px'}}>
              <Text style={styles.statNumber}>$5,640</Text>
            </h2>
            <Text style={styles.statText}>Ventas Totales</Text>
          </View>
          <View style={styles.stat}>
            <h2 style={{margin: 0, fontSize: '48px'}}>
              <Text style={styles.statNumber}>160</Text>
            </h2>
            <Text style={styles.statText}>Transacciones</Text>
          </View>
        </View>

        {/* VENTAS MENSUALES */}
        <View style={styles.beneficios}>
          <Text style={styles.sectionTitle}>Ventas Mensuales</Text>
          <View style={styles.beneficiosGrid}>
            {ventasMensuales.map((item, index) => (
              <View key={index} style={styles.beneficio}>
                <Text style={styles.cardTitle}>{item.mes}</Text>
                <Text style={styles.cardValue}>{item.total}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* PRODUCTOS MÁS VENDIDOS */}
        <View style={styles.productos}>
          <Text style={styles.sectionTitleDark}>Productos Más Vendidos</Text>
          <View style={styles.productosGrid}>
            {productosMasVendidos.map((prod) => (
              <View key={prod.id} style={styles.productoCard}>
                <Text style={styles.prodNombre}>{prod.nombre}</Text>
                <Text style={styles.prodCantidad}>Vendidos: {prod.id === '3' ? prod.cantidad : prod.cantidad} unidades</Text>
                <Text style={styles.prodIngresos}>Ingresos: {prod.ingresos}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* VENTAS POR FECHA */}
        <View style={styles.pasos}>
          <View style={styles.pasosHeader}>
            <Text style={styles.badgeText}>Historial</Text>
            <Text style={styles.sectionTitle}>Ventas por Fecha</Text>
          </View>
          <View style={styles.tablaContainer}>
            {ventasPorFecha.map((v, i) => (
              <View key={i} style={styles.filaTabla}>
                <Text style={styles.tablaFecha}>{v.fecha}</Text>
                <Text style={styles.tablaProd}>{v.producto}</Text>
                <Text style={styles.tablaValor}>{v.valor}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#127150', // --verde-oscuro
  },
  scrollContent: {
    paddingBottom: 40,
  },
  hero: {
    padding: 40,
    backgroundColor: '#aecba8', // --verde
    alignItems: 'center',
  },
  heroTexto: {
    alignItems: 'center',
  },
  sectionTag: {
    color: '#052e16',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleSpan: {
    color: '#052e16',
  },
  heroDesc: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
    maxWidth: 500,
  },
  stats: {
    backgroundColor: '#052e16',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#6afd6a', // --verde-neon
    fontWeight: '800',
  },
  statText: {
    color: '#ffffff',
    fontSize: 15,
  },
  beneficios: {
    padding: 30,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#127150',
    marginBottom: 20,
    textAlign: 'center',
  },
  beneficiosGrid: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 15,
  },
  beneficio: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    minWidth: 150,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.1)',
  },
  cardTitle: {
    fontSize: 16,
    color: '#127150',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#052e16',
    marginTop: 5,
  },
  productos: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  sectionTitleDark: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#127150',
    marginBottom: 20,
    textAlign: 'center',
  },
  productosGrid: {
    gap: 15,
  },
  productoCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.12)',
  },
  prodNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#127150',
  },
  prodCantidad: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
  },
  prodIngresos: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#052e16',
    marginTop: 8,
  },
  pasos: {
    padding: 30,
    backgroundColor: '#edf7ef',
  },
  pasosHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeText: {
    backgroundColor: 'rgba(106, 253, 106, 0.2)',
    color: '#127150',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 8,
  },
  tablaContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
  },
  filaTabla: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tablaFecha: {
    color: '#475569',
    fontSize: 14,
  },
  tablaProd: {
    color: '#127150',
    fontWeight: '600',
    fontSize: 14,
  },
  tablaValor: {
    color: '#052e16',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
