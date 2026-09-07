import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function ContactMobile() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipo, setTipo] = useState('consulta');
  const [mensaje, setMensaje] = useState('');
  const [estadoEnvio, setEstadoEnvio] = useState('idle');

  const handleSubmit = async () => {
    if (!nombre || !correo || !tipo || !mensaje) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    setEstadoEnvio('sending');

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/davidalexanderchangosantacruz@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            nombre: nombre,
            email: correo,
            tipo_solicitud: tipo,
            mensaje: mensaje,
            _subject: 'Nueva solicitud desde Nutrick (Mobile App)',
            _template: 'table',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.');
      }

      setEstadoEnvio('success');
      setNombre('');
      setCorreo('');
      setTipo('consulta');
      setMensaje('');

      setTimeout(() => setEstadoEnvio('idle'), 5000);
    } catch {
      setEstadoEnvio('error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* HERO / ENCABEZADO */}
          <View style={styles.hero}>
            <Text style={styles.sectionTag}>CENTRO DE AYUDA</Text>
            <Text style={styles.title}>Atención al usuario</Text>
            <Text style={styles.subtitle}>
              Tu opinión nos importa. Escríbenos para una queja, reclamo, sugerencia o consulta general.
            </Text>
          </View>

          {/* TARJETA DE FORMULARIO (Estilo Glass / Tarjeta Premium) */}
          <View style={styles.cardGlass}>
            
            {/* Campo Nombre */}
            <View style={styles.field}>
              <Text style={styles.label}>Nombre completo *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. David Santacruz"
                placeholderTextColor="#94a3b8"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

            {/* Campo Correo */}
            <View style={styles.field}>
              <Text style={styles.label}>Correo electrónico *</Text>
              <TextInput
                style={styles.input}
                placeholder="david@nutrick.com"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={correo}
                onChangeText={setCorreo}
              />
            </View>

            {/* Selector de Tipo de Solicitud (Chips) */}
            <View style={styles.field}>
              <Text style={styles.label}>Tipo de solicitud *</Text>
              <View style={styles.selectorContainer}>
                {[
                  { label: 'Queja / Reclamo', value: 'queja' },
                  { label: 'Sugerencia', value: 'sugerencia' },
                  { label: 'Consulta general', value: 'consulta' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.chip,
                      tipo === item.value && styles.chipActive,
                    ]}
                    onPress={() => setTipo(item.value)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        tipo === item.value && styles.chipTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Mensaje */}
            <View style={styles.field}>
              <Text style={styles.label}>Mensaje detallado *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe aquí tu situación con el mayor detalle posible..."
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={mensaje}
                onChangeText={setMensaje}
              />
            </View>

            {/* Botón de Envío */}
            <TouchableOpacity
              style={[
                styles.button,
                estadoEnvio === 'sending' && styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={estadoEnvio === 'sending'}
            >
              {estadoEnvio === 'sending' ? (
                <ActivityIndicator color="#052e16" />
              ) : (
                <Text style={styles.buttonText}>Enviar solicitud</Text>
              )}
            </TouchableOpacity>

            {/* Alertas */}
            {estadoEnvio === 'success' && (
              <View style={styles.alertaSuccess}>
                <Text style={styles.alertaSuccessText}>
                  ¡Solicitud enviada con éxito! Revisa tu correo de confirmación.
                </Text>
              </View>
            )}

            {estadoEnvio === 'error' && (
              <View style={styles.alertaError}>
                <Text style={styles.alertaErrorText}>
                  No pudimos enviar el formulario. Inténtalo nuevamente.
                </Text>
              </View>
            )}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5', // --fondo-suave
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  hero: {
    marginBottom: 20,
    backgroundColor: '#aecba8', // --verde
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.15)',
  },
  sectionTag: {
    color: '#052e16', // --verde-claro
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#127150', // --verde-oscuro
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#052e16',
    lineHeight: 20,
    opacity: 0.85,
  },
  cardGlass: {
    backgroundColor: '#ffffff', // --blanco
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#127150', // --verde-oscuro
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc', // --gris-claro
    borderColor: 'rgba(18, 113, 80, 0.2)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#052e16', // --verde-claro
    fontSize: 15,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(18, 113, 80, 0.2)',
    backgroundColor: '#f8fafc',
  },
  chipActive: {
    backgroundColor: '#127150', // --verde-oscuro
    borderColor: '#127150',
  },
  chipText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#ffffff', // --blanco
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6afd6a', // --verde-neon
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#127150',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#052e16', // --verde-claro
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertaSuccess: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(106, 253, 106, 0.2)',
    borderColor: '#127150',
    borderWidth: 1,
    borderRadius: 10,
  },
  alertaSuccessText: {
    color: '#052e16',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  alertaError: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(248, 81, 73, 0.15)',
    borderColor: '#f85149',
    borderWidth: 1,
    borderRadius: 10,
  },
  alertaErrorText: {
    color: '#f85149',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
