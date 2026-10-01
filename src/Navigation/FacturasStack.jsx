import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FacturasScreen from '../screens/client/FacturasScreen';
import FacturaDetalleScreen from '../screens/client/FacturaDetalleScreen';

const Stack = createNativeStackNavigator();

export default function FacturasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FacturasList" component={FacturasScreen} />
      <Stack.Screen name="FacturaDetalle" component={FacturaDetalleScreen} />
    </Stack.Navigator>
  );
}