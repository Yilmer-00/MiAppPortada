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
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [estadoEnvio, setEstadoEnvio] = useState('idle'); // idle | sending | success | error

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
      setTipo('');
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
          <View style={styles.cardGlass}>
            <View style={styles.header}>
              <Text style={styles.sectionTag}>CENTRO DE AYUDA</Text>
              <Text style={styles.title}>Atención al usuario</Text>
              <Text style={styles.subtitle}>
                Tu opinión nos importa. Escríbenos para una queja, reclamo,
                sugerencia o una consulta general.
              </Text>
            </View>

            {/* Campos de texto */}
            <View style={styles.field}>
              <Text style={styles.label}>Nombre completo *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. David Santacruz"
                placeholderTextColor="#888"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Correo electrónico *</Text>
              <TextInput
                style={styles.input}
                placeholder="david@nutrick.com"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={correo}
                onChangeText={setCorreo}
              />
            </View>

            {/* Selector de Tipo de Solicitud adaptado a UX móvil */}
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

            <View style={styles.field}>
              <Text style={styles.label}>Mensaje detallado *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe aquí tu situación con el mayor detalle posible..."
                placeholderTextColor="#888"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={mensaje}
                onChangeText={setMensaje}
              />
            </View>

            {/* Botón de envío */}
            <TouchableOpacity
              style={[
                styles.button,
                estadoEnvio === 'sending' && styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={estadoEnvio === 'sending'}
            >
              {estadoEnvio === 'sending' ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Enviar solicitud</Text>
              )}
            </TouchableOpacity>

            {/* Estado Alertas */}
            {estadoEnvio === 'success' && (
              <View style={styles.alertaSuccess}>
                <Text style={styles.alertaSuccessText}>
                  Solicitud enviada con éxito. Revisa tu correo si es la primera
                  vez que usas FormSubmit.
                </Text>
              </View>
            )}

            {estadoEnvio === 'error' && (
              <View style={styles.alertaError}>
                <Text style={styles.alertaErrorText}>
                  No pudimos enviar el formulario en este intento. Inténtalo
                  nuevamente.
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
    backgroundColor: '#0d1117',
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  cardGlass: {
    backgroundColor: 'rgba(22, 27, 34, 0.8)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    marginBottom: 20,
  },
  sectionTag: {
    color: '#00d2ff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8b949e',
    lineHeight: 20,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c9d1d9',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#161b22',
    borderColor: '#30363d',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 15,
  },
  textArea: {
    height: 120,
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#30363d',
    backgroundColor: '#161b22',
  },
  chipActive: {
    backgroundColor: '#00d2ff',
    borderColor: '#00d2ff',
  },
  chipText: {
    color: '#8b949e',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#0d1117',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00d2ff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#0d1117',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertaSuccess: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(46, 160, 67, 0.15)',
    borderColor: '#2ea043',
    borderWidth: 1,
    borderRadius: 8,
  },
  alertaSuccessText: {
    color: '#3fb950',
    fontSize: 13,
  },
  alertaError: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(248, 81, 73, 0.15)',
    borderColor: '#f85149',
    borderWidth: 1,
    borderRadius: 8,
  },
  alertaErrorText: {
    color: '#f85149',
    fontSize: 13,
  },
});
