import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreHomeScreen from "./tienda/HomeScreen";
import CategoryDetailScreen from "./tienda/CategoryDetailScreen";
import ProductDetailScreen from "./tienda/ProductDetailScreen";

const Stack = createNativeStackNavigator();

export default function StoreScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: "#2E7D32",
                headerTitleStyle: { fontWeight: "bold" },
            }}
        >
            <Stack.Screen
                name="StoreHome"
                component={StoreHomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CategoryDetail"
                component={CategoryDetailScreen}
                options={({ route }) => ({
                    title: route.params?.titulo || "Categoría",
                })}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ title: "Detalle del producto" }}
            />
        </Stack.Navigator>
    );
}