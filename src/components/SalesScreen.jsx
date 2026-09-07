import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export default function SalesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* ENCABEZADO */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Ventas y estadísticas</Text>
            <Text style={styles.subtitle}>Analiza el rendimiento de tu tienda</Text>
          </View>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>01/08/2024 - 25/08/2024</Text>
          </View>
        </View>

        {/* TARJETAS SUPERIORES (KPIs) */}
        <View style={styles.kpiContainer}>
          
          <View style={styles.kpiCard}>
            <Text style={styles.kpiTitle}>Ventas totales</Text>
            <Text style={styles.kpiValue}>$ 8.450.000</Text>
            <Text style={styles.kpiGrowth}>▲ 12.5% vs último mes</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiTitle}>Ganancias</Text>
            <Text style={styles.kpiValue}>$ 3.120.000</Text>
            <Text style={styles.kpiGrowth}>▲ 10.3% vs último mes</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiTitle}>Pedidos</Text>
            <Text style={styles.kpiValue}>152</Text>
            <Text style={styles.kpiGrowth}>▲ 8.2% vs último mes</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiTitle}>Ticket promedio</Text>
            <Text style={styles.kpiValue}>$ 55.590</Text>
            <Text style={styles.kpiGrowth}>▲ 6.1% vs último mes</Text>
          </View>

        </View>

        {/* SECCIÓN INFERIOR (GRÁFICA Y CATEGORÍAS) */}
        <View style={styles.bottomSection}>
          
          {/* Gráfica de Ventas por día */}
          <View style={styles.chartCard}>
            <Text style={styles.sectionHeader}>Ventas por día</Text>
            <View style={styles.chartVisualContainer}>
              <View style={styles.yAxis}>
                <Text style={styles.axisText}>$1.200k</Text>
                <Text style={styles.axisText}>$900k</Text>
                <Text style={styles.axisText}>$600k</Text>
                <Text style={styles.axisText}>$300k</Text>
                <Text style={styles.axisText}>$0</Text>
              </View>
              <View style={styles.graphBody}>
                <View style={styles.graphLineMock}>
                  <div style={{width:'100%', height:'100%', position:'relative'}}>
                    {/* Línea simulada mediante puntos */}
                  </div>
                </View>
                <View style={styles.linePointsRow}>
                  <View style={styles.linePoint}><View style={styles.dot}/></View>
                  <View style={styles.linePoint}><View style={styles.dot}/></View>
                  <View style={styles.linePoint}><View style={styles.dot}/></View>
                  <View style={styles.linePoint}><View style={styles.dot}/></View>
                  <View style={styles.linePoint}><View style={styles.dot}/></View>
                  <View style={styles.linePoint}><View style={styles.dot}/></View>
                  <View style={styles.linePoint}><View style={styles.dot}/></View>
                  <View style={styles.linePoint}><View style={styles.dot}/></View>
                </View>
              </View>
            </View>
            <View style={styles.xAxis}>
              <Text style={styles.axisText}>19/08</Text>
              <Text style={styles.axisText}>20/08</Text>
              <Text style={styles.axisText}>21/08</Text>
              <Text style={styles.axisText}>22/08</Text>
              <Text style={styles.axisText}>23/08</Text>
              <Text style={styles.axisText}>24/08</Text>
              <Text style={styles.axisText}>25/08</Text>
            </View>
          </View>

          {/* Ventas por categoría (Donut y Leyenda) */}
          <View style={styles.categoryCard}>
            <Text style={styles.sectionHeader}>Ventas por categoría</Text>
            
            <View style={styles.donutContent}>
              {/* Círculo Dona Simulado */}
              <View style={styles.donutRing}>
                <View style={styles.donutCenter}>
                  <Text style={styles.donutCenterText}>Nutrick</Text>
                </View>
              </View>

              {/* Leyenda */}
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#127150' }]} />
                  <Text style={styles.legendText}>Proteínas — 40%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#2563eb' }]} />
                  <Text style={styles.legendText}>Snacks — 25%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
                  <Text style={styles.legendText}>Vitaminas — 20%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#fbbf24' }]} />
                  <Text style={styles.legendText}>Bebidas — 15%</Text>
                </View>
              </View>
            </View>

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Fondo limpio estilo dashboard
  },
  scrollContent: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  dateBadge: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  kpiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 20,
  },
  kpiCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  kpiTitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 6,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  kpiGrowth: {
    fontSize: 11,
    color: '#16a34a', // Verde positivo
    fontWeight: '600',
  },
  bottomSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  chartCard: {
    flex: 2,
    minWidth: 280,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryCard: {
    flex: 1.5,
    minWidth: 260,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 15,
  },
  chartVisualContainer: {
    flexDirection: 'row',
    height: 160,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 5,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: 8,
    alignItems: 'flex-end',
  },
  axisText: {
    fontSize: 10,
    color: '#94a3b8',
  },
  graphBody: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  linePointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  linePoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#127150',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#127150',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingLeft: 40,
  },
  donutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  donutRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 16,
    borderColor: '#127150',
    borderTopColor: '#2563eb',
    borderRightColor: '#f59e0b',
    borderBottomColor: '#fbbf24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutCenter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutCenterText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  legendContainer: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '500',
  },
});
