import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import FloatingCart from "../components/CarritoC/FloatingCart";


export default function StoreScreen() {
    return (
        <View>
            <Text>Pagina Tienda</Text>
            <FloatingCart />

        </View>
    );
}