import { createDrawerNavigator } from '@react-navigation/drawer';
import SellerHeader from '../components/SellerHeader';
//inicio - Dashboard
import Dashboard from '../screens/seller/Dashboard';

//facturas
import Productos from '../screens/seller/Productos/ProductosScreen';

//facturas
import FacturasStack from '../Navigation/FacturasStack';
import FacturaDetalleScreen from '../screens/seller/Dashboard';
import Facturas from '../screens/seller/factura/FacturasScreen';

//pedidos
import Pedidos from '../screens/seller/pedidos/PedidosScreen';

//ventas
import Ventas from '../screens/seller/ventas/VentasScreen';

//configuracion
import ConfiguracionScreen from '../screens/seller/configuracion/ConfiguracionScreen';

const Drawer = createDrawerNavigator();

export default function SellerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Inicio"
            screenOptions={{
                header: () => <SellerHeader title="Nutrick Vendedor" />,
                drawerActiveBackgroundColor: '#e5f1e9', // Estilo sutil similar al de tu imagen
                drawerActiveTintColor: '#137333',
                drawerInactiveTintColor: '#333333',
            }}
        >
            <Drawer.Screen name="Inicio" component={Dashboard} />
            <Drawer.Screen name="Facturas" component={Facturas} />
            <Drawer.Screen name="Productos" component={Productos} />
            <Drawer.Screen name="Pedidos" component={Pedidos} />
            <Drawer.Screen name="Ventas" component={Ventas} />
            <Drawer.Screen name="Configuración" component={ConfiguracionScreen} />
            {/* <Drawer.Screen name="Productos" component={ProductosScreen} /> */}
            {/* <Drawer.Screen name="Pedidos" component={PedidosScreen} /> */}
            {/* <Drawer.Screen name="Clientes" component={ClientesScreen} /> */}
            {/* <Drawer.Screen name="Ventas" component={VentasScreen} /> */}
            {/* <Drawer.Screen name="Configuración" component={ConfiguracionScreen} /> */}

            <Drawer.Screen 
                name="FacturasStack" 
                component={FacturasStack} 
                options={{ 
                    title: 'Facturas',
                     drawerItemStyle: { display: 'none' } // Esto es lo que verá el usuario en el menú hamburguesa
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