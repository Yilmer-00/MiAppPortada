import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// 1. TUS PANTALLAS
function PortadaScreen({ navigation }) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let value = 0;
    const animate = () => {
      value += 0.03;
      floatAnim.setValue(Math.sin(value) * 15); // amplitud
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/nutrick.png')}
        style={[
          styles.logo,
          {
            transform: [{ translateY: floatAnim }],
          },
        ]}
        resizeMode="contain"
      />

      {/* NUESTRO BOTÓN CON NAVEGABILIDAD */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Pantalla de Inicio (Home) provisional para probar
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>¡Bienvenido a Nutrik Home! 🍏</Text>
    </View>
  );
}

// 2. CONFIGURACIÓN DE LA NAVEGACIÓN PRINCIPAL
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Portada" component={PortadaScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 3. ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 40, // Espacio para que el botón no quede encima del logo
  },
  button: {
    backgroundColor: '#4CAF50', // Puedes cambiarlo por el verde exacto de tu logo
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});