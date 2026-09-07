import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

export default function SalesScreen() {
  // Estados para datos en tiempo real
  const [ventasTotales, setVentasTotales] = useState(8450000);
  const [ganancias, setGanancias] = useState(3120000);
  const [pedidos, setPedidos] = useState(152);
  const [ticketPromedio, setTicketPromedio] = useState(55590);
  
  // Estado para simular agregar una nueva venta en tiempo real
  const [nuevoMonto, setNuevoMonto] = useState('');
  const [cargando, setCargando] = useState(false);

  // Simulación de actualización automática en tiempo real cada 10 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      // Simula fluctuación o llegada de un nuevo pedido automático
      const incrementoVenta = Math.floor(Math.random() * 50000) + 10000;
      setVentasTotales((prev) => prev + incrementoVenta);
      setGanancias((prev) => Math.round(prev + incrementoVenta * 0.4));
      setPedidos((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  // Función para registrar una venta en tiempo real
  const registrarVentaRealTime = () => {
    if (!nuevoMonto || isNaN(nuevoMonto)) {
      alert('Por favor ingresa un monto válido.');
      return;
    }

    setCargando(true);
    setTimeout(() => {
      const valor = parseFloat(nuevoMonto);
      setVentasTotales((prev) => prev + valor);
      setGanancias((prev) => Math.round(prev + valor * 0.4));
      setPedidos((prev) => prev + 1);
      setTicketPromedio(Math.round((ventasTotales + valor) / (pedidos + 1)));
      setNuevoMonto('');
      setCargando(false);
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* ENCABEZADO */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Ventas y estadísticas</Text>
            <Text style={styles.subtitle}>Analiza el rendimiento de tu tienda en tiempo real ⚡</Text>
          </View>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>En Vivo / Real-Time</Text>
          </View>
        </View>

        {/* TARJETAS SUPERIORES (KPIs) */}
        <View style={styles.kpiContainer}>
          
          <View style={styles.kpiCard}>
            <Text style={styles.kpiTitle}>Ventas totales</Text>
            <Text style={styles.kpiValue}>$ {ventasTotales.toLocaleString()}</Text>
            <Text style={styles.kpiGrowth}>▲ 12.5% vs último mes</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiTitle}>Ganancias</Text>
            <Text style={styles.kpiValue}>$ {ganancias.toLocaleString()}</Text>
            <Text style={styles.kpiGrowth}>▲ 10.3% vs último mes</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiTitle}>Pedidos</Text>
            <Text style={styles.kpiValue}>{pedidos}</Text>
            <Text style={styles.kpiGrowth}>▲ 8.2% vs último mes</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiTitle}>Ticket promedio</Text>
            <Text style={styles.kpiValue}>$ {ticketPromedio.toLocaleString()}</Text>
            <Text style={styles.kpiGrowth}>▲ 6.1% vs último mes</Text>
          </View>

        </View>

        {/* SIMULADOR / REGISTRO EN TIEMPO REAL */}
        <View style={styles.simulatorCard}>
          <Text style={styles.sectionHeader}>Simular Nueva Venta (En Vivo)</Text>
          <View style={styles.simRow}>
            <TextInput
              style={styles.input}
              placeholder="Monto de la venta (Ej. 65000)"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              value={nuevoMonto}
              onChangeText={setNuevoMonto}
            />
            <TouchableOpacity style={styles.simButton} onPress={registrarVentaRealTime} disabled={cargando}>
              {cargando ? <ActivityIndicator color="#052e16" /> : <Text style={styles.simButtonText}>Registrar Venta</Text>}
            </TouchableOpacity>
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
              <View style={styles.donutRing}>
                <View style={styles.donutCenter}>
                  <Text style={styles.donutCenterText}>Nutrick</Text>
                </View>
              </View>

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
    backgroundColor: '#ecfdf5', // --fondo-suave
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
    color: '#127150',
  },
  subtitle: {
    fontSize: 14,
    color: '#052e16',
    marginTop: 2,
  },
  dateBadge: {
    backgroundColor: 'rgba(106, 253, 106, 0.2)',
    borderWidth: 1,
    borderColor: '#127150',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#127150',
    fontWeight: 'bold',
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
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  kpiTitle: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
    marginBottom: 6,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#052e16',
    marginBottom: 6,
  },
  kpiGrowth: {
    fontSize: 11,
    color: '#127150',
    fontWeight: '700',
  },
  simulatorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.15)',
    marginBottom: 20,
  },
  simRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: 200,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#052e16',
    fontSize: 15,
  },
  simButton: {
    backgroundColor: '#6afd6a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simButtonText: {
    color: '#052e16',
    fontWeight: 'bold',
    fontSize: 15,
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
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.15)',
  },
  categoryCard: {
    flex: 1.5,
    minWidth: 260,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.15)',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#127150',
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
    borderTopColor: '#6afd6a',
    borderRightColor: '#aecba8',
    borderBottomColor: '#052e16',
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
    color: '#052e16',
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
