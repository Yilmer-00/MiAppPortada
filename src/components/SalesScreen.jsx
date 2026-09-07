import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

export default function SalesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroTexto}>
            <Text style={styles.sectionTag}>PANEL COMERCIAL</Text>
            <Text style={styles.title}>Ventas e <Text style={styles.titleSpan}>Ingresos</Text></Text>
            <Text style={styles.heroDesc}>
              Supervisa el rendimiento financiero de tu plataforma con analíticas avanzadas, métricas en tiempo real y reportes detallados.
            </Text>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>$5,640</Text>
            <Text style={styles.statText}>Ventas Totales</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>160</Text>
            <Text style={styles.statText}>Transacciones</Text>
          </View>
        </View>

        {/* SECCIÓN DE NAVEGACIÓN A MÓDULOS */}
        <View style={styles.beneficios}>
          <Text style={styles.sectionTitle}>Módulos de Gestión</Text>
          
          <View style={styles.beneficiosGrid}>
            
            <TouchableOpacity style={styles.beneficio} onPress={() => navigation.navigate('📅 Ventas Mensuales')}>
              <View style={styles.iconCircle}><Text style={styles.iconEmoji}>📈</Text></View>
              <Text style={styles.beneficioTitle}>Ventas Mensuales</Text>
              <Text style={styles.beneficioDesc}>Comportamiento y evolución de los ingresos mes a mes.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.beneficio} onPress={() => navigation.navigate('📊 Gráficas')}>
              <View style={styles.iconCircle}><Text style={styles.iconEmoji}>📊</Text></View>
              <Text style={styles.beneficioTitle}>Gráficas de Crecimiento</Text>
              <Text style={styles.beneficioDesc}>Visualiza estadísticas y barras de rendimiento comercial.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.beneficio} onPress={() => navigation.navigate('🔍 Ventas por Fecha')}>
              <View style={styles.iconCircle}><Text style={styles.iconEmoji}>📅</Text></View>
              <Text style={styles.beneficioTitle}>Ventas por Fecha</Text>
              <Text style={styles.beneficioDesc}>Filtra y consulta transacciones específicas por día.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.beneficio} onPress={() => navigation.navigate('🏆 Productos Más Vendidos')}>
              <View style={styles.iconCircle}><Text style={styles.iconEmoji}>⭐</Text></View>
              <Text style={styles.beneficioTitle}>Productos Más Vendidos</Text>
              <Text style={styles.beneficioDesc}>Ranking de los planes y servicios con mayor éxito.</Text>
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#127150' },
  scrollContent: { paddingBottom: 40 },
  hero: {
    padding: 30,
    backgroundColor: '#aecba8',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  heroTexto: { alignItems: 'center' },
  sectionTag: { color: '#052e16', fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 6 },
  title: { fontSize: 32, fontWeight: '800', color: '#127150', textAlign: 'center', marginBottom: 10 },
  titleSpan: { color: '#052e16' },
  heroDesc: { color: '#052e16', fontSize: 15, textAlign: 'center', opacity: 0.9, maxWidth: 500, lineHeight: 22 },
  stats: {
    backgroundColor: '#052e16',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 25,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(106, 253, 106, 0.2)',
  },
  stat: { alignItems: 'center' },
  statNumber: { color: '#6afd6a', fontSize: 32, fontWeight: '800', marginBottom: 4 },
  statText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  beneficios: { padding: 20, backgroundColor: '#ecfdf5', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#127150', marginBottom: 20, textAlign: 'center' },
  beneficiosGrid: { gap: 15 },
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
  iconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(106, 253, 106, 0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  iconEmoji: { fontSize: 20 },
  beneficioTitle: { fontSize: 18, fontWeight: 'bold', color: '#127150', marginBottom: 6 },
  beneficioDesc: { fontSize: 14, color: '#475569', lineHeight: 20 },
});
