import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/context/CartContext";
import CartPanel from "./src/components/CartPanel";
import DrawerNavigator from "./src/Navigation/DrawerNavigation";

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      
      {/* El modal deslizable del carrito se renderiza aquí */}
      <CartPanel />
    </CartProvider>
  );
}