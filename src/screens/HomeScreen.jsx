import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; 

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Pagina de inicio Yilmer</Text>
    
    </View>
  );
}

// Opcional: Un estilo básico para que no se pegue arriba
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});