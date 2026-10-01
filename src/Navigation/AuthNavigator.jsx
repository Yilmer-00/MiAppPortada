import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoadingScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: "Crear cuenta",
                }}
            />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />

        </Stack.Navigator>
    );
};

export default AuthNavigator;