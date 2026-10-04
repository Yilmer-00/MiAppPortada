import { createDrawerNavigator } from '@react-navigation/drawer';
import SellerHeader from '../components/SellerHeader';

// --- PANTALLAS DEL DRAWER ---
import Dashboard from '../screens/seller/inicio/Dashboard';
import Facturas from '../screens/seller/factura/FacturasScreen';
import Productos from '../screens/seller/Productos/ProductosScreen';
import Pedidos from '../screens/seller/pedidos/PedidosScreen';
import Ventas from '../screens/seller/ventas/VentasScreen';
import ConfiguracionScreen from '../screens/seller/configuracion/ConfiguracionScreen';

// --- NAVEGACIÓN Y PANTALLAS OCULTAS ---
import FacturasStack from '../Navigation/FacturasStack';
import FacturaDetalleScreen from '../screens/seller/inicio/Dashboard';

const Drawer = createDrawerNavigator();

export default function SellerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Inicio"
            screenOptions={{
                header: () => <SellerHeader title="Nutrick Vendedor" />,
                drawerActiveBackgroundColor: '#e5f1e9',
                drawerActiveTintColor: '#137333',
                drawerInactiveTintColor: '#333333',
                drawerStyle: {
                    backgroundColor: '#ffffff',
                },
            }}
        >
            {/* Rutas principales visibles en el menú */}
            <Drawer.Screen name="Inicio" component={Dashboard} />
            <Drawer.Screen name="Facturas" component={Facturas} />
            <Drawer.Screen name="Productos" component={Productos} />
            <Drawer.Screen name="Pedidos" component={Pedidos} />
            <Drawer.Screen name="Ventas" component={Ventas} />
            <Drawer.Screen name="Configuración" component={ConfiguracionScreen} />

            {/* Rutas ocultas del menú lateral */}
            <Drawer.Screen
                name="FacturasStack"
                component={FacturasStack}
                options={{
                    title: 'Facturas',
                    drawerItemStyle: { display: 'none' }
                }}
            />

            <Drawer.Screen
                name="FacturaDetalleScreen"
                component={FacturaDetalleScreen}
                options={{ drawerItemStyle: { display: 'none' } }}
            />
        </Drawer.Navigator>
    );
}