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
      
      {/* 1. HERO BANNER */}
      <View style={styles.heroCard}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🌿 100% natural</Text>
        </View>
        <Text style={styles.heroTitle}>Alimentación saludable sin esfuerzo</Text>
        <Text style={styles.heroSubtitle}>
          Descubre comidas nutritivas, deliciosas y listas para mejorar tu estilo de vida.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>Explorar productos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary}>
            <Text style={styles.btnSecondaryText}>Ver planes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. POR QUÉ ELEGIRNOS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Por qué elegirnos?</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🥗 Ingredientes frescos</Text>
          <Text style={styles.infoDesc}>Seleccionamos productos naturales de la mejor calidad.</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>⚡ Rápido y fácil</Text>
          <Text style={styles.infoDesc}>Compra en minutos y recibe en la puerta de tu casa.</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>❤️ Cuida tu salud</Text>
          <Text style={styles.infoDesc}>Alimentos diseñados para mejorar tu bienestar diario.</Text>
        </View>
      </View>

      {/* 3. EXPLORA LO NUEVO */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explora lo Nuevo</Text>
        
        <View style={styles.productCard}>
          <Text style={styles.productTitle}>Ensalada Fresh</Text>
          <Text style={styles.productDesc}>Ingredientes naturales y frescos listos para consumir.</Text>
          <TouchableOpacity style={styles.btnAction}>
            <Text style={styles.btnActionText}>Ver más</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productCard}>
          <Text style={styles.productTitle}>Bowl Nutritivo</Text>
          <Text style={styles.productDesc}>Mezcla balanceada de granos y vegetales para mantener tu energía.</Text>
          <TouchableOpacity style={styles.btnAction}>
            <Text style={styles.btnActionText}>Ver más</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. COMPRA FÁCIL Y SALUDABLE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compra fácil y saludable</Text>
        
        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepTitle}>Explora el catálogo</Text>
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepTitle}>Llena tu carrito</Text>
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepTitle}>Recibe en casa</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6F0',
  },
  heroCard: {
    backgroundColor: '#E7E2D4',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#2D5A27',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C3121',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  btnPrimary: {
    backgroundColor: '#2D5A27',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnPrimaryText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  btnSecondary: {
    borderWidth: 1,
    borderColor: '#2D5A27',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnSecondaryText: {
    color: '#2D5A27',
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3121',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 13,
    color: '#666',
  },
  productCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3121',
  },
  productDesc: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginVertical: 8,
  },
  btnAction: {
    backgroundColor: '#2D5A27',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  btnActionText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  stepCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5A27',
    backgroundColor: '#E7E2D4',
    width: 32,
    height: 32,
    textAlign: 'center',
    lineHeight: 32,
    borderRadius: 16,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C3121',
  },
});