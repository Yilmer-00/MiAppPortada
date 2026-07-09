import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import AppBar from "../components/AppBar";

import Tienda from "../screens/StoreScreen";
import Descuentos from "../screens/DiscountsScreen";
import Configuracion from "../screens/ConfigurationScreen";
import HomeScreen from "../screens/HomeScreen";
import Ayuda from "../screens/HelpScreen";
import Nuevo from "../screens/NewScreen";

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
    </Drawer.Navigator>
  );
}
