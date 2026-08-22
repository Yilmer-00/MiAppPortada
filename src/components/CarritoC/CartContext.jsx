import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);

      if (existe) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) =>
      prev.filter((producto) => producto.id !== id)
    );
  };

  const cambiarCantidad = (id, cantidad) => {
    setCarrito((prev) =>
      prev
        .map((producto) =>
          producto.id === id
            ? {
                ...producto,
                cantidad: producto.cantidad + cantidad,
              }
            : producto
        )
        .filter((producto) => producto.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalItems = useMemo(() => {
    return carrito.reduce(
      (acc, item) => acc + item.cantidad,
      0
    );
  }, [carrito]);

  const totalPrecio = useMemo(() => {
    return carrito.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
  }, [carrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        cambiarCantidad,
        vaciarCarrito,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);