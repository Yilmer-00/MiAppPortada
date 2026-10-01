import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../screens/seller/Dashboard';
import FacturasStack from '../Navigation/FacturasStack';
// Importa también las pantallas secundarias a las que navega el Dashboard:
import FacturaDetalleScreen from '../screens/seller/Dashboard';
import SellerHeader from '../components/SellerHeader';

const Stack = createNativeStackNavigator();

export default function SellerNavigator() {
    return (
        <Stack.Navigator 
        screenOptions={{ header: () => <SellerHeader title="Nutrik Vendedor"/>}}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="FacturasStack" component={FacturasStack} />
            <Stack.Screen name="FacturaDetalleScreen" component={FacturaDetalleScreen} />
        </Stack.Navigator>
    );
}