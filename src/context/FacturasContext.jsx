import React, { createContext, useContext, useState } from 'react';

const INITIAL_FACTURAS = [
    {
        id: '1',
        numeroFactura: 'FAC-001',
        cliente: 'Juan Pérez',
        documentoCliente: '1061700111',
        fecha: '2026-10-24',
        total: '$ 91.500',
        estado: 'Pagada',
        items: [
            { id: '1', nombre: 'Proteína Whey', cantidad: 1, precioUnitario: '$ 85.000', subtotal: '$ 85.000' },
            { id: '2', nombre: 'Barra de Proteína', cantidad: 1, precioUnitario: '$ 6.500', subtotal: '$ 6.500' }
        ]
    },
    {
        id: '2',
        numeroFactura: 'FAC-002',
        cliente: 'María Gómez',
        documentoCliente: '1061700222',
        fecha: '2026-10-25',
        total: '$ 35.000',
        estado: 'Pendiente',
        items: [
            { id: '3', nombre: 'Vitamina C', cantidad: 1, precioUnitario: '$ 35.000', subtotal: '$ 35.000' }
        ]
    }
];

const FacturasContext = createContext();

export const FacturasProvider = ({ children }) => {
    const [facturas, setFacturas] = useState(INITIAL_FACTURAS);

    const crearFactura = (nuevaFactura) => {
        const facturaConId = {
            ...nuevaFactura,
            id: Date.now().toString(),
            numeroFactura: `FAC-00${facturas.length + 1}`,
            fecha: new Date().toISOString().split('T')[0],
        };
        setFacturas((prev) => [facturaConId, ...prev]);
    };

    return (
        <FacturasContext.Provider value={{ facturas, crearFactura }}>
            {children}
        </FacturasContext.Provider>
    );
};

export const useFacturas = () => {
    const context = useContext(FacturasContext);
    if (!context) {
        throw new Error('useFacturas debe usarse dentro de un FacturasProvider');
    }
    return context;
};