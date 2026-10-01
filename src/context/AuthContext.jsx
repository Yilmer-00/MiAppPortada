import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Iniciar sesión
    const login = (email, password) => {

        // USUARIO CLIENTE DE PRUEBA
        if (
            email === "cliente@gmail.com" &&
            password === "123456"
        ) {
            setUser({
                email: email,
                name: "Cliente de prueba",
                role: "cliente",
            });

            return {
                success: true,
                role: "cliente",
            };
        }

        // USUARIO VENDEDOR DE PRUEBA
        if (
            email === "vendedor@gmail.com" &&
            password === "123456"
        ) {
            setUser({
                email: email,
                name: "Vendedor de prueba",
                role: "vendedor",
            });

            return {
                success: true,
                role: "vendedor",
            };
        }

        // Credenciales incorrectas
        return {
            success: false,
            message: "Correo o contraseña incorrectos",
        };
    };

    // Cerrar sesión
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};