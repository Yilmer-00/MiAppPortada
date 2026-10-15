import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Pantallas de autenticación
import LoginScreen from "../screens/auth/LoadingScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import RegisterCliente from "../screens/auth/RegisterCliente/RegisterCliente";
import RegisterVendedor from "../screens/auth/RegisterVendedor/RegisterVendedor";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* Inicio de sesión */}
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />

            {/* Registro general */}
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />

            {/* Recuperación de contraseña */}
            <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
            />

            {/* Registro de cliente */}
            <Stack.Screen
                name="RegisterCliente"
                component={RegisterCliente}
            />

            {/* Registro de vendedor */}
            <Stack.Screen
                name="RegisterVendedor"
                component={RegisterVendedor}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
