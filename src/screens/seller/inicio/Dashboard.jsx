import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart, PieChart } from "react-native-gifted-charts";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Footer from "../../../components/Footer";

// -----------------------------------------------------------------------------
// DATOS DE PRUEBA. Sustituye estos arreglos por la respuesta de tu API cuando
// esté disponible. Los importes de los gráficos están expresados en miles.
// -----------------------------------------------------------------------------
const lineData = [
  { value: 720, label: "19/08" },
  { value: 580, label: "20/08" },
  { value: 640, label: "21/08" },
  { value: 520, label: "22/08" },
  { value: 710, label: "23/08" },
  { value: 610, label: "24/08" },
  { value: 380, label: "25/08" },
  { value: 730, label: "26/08" },
  { value: 700, label: "27/08" },
  { value: 880, label: "28/08" },
];

const pieData = [
  { value: 40, color: "#15803D", text: "40%" },
  { value: 25, color: "#3B82F6", text: "25%" },
  { value: 20, color: "#F59E0B", text: "20%" },
  { value: 15, color: "#86EFAC", text: "15%" },
];

const categorias = [
  { nombre: "Proteínas", porcentaje: 40, color: "#15803D" },
  { nombre: "Snacks", porcentaje: 25, color: "#3B82F6" },
  { nombre: "Vitaminas", porcentaje: 20, color: "#F59E0B" },
  { nombre: "Bebidas", porcentaje: 15, color: "#86EFAC" },
];

const ventasRecientes = [
  {
    id: "#1052",
    cliente: "Ana Martínez",
    fecha: "25/08/2026",
    total: "$ 180.000",
    estado: "Completado",
  },
  {
    id: "#1051",
    cliente: "Carlos López",
    fecha: "25/08/2026",
    total: "$ 320.000",
    estado: "Enviado",
  },
  {
    id: "#1050",
    cliente: "Lucía Gómez",
    fecha: "24/08/2026",
    total: "$ 95.000",
    estado: "Pendiente",
  },
  {
    id: "#1049",
    cliente: "Diego Ruiz",
    fecha: "24/08/2026",
    total: "$ 210.000",
    estado: "Completado",
  },
];

const productosTop = [
  {
    nombre: "Proteína Whey Isolate 1kg",
    categoria: "Proteínas",
    vendidos: "142 unids",
    total: "$ 4.260.000",
  },
  {
    nombre: "Mantequilla de Maní",
    categoria: "Snacks",
    vendidos: "98 unids",
    total: "$ 1.470.000",
  },
  {
    nombre: "Multivitamínico Fit",
    categoria: "Vitaminas",
    vendidos: "76 unids",
    total: "$ 1.140.000",
  },
];

const kpis = [
  {
    label: "Ventas totales",
    value: "$ 8.450.000",
    trend: "+12,5%",
    icon: "wallet-outline",
    tint: "bg-emerald-100",
    iconColor: "#047857",
  },
  {
    label: "Pedidos",
    value: "152",
    trend: "+8,2%",
    icon: "bag-check-outline",
    tint: "bg-blue-100",
    iconColor: "#2563EB",
  },
  {
    label: "Clientes",
    value: "89",
    trend: "+15,3%",
    icon: "people-outline",
    tint: "bg-violet-100",
    iconColor: "#7C3AED",
  },
  {
    label: "Productos",
    value: "120",
    trend: "+5,1%",
    icon: "cube-outline",
    tint: "bg-amber-100",
    iconColor: "#D97706",
  },
];

