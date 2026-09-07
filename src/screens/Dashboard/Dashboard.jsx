import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform, } from 'react-native';
import { LineChart, PieChart } from 'react-native-gifted-charts';
import DateTimePicker from '@react-native-community/datetimepicker';
import Footer from "../../components/Footer";
import TopHeader from "../../components/TopHeader";

const { width } = Dimensions.get('window');

// --- DATOS DE PRUEBA ---
const lineData = [
    { value: 720, label: '19/08' },
    { value: 580, label: '20/08' },
    { value: 640, label: '21/08' },
    { value: 520, label: '22/08' },
    { value: 710, label: '23/08' },
    { value: 610, label: '24/08' },
    { value: 380, label: '25/08' },
    { value: 730, label: '26/08' },
    { value: 700, label: '27/08' },
    { value: 880, label: '28/08' },
];

const pieData = [
    { value: 40, color: '#2e7d32', text: '40%' },
    { value: 25, color: '#3a72a2', text: '25%' },
    { value: 20, color: '#f5b025', text: '20%' },
    { value: 15, color: '#82c384', text: '15%' },
];

const ventasRecientes = [
    { id: '#1052', cliente: 'Ana Martínez', fecha: '25/08/2026', total: '$ 180.000', estado: 'Completado' },
    { id: '#1051', cliente: 'Carlos López', fecha: '25/08/2026', total: '$ 320.000', estado: 'Enviado' },
    { id: '#1050', cliente: 'Lucía Gómez', fecha: '24/08/2026', total: '$ 95.000', estado: 'Pendiente' },
    { id: '#1049', cliente: 'Diego Ruiz', fecha: '24/08/2026', total: '$ 210.000', estado: 'Completado' },
];

const productosTop = [
    { nombre: 'Proteína Whey Isolate 1kg', categoria: 'Proteínas', vendidos: '142 unids', total: '$ 4.260.000' },
    { nombre: 'Mantequilla de Maní', categoria: 'Snacks', vendidos: '98 unids', total: '$ 1.470.000' },
    { nombre: 'Multivitamínico Fit', categoria: 'Vitaminas', vendidos: '76 unids', total: '$ 1.140.000' },
];

