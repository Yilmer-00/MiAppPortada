import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Link } from 'expo-router'; // Cambia si usas React Navigation tradicional

import logo from '../assets/logoNutrick.png'; 

export default function Register() {
  // ESTADOS (Pizarrones de memoria)
  const [estatura, setEstatura] = useState("");
  const [peso, setPeso] = useState("");
  const [opcion, setOpcion] = useState("");
  const [otroDetalle, setOtroDetalle] = useState("");
  const [dieta, setDieta] = useState("");
  const [otroDieta, setOtroDieta] = useState("");
  
  // FUNCIONES (Los Secretarios)
  const manejarEstatura = (text) => {
    let valor = text.replace(/\D/g, ""); 
    if (valor.length > 1) {
      valor = valor.charAt(0) + "." + valor.slice(1, 3);
    }
    setEstatura(valor);
  };

  const manejarPeso = (text) => {
    let valor = text.replace(/\D/g, ""); 
    if (valor.length > 0) {
      valor = valor + " kg"; 
    }
    setPeso(valor);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.mainContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* CABECERA */}
        <View style={styles.headerRegistro}>
          <View style={styles.logoCircle}>
            <Link href="/">
              <Image source={logo} style={styles.logoImg} resizeMode="contain" />
            </Link>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Únete a Nutrik</Text>
            <Text style={styles.subtitle}>Tu plan comienza aquí 🌱</Text>
          </View>
        </View>

        {/* FORMULARIO */}
        <View style={styles.formContainer}>
          <View style={styles.cardRegistro}>
            <Text style={styles.cardTitle}>Crea tu Perfil</Text>
            
            <View style={styles.registerForm}>
              
              {/* Nombres */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Nombres</Text>
                <View style={styles.inputRow}>
                  <TextInput style={[styles.input, styles.halfInput]} placeholder="Primer Nombre" placeholderTextColor="#999" />
                  <TextInput style={[styles.input, styles.halfInput]} placeholder="Segundo Nombre" placeholderTextColor="#999" />
                </View>
              </View>

              {/* Apellidos */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Apellidos</Text>
                <View style={styles.inputRow}>
                  <TextInput style={[styles.input, styles.halfInput]} placeholder="Primer Apellido" placeholderTextColor="#999" />
                  <TextInput style={[styles.input, styles.halfInput]} placeholder="Segundo Apellido" placeholderTextColor="#999" />
                </View>
              </View>

              {/* Correo */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Correo electrónico</Text>
                <TextInput style={styles.input} placeholder="ejemplo@correo.com" placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none" />
              </View>

              {/* Edad y Actividad (Simulando selección rápida con botones para móvil) */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Edad y actividad</Text>
                <View style={styles.inputRow}>
                  <TextInput style={[styles.input, styles.halfInput]} placeholder="Edad" placeholderTextColor="#999" keyboardType="numeric" />
                  <TextInput style={[styles.input, styles.halfInput]} placeholder="Actividad (ej: Activo)" placeholderTextColor="#999" />
                </View>
              </View>

              {/* Alergias */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>¿Tienes alguna alergia o intolerancia?</Text>
                <View style={styles.optionsRow}>
                  {['gluten', 'lactosa', 'frutos-secos', 'otro'].map((item) => (
                    <TouchableOpacity 
                      key={item} 
                      style={[styles.optionChip, opcion === item && styles.optionChipSelected]}
                      onPress={() => setOpcion(item)}
                    >
                      <Text style={[styles.optionChipText, opcion === item && styles.optionChipTextSelected]}>
                        {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {opcion === 'otro' && (
                  <TextInput
                    style={[styles.input, { marginTop: 10 }]}
                    placeholder="Por favor, especifica cuál"
                    placeholderTextColor="#999"
                    value={otroDetalle}
                    onChangeText={setOtroDetalle}
                  />
                )}
              </View>

              {/* Alimentación especial */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>¿Sigues algún tipo de alimentación especial?</Text>
                <View style={styles.optionsRow}>
                  {['vegetariano', 'vegano', 'pescetariano', 'otro'].map((item) => (
                    <TouchableOpacity 
                      key={item} 
                      style={[styles.optionChip, dieta === item && styles.optionChipSelected]}
                      onPress={() => setDieta(item)}
                    >
                      <Text style={[styles.optionChipText, dieta === item && styles.optionChipTextSelected]}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {dieta === 'otro' && (
                  <TextInput
                    style={[styles.input, { marginTop: 10 }]}
                    placeholder="Por favor, especifica cuál"
                    placeholderTextColor="#999"
                    value={otroDieta}
                    onChangeText={setOtroDieta}
                  />
                )}
              </View>

              {/* Peso y Estatura */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Peso y estatura</Text>
                <View style={styles.inputRow}>
                  <TextInput 
                    style={[styles.input, styles.halfInput]} 
                    placeholder="Peso" 
                    placeholderTextColor="#999"
                    value={peso} 
                    onChangeText={manejarPeso} 
                    keyboardType="numeric"
                  />
                  <TextInput 
                    style={[styles.input, styles.halfInput]} 
                    placeholder="Estatura (cm)" 
                    placeholderTextColor="#999"
                    value={estatura} 
                    onChangeText={manejarEstatura} 
                    maxLength={4} 
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Género */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Género</Text>
                <View style={styles.optionsRow}>
                  {['Femenino', 'Masculino', 'Otro'].map((item) => (
                    <TouchableOpacity key={item} style={styles.optionChip}>
                      <Text style={styles.optionChipText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Objetivo */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Objetivo</Text>
                <View style={styles.optionsRow}>
                  {['Perder Peso', 'Ganar Músculo'].map((item) => (
                    <TouchableOpacity key={item} style={styles.optionChip}>
                      <Text style={styles.optionChipText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.btnSubmit} onPress={() => {}}>
                <Text style={styles.btnSubmitText}>Empezar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f4f6f4',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRegistro: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginRight: 15,
  },
  logoImg: {
    width: 40,
    height: 40,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    width: '100%',
  },
  cardRegistro: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  registerForm: {
    width: '100%',
  },
  fieldGroup: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    height: 48,
    fontSize: 15,
    color: '#333',
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 5,
  },
  optionChipSelected: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
  },
  optionChipText: {
    fontSize: 13,
    color: '#555',
  },
  optionChipTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnSubmit: {
    backgroundColor: '#2e7d32',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnSubmitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});