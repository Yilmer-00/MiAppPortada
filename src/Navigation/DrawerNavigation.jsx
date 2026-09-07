import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import AppBar from "../components/AppBar";

import SalesScreen from "../components/SalesScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: ({ navigation, route }) => <AppBar navigation={navigation} title={route.name} />,
      }}
    >
      <Drawer.Screen name="📊 Ventas y estadísticas" component= {SalesScreen} />
    </Drawer.Navigator>
  );
}
