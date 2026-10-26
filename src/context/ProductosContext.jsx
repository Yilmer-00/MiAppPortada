import React, { createContext, useContext, useState } from "react";

const INITIAL_PRODUCTOS = [
  {
    id: "1",
    nombre: "Proteína Whey",
    categoria: "Proteínas",
    precio: 85000,
    stock: 45,
    estado: "Activo",
    imagen:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100",
  },
  {
    id: "2",
    nombre: "Barra de Proteína",
    categoria: "Snacks",
    precio: 6500,
    stock: 120,
    estado: "Activo",
    imagen:
      "https://images.unsplash.com/photo-1622484214376-78b172a6a160?w=100",
  },
  {
    id: "3",
    nombre: "Vitamina C",
    categoria: "Vitaminas",
    precio: 35000,
    stock: 80,
    estado: "Activo",
    imagen:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100",
  },
  {
    id: "4",
    nombre: "Avena en Hojuelas",
    categoria: "Granos",
    precio: 8900,
    stock: 60,
    estado: "Activo",
    imagen:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100",
  },
  {
    id: "5",
    nombre: "Aceite de Coco",
    categoria: "Saludable",
    precio: 28000,
    stock: 30,
    estado: "Inactivo",
    imagen:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100",
  },
];

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState(INITIAL_PRODUCTOS);

  const agregarProducto = (nuevoProducto) => {
    const productoConId = {
      ...nuevoProducto,
      id: Date.now().toString(),
    };
    setProductos((prev) => [productoConId, ...prev]);
  };

  const editarProducto = (id, productoActualizado) => {
    setProductos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...productoActualizado } : item,
      ),
    );
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ProductosContext.Provider
      value={{ productos, agregarProducto, editarProducto, eliminarProducto }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("useProductos debe usarse dentro de un ProductosProvider");
  }
  return context;
};
