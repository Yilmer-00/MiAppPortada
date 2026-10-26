import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import SellerHeader from "../components/SellerHeader";
import CustomDrawerContent from "../components/CustomDrawerContent";

// --- PANTALLAS DEL DRAWER ---
import SellerProfile from "../screens/seller/profile/SellerProfileScreen";
import Dashboard from "../screens/seller/inicio/Dashboard";
import Facturas from "../screens/seller/factura/FacturasScreen";
import FacturaDetalle from "../screens/seller/factura/FacturaDetalleScreen"
import Productos from "../screens/seller/Productos/ProductosScreen";
import Pedidos from "../screens/seller/pedidos/PedidosScreen";
import PedidoDetalleScreen from "../screens/seller/pedidos/PedidoDetalleScreen";
// import Ventas from "../screens/seller/ventas/VentasScreen";
import CrearProductoScreen from "../screens/seller/Productos/CrearProductoScreen";
import EditarProductoScreen from "../screens/seller/Productos/EditarProductoScreen";
import ConfiguracionScreen from "../screens/seller/configuracion/ConfiguracionScreen";
import Soporte from "../screens/seller/soporte/SellerSupportScreen";
import CrarFactura from "../screens/seller/factura/CrearFacturaScreen";
import ListaFacturasScreen from "../screens/seller/factura/ListaFacturasScreen";
import EditarTiendaScreen from "../screens/seller/configuracion/EditarTiendaScreen"
// import inicio from "../screens/auth/LoadingScreen"
// --- NAVEGACIÓN Y PANTALLAS OCULTAS ---
import FacturasStack from "../Navigation/FacturasStack";
const Drawer = createDrawerNavigator();

export default function SellerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: () => <SellerHeader title="Nutrick Vendedor" />,
        drawerActiveBackgroundColor: "#e5f1e9",
        drawerActiveTintColor: "#137333",
        drawerInactiveTintColor: "#333333",
        drawerStyle: {
          backgroundColor: "#ffffff",
          width: 280,
        },
      }}
    >
      {/* Rutas principales con sus iconos nativos */}
      <Drawer.Screen
        name="Inicio"
        component={Dashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Facturas"
        component={Facturas}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Productos"
        component={Productos}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Pedidos"
        component={Pedidos}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Ventas"
        component={Ventas}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      /> */}
      {/* Configuración la ocultamos del listado automático superior para ponerla abajo */}
      <Drawer.Screen
        name="Configuración"
        component={ConfiguracionScreen}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Soporte"
        component={Soporte}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      {/* <Drawer.Screen
        name="inicio"
        component={inicio}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      /> */}
      {/* Rutas ocultas del menú lateral */}
      <Drawer.Screen
        name="FacturasStack"
        component={FacturasStack}
        options={{
          title: "Facturas",
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="FacturaDetalle"
        component={FacturaDetalle}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="CrarFactura"
        component={CrarFactura}
        options={{
          title: "CrearFactura",
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="ListaFacturasScreen"
        component={ListaFacturasScreen}
        options={{
          title: "CrearFactura",
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="SellerProfile"
        component={SellerProfile}
        options={{
          title: "Perfil de Vendedor",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="EditarTiendaScreen"
        component={EditarTiendaScreen}
        options={{
          title: "Facturas",
          drawerItemStyle: { display: "none" },
        }}
      />

      {/* Rutas ocultas para gestión de Productos */}
      <Drawer.Screen
        name="CrearProductoScreen"
        component={CrearProductoScreen}
        options={{
          title: "Nuevo Producto",
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="EditarProductoScreen"
        component={EditarProductoScreen}
        options={{
          title: "Editar Producto",
          drawerItemStyle: { display: "none" },
        }}
      />
      
      <Drawer.Screen
        name="PedidoDetalleScreen"
        component={PedidoDetalleScreen}
        options={{
          title: "Detalle de Pedido",
          drawerItemStyle: { display: "none" },
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
}
