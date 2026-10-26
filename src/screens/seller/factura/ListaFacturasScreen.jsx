
import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

// Datos de ejemplo de facturas emitidas por el vendedor
const mockSellerInvoices = [
  {
    id: "201",
    client: "Juan Pérez",
    product: "Desarrollo de App",
    total: 150000,
    status: "Pendiente",
  },
  {
    id: "202",
    client: "María Gómez",
    product: "Mantenimiento Web",
    total: 50000,
    status: "Pagado",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);

export default function ListaFacturasScreen({ navigation }) {
  const paidCount = mockSellerInvoices.filter(
    (item) => item.status === "Pagado"
  ).length;

  const pendingCount = mockSellerInvoices.filter(
    (item) => item.status === "Pendiente"
  ).length;

  const totalAmount = mockSellerInvoices.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const handleBack = () => {
    // RUTA VACÍA: conecta aquí la pantalla anterior que necesites.
    // Ejemplo futuro: navigation.navigate("Dashboard");
  };

  const handleCreateInvoice = () => {
    navigation.navigate("CrearFactura");
  };

  const renderItem = ({ item, index }) => {
    const isPaid = item.status === "Pagado";

    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100).duration(350).springify()}
        className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
      >
        {/* Encabezado de la factura */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-green-50">
              <Ionicons
                name="document-text-outline"
                size={21}
                color="#15803D"
              />
            </View>

            <View className="flex-1">
              <Text className="text-xs font-medium text-gray-400">
                FACTURA EMITIDA
              </Text>
              <Text className="mt-0.5 text-base font-bold text-gray-900">
                #{item.id}
              </Text>
            </View>
          </View>

          <View
            className={`flex-row items-center rounded-full px-3 py-1.5 ${isPaid ? "bg-green-100" : "bg-amber-100"
              }`}
          >
            <Ionicons
              name={isPaid ? "checkmark-circle" : "time-outline"}
              size={14}
              color={isPaid ? "#15803D" : "#B45309"}
            />
            <Text
              className={`ml-1 text-xs font-bold ${isPaid ? "text-green-800" : "text-amber-800"
                }`}
            >
              {item.status}
            </Text>
          </View>
        </View>

        {/* Información del cliente */}
        <View className="mt-5">
          <View className="flex-row items-center">
            <Ionicons
              name="person-outline"
              size={17}
              color="#6B7280"
            />
            <Text className="ml-2 text-sm font-semibold text-gray-800">
              {item.client}
            </Text>
          </View>

          <View className="mt-2 flex-row items-start">
            <Ionicons
              name="cube-outline"
              size={17}
              color="#9CA3AF"
            />
            <Text className="ml-2 flex-1 text-sm leading-5 text-gray-500">
              {item.product}
            </Text>
          </View>
        </View>

        {/* Separador */}
        <View className="my-4 h-px bg-gray-100" />

        {/* Total y acciones */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Importe total
            </Text>
            <Text className="mt-1 text-xl font-bold text-green-800">
              {formatCurrency(item.total)}
            </Text>
          </View>

          <Pressable
            onPress={() => {
              // Conecta aquí el detalle de la factura si lo necesitas.
              // navigation.navigate("VendedorInvoiceDetail", {
              //   invoiceId: item.id,
              // });
            }}
            accessibilityRole="button"
            accessibilityLabel={`Ver factura ${item.id}`}
            className="flex-row items-center rounded-xl border border-green-200 bg-green-50 px-4 py-3 active:bg-green-100"
          >
            <Text className="text-sm font-bold text-green-800">
              Ver detalle
            </Text>
            <Ionicons
              name="chevron-forward"
              size={17}
              color="#166534"
              style={{ marginLeft: 5 }}
            />
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F9FAFB"
      />

      {/* Cabecera */}
      <Animated.View
        entering={FadeInUp.duration(400)}
        className="px-5 pb-5 pt-3"
      >
        <View className="mb-5 flex-row items-center justify-between">
          {/* Botón volver con ruta pendiente */}
          <Pressable
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="Volver"
            className="h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white active:bg-gray-100"
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color="#166534"
            />
          </Pressable>

          <View className="ml-3 flex-1">
            <Text className="text-xs font-bold uppercase tracking-widest text-green-700">
              PANEL DEL VENDEDOR
            </Text>
            <Text className="mt-1 text-sm text-gray-500">
              Gestión de ventas
            </Text>
          </View>

          <Pressable
            onPress={handleCreateInvoice}
            accessibilityRole="button"
            className="flex-row items-center rounded-xl bg-green-700 px-3 py-3 active:bg-green-800"
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text className="ml-1 text-sm font-bold text-white">
              Nueva
            </Text>
          </Pressable>
        </View>

        <Text className="text-3xl font-bold tracking-tight text-gray-900">
          Facturas emitidas
        </Text>
        <Text className="mt-2 text-sm leading-5 text-gray-500">
          Consulta los importes y el estado de tus ventas.
        </Text>
      </Animated.View>

      {/* Resumen de facturas */}
      <View className="mx-5 mb-5 rounded-2xl bg-green-800 p-4">
        <Text className="text-sm font-medium text-green-100">
          Importe total registrado
        </Text>

        <Text className="mt-1 text-2xl font-bold text-white">
          {formatCurrency(totalAmount)}
        </Text>

        <View className="mt-4 flex-row">
          <View className="mr-3 flex-1 rounded-xl bg-white/10 p-3">
            <Text className="text-xs text-green-100">
              Pagadas
            </Text>
            <Text className="mt-1 text-xl font-bold text-white">
              {paidCount}
            </Text>
          </View>

          <View className="flex-1 rounded-xl bg-white/10 p-3">
            <Text className="text-xs text-green-100">
              Pendientes
            </Text>
            <Text className="mt-1 text-xl font-bold text-white">
              {pendingCount}
            </Text>
          </View>
        </View>
      </View>

      {/* Título de listado */}
      <View className="mb-3 flex-row items-center justify-between px-5">
        <Text className="text-base font-bold text-gray-900">
          Listado de facturas
        </Text>
        <Text className="text-xs font-medium text-gray-500">
          {mockSellerInvoices.length} registros
        </Text>
      </View>

      {/* Lista */}
      <FlatList
        data={mockSellerInvoices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 4,
          paddingBottom: 28,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <View className="items-center rounded-2xl border border-gray-100 bg-white px-6 py-12">
            <View className="h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
              <Ionicons
                name="receipt-outline"
                size={30}
                color="#15803D"
              />
            </View>
            <Text className="mt-4 text-base font-bold text-gray-800">
              Aún no tienes facturas
            </Text>
            <Text className="mt-2 text-center text-sm leading-5 text-gray-500">
              Las facturas que emitas aparecerán aquí.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
