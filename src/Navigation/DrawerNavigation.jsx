import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import AppBar from "../components/AppBar";

import Tienda from "../screens/StoreScreen";
import Descuentos from "../screens/DiscountsScreen";
import Configuracion from "../screens/ConfigurationScreen";
import HomeScreen from "../screens/HomeScreen";
import Ayuda from "../screens/HelpScreen";
import Nuevo from "../screens/NewScreen";

import SalesScreen from "../components/SalesScreen";
import { VentasMensualesScreen } from "../components/VentasMensualesScreen";
import { GraficasScreen } from "../components/GraficasScreen";
import { VentasPorFechaScreen } from "../components/VentasPorFechaScreen";
import { ProductosMasVendidosScreen } from "../components/ProductosMasVendidosScreen";
import ContactMobile from "../components/ContactMobile";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: ({ navigation, route }) => <AppBar navigation={navigation} title={route.name} />,
      }}
    >
      <Drawer.Screen name="Inicio 🏠" component={HomeScreen} />
      <Drawer.Screen name="Tienda 🏪" component={Tienda} />
      <Drawer.Screen name="Nuevo 🆕" component={Nuevo} /> 
      <Drawer.Screen name="Descuentos 🏷️" component={Descuentos} />
      <Drawer.Screen name="Configuracion ⚙️" component={Configuracion} />
      <Drawer.Screen name="Ayuda ℹ️" component={Ayuda} />

      {/* Nuevos componentes de Ventas y Soporte */}
      <Drawer.Screen name="📊 Ventas e Ingresos" component={SalesScreen} />
      <Drawer.Screen name="📈 Ventas Mensuales" component={VentasMensualesScreen} />
      <Drawer.Screen name="📉 Gráficas" component={GraficasScreen} />
      <Drawer.Screen name="📅 Ventas por Fecha" component={VentasPorFechaScreen} />
      <Drawer.Screen name="🏆 Productos Más Vendidos" component={ProductosMasVendidosScreen} />
      <Drawer.Screen name="📞 Contacto Móvil" component={ContactMobile} />
    </Drawer.Navigator>
  );
}
