import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = (role, data = {}) => {
        const finalRole = (role || "cliente").toLowerCase();
        const email = (data.email || "").trim();

        if (!email) {
            return { ok: false, error: "El correo es obligatorio." };
        }

        const profile = {
            email,
            role: finalRole,
            name: data.nombreCompleto || data.primerNombre || "Usuario",
            ...data,
        };

        setUser(profile);

        return {
            ok: true,
            role: finalRole,
            user: profile,
        };
    };

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
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};