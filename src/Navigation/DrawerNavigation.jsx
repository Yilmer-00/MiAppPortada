import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import AppBar from "../components/AppBar";

import SalesScreen from "../components/SalesScreen";
import { VentasMensualesScreen } from "../components/VentasMensualesScreen";
import { GraficasScreen } from "../components/GraficasScreen";
import { VentasPorFechaScreen } from "../components/VentasPorFechaScreen";
import { ProductosMasVendidosScreen } from "../components/ProductosMasVendidosScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: ({ navigation, route }) => <AppBar navigation={navigation} title={route.name} />,
      }}
    >
      <Drawer.Screen name="💰 Ventas e Ingresos" component={SalesScreen} />
      <Drawer.Screen name="📅 Ventas Mensuales" component={VentasMensualesScreen} />
      <Drawer.Screen name="📊 Gráficas" component={GraficasScreen} />
      <Drawer.Screen name="🔍 Ventas por Fecha" component={VentasPorFechaScreen} />
      <Drawer.Screen name="🏆 Productos Más Vendidos" component={ProductosMasVendidosScreen} />
    </Drawer.Navigator>
  );
}