const formatearFecha = (fecha) => {
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}/${fecha.getFullYear()}`;
};

const inicioDelDia = (fecha) =>
  new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

const obtenerEstado = (estado) => {
  switch (estado) {
    case "Completado":
      return {
        badge: "bg-emerald-100",
        texto: "text-emerald-800",
        icon: "checkmark-circle",
      };
    case "Enviado":
      return {
        badge: "bg-blue-100",
        texto: "text-blue-800",
        icon: "car-outline",
      };
    default:
      return {
        badge: "bg-amber-100",
        texto: "text-amber-800",
        icon: "time-outline",
      };
  }
};

function SectionTitle({ title, subtitle, action, onAction }) {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <View className="flex-1 pr-3">
        <Text className="text-base font-bold text-slate-900">{title}</Text>
        {!!subtitle && (
          <Text className="mt-1 text-xs text-slate-500">{subtitle}</Text>
        )}
      </View>
      {!!action && (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.75}
          onPress={onAction}
          className="flex-row items-center rounded-full bg-emerald-50 px-3 py-2"
        >
          <Text className="text-xs font-bold text-emerald-800">{action}</Text>
          <Ionicons name="chevron-forward" size={14} color="#166534" />
        </TouchableOpacity>
      )}
    </View>
  );
}

function KpiCard({ item, index, animation }) {
  return (
    <Animated.View
      style={{
        opacity: animation,
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [18 + index * 2, 0],
            }),
          },
        ],
      }}
      className="mb-3 w-[48.2%] rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
    >
      <View className="mb-3 flex-row items-center justify-between">
        <View
          className={`h-10 w-10 items-center justify-center rounded-xl ${item.tint}`}
        >
          <Ionicons name={item.icon} size={21} color={item.iconColor} />
        </View>
        <View className="flex-row items-center rounded-full bg-emerald-50 px-2 py-1">
          <Ionicons name="trending-up" size={12} color="#047857" />
          <Text className="ml-1 text-[10px] font-bold text-emerald-700">
            {item.trend}
          </Text>
        </View>
      </View>
      <Text className="text-xs font-medium text-slate-500">{item.label}</Text>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        className="mt-1 text-xl font-extrabold tracking-tight text-slate-900"
      >
        {item.value}
      </Text>
      <Text className="mt-1 text-[10px] text-slate-400">
        vs. periodo anterior
      </Text>
    </Animated.View>
  );
}

export default function Dashboard() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [fechaInicio, setFechaInicio] = useState(new Date(2026, 7, 1));
  const [fechaFin, setFechaFin] = useState(new Date(2026, 7, 28));
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [modoPicker, setModoPicker] = useState("inicio");
  const [pickerTemporal, setPickerTemporal] = useState(new Date(2026, 7, 1));
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  const animaciones = useRef(kpis.map(() => new Animated.Value(0))).current;
  const entrada = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.stagger(
        100,
        animaciones.map((valor) =>
          Animated.spring(valor, {
            toValue: 1,
            useNativeDriver: true,
            tension: 55,
            friction: 8,
          }),
        ),
      ),
      Animated.timing(entrada, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animaciones, entrada]);

  const rangoFecha = `${formatearFecha(fechaInicio)} - ${formatearFecha(fechaFin)}`;
  const anchoGrafico = Math.max(250, Math.min(width - 72, 520));

  const ventasFiltradas = useMemo(() => {
    // Datos demo: se filtran por fecha cuando el formato de fecha coincide.
    const inicio = inicioDelDia(fechaInicio);
    const fin = inicioDelDia(fechaFin);
    return ventasRecientes.filter((venta) => {
      const [dia, mes, anio] = venta.fecha.split("/").map(Number);
      const fechaVenta = new Date(anio, mes - 1, dia);
      return fechaVenta >= inicio && fechaVenta <= fin;
    });
  }, [fechaInicio, fechaFin]);

  const abrirSelectorFecha = (modo) => {
    setModoPicker(modo);
    setPickerTemporal(modo === "inicio" ? fechaInicio : fechaFin);
    setMostrarPicker(true);
    setMostrarFiltro(false);
  };

  const alCambiarFecha = (event, fechaSeleccionada) => {
    if (Platform.OS === "android") setMostrarPicker(false);
    if (event?.type === "dismissed" || !fechaSeleccionada) return;

    const nuevaFecha = inicioDelDia(fechaSeleccionada);

    if (modoPicker === "inicio") {
      if (nuevaFecha > fechaFin) {
        setFechaFin(nuevaFecha);
      }
      setFechaInicio(nuevaFecha);
    } else {
      if (nuevaFecha < fechaInicio) {
        Alert.alert(
          "Rango de fechas inválido",
          "La fecha final no puede ser anterior a la fecha inicial.",
        );
        return;
      }
      setFechaFin(nuevaFecha);
    }
    setPickerTemporal(nuevaFecha);
  };

  const abrirFactura = (venta) => {
    try {
      navigation.navigate("FacturasStack", {
        screen: "FacturaDetalle",
        params: { factura: venta },
      });
    } catch (error) {
      Alert.alert(
        "Factura",
        "Verifica que las rutas FacturasStack y FacturaDetalle estén registradas en tu navegador.",
      );
    }
  };

  const mostrarRutaPendiente = (seccion) => {
    Alert.alert(
      `Sección: ${seccion}`,
      `El botón ya responde. Conecta aquí la ruta de ${seccion} cuando esté registrada en tu navegador.`,
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" style={{ flex: 1, height: '100%', overflow: 'hidden' }}>


      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 18,
          paddingBottom: 36,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <Animated.View
          style={{
            opacity: entrada,
            transform: [
              {
                translateY: entrada.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 0],
                }),
              },
            ],
          }}
          className="mb-5"
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <View className="mb-2 self-start rounded-full bg-emerald-100 px-3 py-1">
                <Text className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800">
                  Resumen de tu tienda
                </Text>
              </View>
              <Text className="text-2xl font-extrabold tracking-tight text-slate-900">
                ¡Hola, vendedor!
              </Text>
              <Text className="mt-1 text-sm leading-5 text-slate-500">
                Revisa el rendimiento de tu negocio de un vistazo.
              </Text>
            </View>
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 shadow-sm">
              <Ionicons name="storefront-outline" size={24} color="#FFFFFF" />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMostrarFiltro((actual) => !actual)}
            className="mt-4 flex-row items-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <Ionicons name="calendar-outline" size={20} color="#047857" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Periodo seleccionado
              </Text>
              <Text className="mt-1 text-xs font-bold text-slate-800">
                {rangoFecha}
              </Text>
            </View>
            <Ionicons
              name={mostrarFiltro ? "chevron-up" : "options-outline"}
              size={20}
              color="#64748B"
            />
          </TouchableOpacity>

          {mostrarFiltro && (
            <View className="mt-2 rounded-2xl border border-slate-100 bg-white p-3">
              <Text className="mb-2 text-xs font-semibold text-slate-600">
                Cambiar periodo
              </Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => abrirSelectorFecha("inicio")}
                  className="flex-1 flex-row items-center justify-center rounded-xl bg-slate-100 px-3 py-3"
                >
                  <Ionicons name="calendar-outline" size={16} color="#334155" />
                  <Text className="ml-2 text-xs font-semibold text-slate-700">
                    Desde: {formatearFecha(fechaInicio)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => abrirSelectorFecha("fin")}
                  className="flex-1 flex-row items-center justify-center rounded-xl bg-slate-100 px-3 py-3"
                >
                  <Ionicons name="calendar-outline" size={16} color="#334155" />
                  <Text className="ml-2 text-xs font-semibold text-slate-700">
                    Hasta: {formatearFecha(fechaFin)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Animated.View>

        {mostrarPicker && (
          <View className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3">
            <Text className="mb-2 text-sm font-bold text-slate-800">
              {modoPicker === "inicio"
                ? "Selecciona la fecha inicial"
                : "Selecciona la fecha final"}
            </Text>
            <DateTimePicker
              value={pickerTemporal}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              maximumDate={modoPicker === "inicio" ? fechaFin : undefined}
              minimumDate={modoPicker === "fin" ? fechaInicio : undefined}
              onChange={alCambiarFecha}
            />
            {Platform.OS === "ios" && (
              <TouchableOpacity
                onPress={() => setMostrarPicker(false)}
                className="mt-2 self-end rounded-xl bg-emerald-700 px-4 py-2"
              >
                <Text className="text-xs font-bold text-white">Listo</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Indicadores */}
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-base font-extrabold text-slate-900">
            Tu rendimiento
          </Text>
          <View className="flex-row items-center">
            <View className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500" />
            <Text className="text-[10px] font-medium text-slate-500">
              Datos de prueba
            </Text>
          </View>
        </View>
        <View className="mb-2 flex-row flex-wrap justify-between">
          {kpis.map((item, index) => (
            <KpiCard
              key={item.label}
              item={item}
              index={index}
              animation={animaciones[index]}
            />
          ))}
        </View>

        {/* Gráfico de ventas */}
        <View className="mb-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <SectionTitle
            title="Ventas por día"
            subtitle="Evolución diaria de las ventas"
          />
          <View className="mb-3 flex-row items-center">
            <Text className="text-2xl font-extrabold text-slate-900">
              $ 880k
            </Text>
            <View className="ml-3 flex-row items-center rounded-full bg-emerald-50 px-2 py-1">
              <Ionicons name="trending-up" size={12} color="#047857" />
              <Text className="ml-1 text-[10px] font-bold text-emerald-700">
                Tendencia positiva
              </Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={lineData}
              curved
              height={180}
              width={300}
              thickness={3}
              color="#15803D"
              dataPointsColor="#15803D"
              dataPointsRadius={4}
              noOfSections={4}
              yAxisLabelPrefix="$"
              yAxisLabelSuffix="k"
              yAxisTextStyle={{
                color: "#94A3B8",
                fontSize: 10,
              }}
              xAxisLabelTextStyle={{
                color: "#94A3B8",
                fontSize: 10,
              }}
              initialSpacing={10}
              spacing={28}
              hideRules
              isAnimated
              animationDuration={900}
            />
          </ScrollView>
          <Text className="mt-1 text-[10px] text-slate-400">
            Valores ilustrativos en miles de pesos colombianos.
          </Text>
        </View>

        {/* Categorías */}
        <View className="mb-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <SectionTitle
            title="Ventas por categoría"
            subtitle="Distribución de las ventas de ejemplo"
          />
          <View className="items-center">
            <PieChart
              data={pieData}
              donut
              radius={82}
              innerRadius={52}
              innerCircleColor="#FFFFFF"
              centerLabelComponent={() => (
                <View className="items-center">
                  <Text className="text-lg font-extrabold text-slate-900">
                    100%
                  </Text>
                  <Text className="text-[10px] text-slate-400">Categorías</Text>
                </View>
              )}
              isAnimated
              animationDuration={900}
            />
          </View>
          <View className="mt-4 flex-row flex-wrap justify-between">
            {categorias.map((categoria) => (
              <View
                key={categoria.nombre}
                className="mb-3 w-[48%] flex-row items-center"
              >
                <View
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: categoria.color }}
                />
                <View className="flex-1">
                  <Text className="text-xs font-semibold text-slate-700">
                    {categoria.nombre}
                  </Text>
                  <Text className="text-[10px] text-slate-400">
                    {categoria.porcentaje}% de las ventas
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Ventas recientes */}
        <View className="mb-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <SectionTitle
            title="Ventas recientes"
            subtitle={`${ventasFiltradas.length} pedidos en el rango seleccionado`}
            action="Ver todas"
            onAction={() => mostrarRutaPendiente("todas las ventas")}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator>
            <View>
              <View className="min-w-[570px] flex-row border-b border-slate-100 pb-3">
                {[
                  ["Pedido", "w-[70px]"],
                  ["Cliente", "w-[125px]"],
                  ["Fecha", "w-[100px]"],
                  ["Total", "w-[105px]"],
                  ["Estado", "w-[105px]"],
                  ["Factura", "w-[85px]"],
                ].map(([label, widthClass]) => (
                  <Text
                    key={label}
                    className={`${widthClass} text-[10px] font-bold uppercase tracking-wide text-slate-400`}
                  >
                    {label}
                  </Text>
                ))}
              </View>
              {ventasFiltradas.length === 0 ? (
                <View className="w-[570px] items-center py-8">
                  <Ionicons name="receipt-outline" size={26} color="#94A3B8" />
                  <Text className="mt-2 text-sm font-semibold text-slate-600">
                    No hay ventas en este periodo
                  </Text>
                  <Text className="mt-1 text-xs text-slate-400">
                    Prueba con otro rango de fechas.
                  </Text>
                </View>
              ) : (
                ventasFiltradas.map((venta) => {
                  const estado = obtenerEstado(venta.estado);
                  return (
                    <View
                      key={venta.id}
                      className="min-w-[570px] flex-row items-center border-b border-slate-50 py-3"
                    >
                      <Text className="w-[70px] text-xs font-extrabold text-slate-800">
                        {venta.id}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className="w-[125px] pr-2 text-xs text-slate-600"
                      >
                        {venta.cliente}
                      </Text>
                      <Text className="w-[100px] text-xs text-slate-500">
                        {venta.fecha}
                      </Text>
                      <Text className="w-[105px] text-xs font-bold text-slate-800">
                        {venta.total}
                      </Text>
                      <View className="w-[105px]">
                        <View
                          className={`self-start flex-row items-center rounded-full px-2 py-1 ${estado.badge}`}
                        >
                          <Ionicons
                            name={estado.icon}
                            size={11}
                            color={
                              venta.estado === "Completado"
                                ? "#166534"
                                : venta.estado === "Enviado"
                                  ? "#1D4ED8"
                                  : "#92400E"
                            }
                          />
                          <Text
                            className={`ml-1 text-[9px] font-bold ${estado.texto}`}
                          >
                            {venta.estado}
                          </Text>
                        </View>
                      </View>
                      <View className="w-[85px]">
                        <TouchableOpacity
                          accessibilityRole="button"
                          accessibilityLabel={`Ver factura del pedido ${venta.id}`}
                          activeOpacity={0.75}
                          onPress={() => abrirFactura(venta)}
                          className="self-start rounded-lg bg-emerald-700 px-2.5 py-2"
                        >
                          <Text className="text-[10px] font-bold text-white">
                            Ver factura
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              )}
            </View>
          </ScrollView>
        </View>

        {/* Productos destacados */}
        <View className="mb-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <SectionTitle
            title="Productos más vendidos"
            subtitle="Los productos destacados de tu tienda"
            action="Ver reporte"
            onAction={() => mostrarRutaPendiente("reporte de productos")}
          />
          {productosTop.map((producto, index) => (
            <View
              key={producto.nombre}
              className={`flex-row items-center py-3 ${index < productosTop.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <Ionicons name="leaf-outline" size={22} color="#047857" />
              </View>
              <View className="flex-1 pr-2">
                <Text
                  numberOfLines={2}
                  className="text-xs font-bold leading-5 text-slate-800"
                >
                  {producto.nombre}
                </Text>
                <View className="mt-1 self-start rounded-md bg-slate-100 px-2 py-1">
                  <Text className="text-[10px] font-semibold text-slate-500">
                    {producto.categoria}
                  </Text>
                </View>
                <Text className="mt-1 text-[10px] text-slate-400">
                  {producto.vendidos} vendidos
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-xs font-extrabold text-emerald-800">
                  {producto.total}
                </Text>
                <Text className="mt-1 text-[10px] text-slate-400">
                  Ingresos
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="mb-5 rounded-2xl bg-emerald-800 p-4">
          <View className="flex-row items-center">
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <Ionicons name="bulb-outline" size={23} color="#FFFFFF" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-extrabold text-white">
                Consejo para tu tienda
              </Text>
              <Text className="mt-1 text-xs leading-5 text-emerald-100">
                Revisa tus productos destacados y mantén actualizado su
                inventario.
              </Text>
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
