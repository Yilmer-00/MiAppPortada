import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

export default function SalesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HERO / BIENVENIDA */}
        <View style={styles.heroCard}>
          <Text style={styles.sectionTag}>PANEL COMERCIAL</Text>
          <Text style={styles.title}>Ventas e Ingresos</Text>
          <Text style={styles.heroDesc}>
            Control centralizado de finanzas, rendimiento comercial y analíticas de la plataforma Nutrick.
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>$5,640</Text>
              <Text style={styles.statLabel}>Ventas Totales</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>160</Text>
              <Text style={styles.statLabel}>Transacciones</Text>
            </View>
          </View>
        </View>

        {/* ACCESOS DIRECTOS A LOS DEMÁS MÓDULOS */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuHeader}>Módulos de Análisis</Text>

          <TouchableOpacity 
            style={styles.menuCard} 
            onPress={() => navigation.navigate('📅 Ventas Mensuales')}
          >
            <View style={styles.iconContainer}><Text style={styles.iconText}>📈</Text></View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Ventas Mensuales</Text>
              <Text style={styles.menuDesc}>Revisa el comportamiento de los ingresos mes a mes.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard} 
            onPress={() => navigation.navigate('📊 Gráficas')}
          >
            <View style={styles.iconContainer}><Text style={styles.iconText}>📊</Text></View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Gráficas de Crecimiento</Text>
              <Text style={styles.menuDesc}>Visualiza estadísticas y barras de rendimiento.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard} 
            onPress={() => navigation.navigate('🔍 Ventas por Fecha')}
          >
            <View style={styles.iconContainer}><Text style={styles.iconText}>📅</Text></View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Ventas por Fecha</Text>
              <Text style={styles.menuDesc}>Filtra transacciones específicas por día.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard} 
            onPress={() => navigation.navigate('🏆 Productos Más Vendidos')}
          >
            <View style={styles.iconContainer}><Text style={styles.iconText}>⭐</Text></View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Productos Más Vendidos</Text>
              <Text style={styles.menuDesc}>Ranking de los planes y servicios con mayor demanda.</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#052e16', // --verde-claro
  },
  scrollContent: {
    padding: 20,
  },
  heroCard: {
    backgroundColor: '#127150', // --verde-oscuro
    borderRadius: 24,
    padding: 24,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(106, 253, 106, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  sectionTag: {
    color: '#6afd6a', // --verde-neon
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 10,
  },
  heroDesc: {
    color: '#aecba8', // --verde
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(5, 46, 22, 0.6)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statNumber: {
    color: '#6afd6a',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  menuContainer: {
    gap: 12,
  },
  menuHeader: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: '#127150',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(106, 253, 106, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 22,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuDesc: {
    color: '#aecba8',
    fontSize: 13,
    lineHeight: 18,
  },
});
