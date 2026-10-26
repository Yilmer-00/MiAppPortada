import React, { createContext, useContext, useState } from 'react';

const INITIAL_PEDIDOS = [
    {
        id: '1',
        numero: 'PED-1052',
        cliente: 'Ana Martínez',
        fecha: '25/08/2026',
        direccion: 'Cra. 12 #45-18, Bogotá',
        metodoPago: 'Contra entrega',
        total: '$ 182.000',
        subtotal: '$ 182.000',
        estado: 'Entregado',
        items: [
            { id: '101', nombre: 'Creatina Monohidratada', precioUnitario: '$85.000 c/u', subtotal: '$170.000', cantidad: 2, imagen: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100' },
            { id: '102', nombre: 'Yogur Griego Natural', precioUnitario: '$12.000 c/u', subtotal: '$12.000', cantidad: 1, imagen: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100' }
        ]
    },
    {
        id: '2',
        numero: 'PED-1053',
        cliente: 'Juan Pérez',
        fecha: '25/08/2026',
        direccion: 'Calle 5 #10-20, Popayán',
        metodoPago: 'Transferencia Nequi',
        total: '$ 150.000',
        subtotal: '$ 150.000',
        estado: 'Pendiente',
        items: [
            { id: '103', nombre: 'Proteína Whey', precioUnitario: '$150.000 c/u', subtotal: '$150.000', cantidad: 1, imagen: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100' }
        ]
    },
    {
        id: '3',
        numero: 'PED-1054',
        cliente: 'Pedro Gómez',
        fecha: '24/08/2026',
        direccion: 'Av. Panamericana #12-40',
        metodoPago: 'Tarjeta de Crédito',
        total: '$ 89.000',
        subtotal: '$ 89.000',
        estado: 'En preparación',
        items: [
            { id: '104', nombre: 'Vitamina C', precioUnitario: '$35.000 c/u', subtotal: '$35.000', cantidad: 1, imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100' }
        ]
    }
];

const PedidosContext = createContext();

export const PedidosProvider = ({ children }) => {
    const [pedidos, setPedidos] = useState(INITIAL_PEDIDOS);

    const cambiarEstadoPedido = (pedidoId, nuevoEstado) => {
        setPedidos((prev) =>
            prev.map((p) => (p.id === pedidoId ? { ...p, estado: nuevoEstado } : p))
        );
    };

    return (
        <PedidosContext.Provider value={{ pedidos, cambiarEstadoPedido }}>
            {children}
        </PedidosContext.Provider>
    );
};

export const usePedidos = () => {
    const context = useContext(PedidosContext);
    if (!context) {
        throw new Error('usePedidos debe usarse dentro de un PedidosProvider');
    }
    return context;
};