export default function Dashboard() {
    const [fechaInicio, setFechaInicio] = useState(new Date(2026, 7, 1));  // 01/08/2026
    const [fechaFin, setFechaFin] = useState(new Date(2026, 7, 25));       // 25/08/2026

    const [mostrarPicker, setMostrarPicker] = useState(false);
    const [modoPicker, setModoPicker] = useState('inicio');

    const formatearFecha = (fecha) => {
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}/${mes}/${anio}`;
    };
    const alCambiarFecha = (event, fechaSeleccionada) => {
        if (event.type === 'dismissed') {
            setMostrarPicker(false);
            return;
        }

        const fechaActual = fechaSeleccionada || (modoPicker === 'inicio' ? fechaInicio : fechaFin);

        if (Platform.OS === 'android') {
            setMostrarPicker(false);
        }

        if (modoPicker === 'inicio') {
            setFechaInicio(fechaActual);
            // Al elegir inicio en Android, abre automáticamente el selector para la fecha fin
            if (Platform.OS === 'android') {
                setTimeout(() => {
                    setModoPicker('fin');
                    setMostrarPicker(true);
                }, 300);
            } else {
                setModoPicker('fin');
            }
        } else {
            setFechaFin(fechaActual);
            setMostrarPicker(false);
            setModoPicker('inicio');
        }
    };
    return (

        <SafeAreaView style={styles.safeArea}>
            <TopHeader />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.title}>Panel de Vendedor</Text>
                        <Text style={styles.subtitle}>Resumen general de tu tienda</Text>
                    </View>

                    {/* Botón táctil para seleccionar fecha */}
                    <TouchableOpacity
                        style={styles.dateBadge}
                        activeOpacity={0.7}
                        onPress={() => {
                            setModoPicker('inicio');
                            setMostrarPicker(true);
                        }}
                    >
                        <Text style={styles.dateText}>
                            📅 {formatearFecha(fechaInicio)} - {formatearFecha(fechaFin)}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* COMPONENTE SELECTOR DE FECHA */}
                {mostrarPicker && (
                    <DateTimePicker
                        value={modoPicker === 'inicio' ? fechaInicio : fechaFin}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={alCambiarFecha}
                    />
                )}

                {/* TARJETAS KPI (GRID 2x2) */}
                <View style={styles.kpiGrid}>
                    <View style={styles.kpiCard}>
                        <Text style={styles.kpiLabel}>Ventas totales</Text>
                        <Text style={styles.kpiValue}>$ 8.450.000</Text>
                        <Text style={styles.kpiTrend}>▲ 12.5% vs último mes</Text>
                    </View>

                    <View style={styles.kpiCard}>
                        <Text style={styles.kpiLabel}>Pedidos</Text>
                        <Text style={styles.kpiValue}>152</Text>
                        <Text style={styles.kpiTrend}>▲ 8.2% vs último mes</Text>
                    </View>

                    <View style={styles.kpiCard}>
                        <Text style={styles.kpiLabel}>Clientes</Text>
                        <Text style={styles.kpiValue}>89</Text>
                        <Text style={styles.kpiTrend}>▲ 15.3% vs último mes</Text>
                    </View>

                    <View style={styles.kpiCard}>
                        <Text style={styles.kpiLabel}>Productos</Text>
                        <Text style={styles.kpiValue}>120</Text>
                        <Text style={styles.kpiTrend}>▲ 5.1% vs último mes</Text>
                    </View>
                </View>

                {/* GRÁFICO 1: VENTAS POR DÍA */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Ventas por día</Text>
                    <View style={styles.chartContainer}>
                        <LineChart
                            data={lineData}
                            curved
                            thickness={2.5}
                            color="#2e7d32"
                            dataPointsColor="#2e7d32"
                            dataPointsRadius={4}
                            noOfSections={4}
                            yAxisLabelPrefix="$"
                            yAxisLabelSuffix="k"
                            yAxisTextStyle={{ color: '#777', fontSize: 10 }}
                            xAxisLabelTextStyle={{ color: '#777', fontSize: 10 }}
                            height={180}
                            width={width - 100}
                            initialSpacing={10}
                            spacing={28}
                            hideRules
                            isAnimated
                            animationDuration={1200}
                        />
                    </View>
                </View>

                {/* GRÁFICO 2: VENTAS POR CATEGORÍA */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Ventas por categoría</Text>
                    <View style={styles.pieRow}>
                        <PieChart
                            data={pieData}
                            donut={false}
                            radius={65}
                            isAnimated
                            animationDuration={1000}
                        />
                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: '#82c384' }]} />
                                <Text style={styles.legendText}>Bebidas (15%)</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: '#2e7d32' }]} />
                                <Text style={styles.legendText}>Proteínas (40%)</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: '#3a72a2' }]} />
                                <Text style={styles.legendText}>Snacks (25%)</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: '#f5b025' }]} />
                                <Text style={styles.legendText}>Vitaminas (20%)</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* TABLA: VENTAS RECIENTES */}
                <View style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardTitle}>Ventas recientes</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Ver todas</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ minWidth: 500 }}>
                            {/* Table Header */}
                            <View style={styles.tableRowHeader}>
                                <Text style={[styles.th, { width: 60 }]}>Pedido</Text>
                                <Text style={[styles.th, { width: 100 }]}>Cliente</Text>
                                <Text style={[styles.th, { width: 90 }]}>Fecha</Text>
                                <Text style={[styles.th, { width: 90 }]}>Total</Text>
                                <Text style={[styles.th, { width: 90 }]}>Estado</Text>
                                <Text style={[styles.th, { width: 70 }]}>Factura</Text>

                            </View>

                            {/* Table Rows */}
                            {ventasRecientes.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tdBold, { width: 60 }]}>{item.id}</Text>
                                    <Text style={[styles.td, { width: 100 }]}>{item.cliente}</Text>
                                    <Text style={[styles.td, { width: 90 }]}>{item.fecha}</Text>
                                    <Text style={[styles.td, { width: 90 }]}>{item.total}</Text>
                                    <View style={{ width: 90 }}>
                                        <View style={[styles.badge, getBadgeStyle(item.estado)]}>
                                            <Text style={[styles.badgeText, getBadgeTextStyle(item.estado)]}>
                                                {item.estado}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* 3. Evento onPress configurado enviando los datos del item */}
                                    <TouchableOpacity
                                        style={styles.facturaBtn}
                                        onPress={() => navigation.navigate('FacturasStack', { pedidoId: item.id, pedido: item })}
                                    >
                                        <Text style={styles.facturaBtnText}>ver factura</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* TABLA: PRODUCTOS MÁS VENDIDOS */}
                <View style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardTitle}>Productos más vendidos</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Ver reporte</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ minWidth: 450 }}>
                            <View style={styles.tableRowHeader}>
                                <Text style={[styles.th, { width: 150 }]}>Producto</Text>
                                <Text style={[styles.th, { width: 90 }]}>Categoría</Text>
                                <Text style={[styles.th, { width: 90 }]}>Vendidos</Text>
                                <Text style={[styles.th, { width: 100 }]}>Total</Text>
                            </View>

                            {productosTop.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tdBold, { width: 150 }]}>{item.nombre}</Text>
                                    <View style={{ width: 90 }}>
                                        <View style={styles.categoryTag}>
                                            <Text style={styles.categoryTagText}>{item.categoria}</Text>
                                        </View>
                                    </View>
                                    <Text style={[styles.td, { width: 90 }]}>{item.vendidos}</Text>
                                    <Text style={[styles.td, { width: 100 }]}>{item.total}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                <Footer />
            </ScrollView>

        </SafeAreaView>
    );
}

// Auxiliares para badges de estado
const getBadgeStyle = (estado) => {
    switch (estado) {
        case 'Completado': return { backgroundColor: '#e8f5e9' };
        case 'Enviado': return { backgroundColor: '#e3f2fd' };
        default: return { backgroundColor: '#fff8e1' };
    }
};

const getBadgeTextStyle = (estado) => {
    switch (estado) {
        case 'Completado': return { color: '#2e7d32' };
        case 'Enviado': return { color: '#1976d2' };
        default: return { color: '#f57f17' };
    }
};

// --- ESTILOS EN REACT NATIVE ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    headerRow: {
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 13,
        color: '#6c757d',
        marginTop: 2,
    },
    dateBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
    },
    dateText: {
        fontSize: 12,
        color: '#495057',
    },
    kpiGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    kpiCard: {
        width: '48%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eaeaea',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    kpiLabel: {
        fontSize: 12,
        color: '#6c757d',
    },
    kpiValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111111',
        marginVertical: 6,
    },
    kpiTrend: {
        fontSize: 11,
        fontWeight: '600',
        color: '#2e7d32',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#eaeaea',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 12,
    },
    linkText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2e7d32',
    },
    chartContainer: {
        alignItems: 'center',
        paddingRight: 10,
    },
    pieRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    legendContainer: {
        justifyContent: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    legendText: {
        fontSize: 12,
        color: '#495057',
    },
    tableRowHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#edf2f7',
        paddingBottom: 8,
        marginBottom: 8,
    },
    th: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6c757d',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f8f9fa',
        paddingVertical: 10,
    },
    td: {
        fontSize: 12,
        color: '#333333',
    },
    tdBold: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#111111',
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '600',
    },
    facturaBtn: {
        backgroundColor: '#d7f5dd',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    facturaBtnText: {
        fontSize: 10,
        color: '#1e5e22',
        fontWeight: '600',
    },
    categoryTag: {
        backgroundColor: '#f1f3f5',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    categoryTagText: {
        fontSize: 10,
        color: '#495057',
    },
});