import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ImageBackground,
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { Link } from 'expo-router'; // Cambiar si usas React Navigation

import logo from '../assets/logoNutrick.png'; 
import fondo from '../assets/fondo.jpg'; // Tu imagen de fondo importada

export default function Login() {
  const handleLogin = () => {
    // Lógica para iniciar sesión
  };

  return (
    <ImageBackground source={fondo} style={styles.backgroundImage} resizeMode="cover">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* SECCIÓN SUPERIOR: BIENVENIDA */}
          <View style={styles.infoContent}>
            <Image source={logo} style={styles.loginLogo} resizeMode="contain" />
            <Text style={styles.welcomeText}>Equilibrio y salud</Text>
            <Text style={styles.subtitle}>Lleva una vida saludable con nosotros</Text>
          </View>

          {/* SECCIÓN INFERIOR: FORMULARIO TIPO TARJETA */}
          <View style={styles.loginFormSide}>
            <View style={styles.formContent}>
              <Text style={styles.formTitle}>Bienvenido de nuevo</Text>
              
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>¿No tienes cuenta? </Text>
                <Link href="/registro" style={styles.linkText}>Crea una ahora</Link>
              </View>
              
              {/* Campos de texto */}
              <View style={styles.inputField}>
                <TextInput 
                  placeholder="Correo electrónico" 
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputField}>
                <TextInput 
                  placeholder="Contraseña" 
                  placeholderTextColor="#999"
                  secureTextEntry
                  style={styles.input}
                />
              </View>
              
              {/* Botón de Iniciar Sesión */}
              <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                <Text style={styles.btnLoginText}>Iniciar sesión</Text>
              </TouchableOpacity>
              
              <div className="divider">
                <View style={styles.divider}>
                  <View style={styles.line} />
                  <Text style={styles.dividerText}>o continúa con</Text>
                  <View style={styles.line} />
                </View>
              </div>

              {/* Botón de Google */}
              <TouchableOpacity style={styles.btnGoogle} onPress={() => {}}>
                <Text style={styles.btnGoogleText}>Iniciar sesión con Google</Text>
              </TouchableOpacity>
              
              {/* ¿Olvidaste tu clave? */}
              <View style={styles.forgotContainer}>
                <Text style={styles.registerText}>¿Olvidaste tu clave? </Text>
                <Link href="/forgot-password" style={styles.linkText}>Haga clic aquí</Link>
              </View>

            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  infoContent: {
    alignItems: 'center',
    marginBottom: 25,
  },
  loginLogo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff', // Blanco para que resalte sobre el fondo de imagen
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 15,
    color: '#f0f0f0',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  loginFormSide: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Blanco semi-transparente estilo tarjeta
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  formContent: {
    width: '100%',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  registerText: {
    color: '#666',
    fontSize: 14,
  },
  linkText: {
    color: '#2e7d32', 
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputField: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  btnLogin: {
    backgroundColor: '#2e7d32',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  btnLoginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 14,
  },
  btnGoogle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  btnGoogleText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
});