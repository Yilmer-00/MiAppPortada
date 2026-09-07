import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';

export default function HomeScreenScreen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* 1. SECCIÓN HERO (Encabezado principal) */}
      <View style={styles.heroSection}>
        <Text style={styles.badge}>100% natural</Text>
        <Text style={styles.heroTitle}>Alimentación saludable sin esfuerzo</Text>
        <Text style={styles.heroSubtitle}>
          Descubre comidas nutritivas, deliciosas y listas para mejorar tu estilo de vida.
        </Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnPrimary}>
            <Text style={styles.btnTextPrimary}>Explorar productos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary}>
            <Text style={styles.btnTextSecondary}>Ver planes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. SECCIÓN: ¿Por qué elegirnos? */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Por qué elegirnos?</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ingredientes frescos</Text>
          <Text style={styles.cardText}>Seleccionamos productos naturales de la mejor calidad.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rápido y fácil</Text>
          <Text style={styles.cardText}>Compra en minutos y recibe en la puerta de tu casa.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cuida tu salud</Text>
          <Text style={styles.cardText}>Alimentos diseñados para mejorar tu bienestar diario.</Text>
        </View>
      </View>

      {/* 3. SECCIÓN: Lo nuevo (Tarjetas de productos) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lo nuevo</Text>

        <View style={styles.productCard}>
          {/* Reemplaza uri con la ruta local o URL de tus imágenes */}
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }} 
            style={styles.productImage} 
          />
          <Text style={styles.productTitle}>Ensalada Fresh</Text>
          <Text style={styles.productDesc}>Ingredientes naturales y frescos listos para consumir.</Text>
          <TouchableOpacity style={styles.btnAction}>
            <Text style={styles.btnActionText}>Ver más</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5', // Fondo claro similar a tu web
  },
  heroSection: {
    padding: 20,
    backgroundColor: '#EAE5D9',
    alignItems: 'center',
    borderRadius: 16,
    margin: 15,
  },
  badge: {
    backgroundColor: '#2E5A35',
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A2B1E',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  btnPrimary: {
    backgroundColor: '#2E5A35',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnTextPrimary: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  btnSecondary: {
    borderWidth: 1,
    borderColor: '#2E5A35',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnTextSecondary: {
    color: '#2E5A35',
    fontWeight: 'bold',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A2B1E',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5A35',
  },
  cardText: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginVertical: 6,
  },
  btnAction: {
    backgroundColor: '#2E5A35',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 6,
  },
  btnActionText: {
    color: '#FFF',
    fontSize: 12,
  }
});