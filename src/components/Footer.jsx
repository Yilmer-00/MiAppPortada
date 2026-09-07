import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Footer() {
  return (
    <View style={styles.container}>
      {/* Borde superior verde decorativo */}
      <View style={styles.topAccentBar} />

      <View style={styles.mainContent}>
        {/* Logotipo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/nutrick.png")}
            style={styles.logo}
          />
        </View>

        {/* Secciones de enlaces */}
        <View style={styles.linksGrid}>
          {/* Columna Izquierda: Información y Legal */}
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Información</Text>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Acerca de Nosotros</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Contáctanos</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, styles.subTitle]}>Legal</Text>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Términos y condiciones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Tratamiento de datos</Text>
            </TouchableOpacity>
          </View>

          {/* Columna Derecha: Ayuda y Redes Sociales */}
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>¿Necesitas ayuda?</Text>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Servicio al cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Atención y pedidos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Horarios de atención</Text>
            </TouchableOpacity>

            {/* Iconos de Redes Sociales */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialCircle}>
                <Text style={styles.socialIcon}>I</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialCircle}>
                <Text style={styles.socialIcon}>T</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialCircle}>
                <Text style={styles.socialIcon}>W</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Línea divisoria y créditos */}
      <View style={styles.bottomBar}>
        <Text style={styles.copyrightText}>
          © 2026 Nutrik. Todos los derechos reservados
        </Text>
        <View style={styles.divider} />
        <Text style={styles.creditsText}>
          Hecho y desarrollado por <Text style={styles.brandTag}>@Nutrik Co 🇨🇴</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    paddingBottom: 55, // Previene que la barra de navegación inferior oculte los créditos
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  topAccentBar: {
    height: 6,
    backgroundColor: "#4c7c3d",
  },
  mainContent: {
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: "contain",
  },
  linksGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  column: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  subTitle: {
    marginTop: 16,
  },
  linkButton: {
    paddingVertical: 3,
  },
  linkText: {
    fontSize: 12,
    color: "#4a4a4a",
  },
  socialRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  socialCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    fontSize: 15,
    color: "#ffffff",
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    alignItems: "center",
  },
  copyrightText: {
    fontSize: 10,
    color: "#666666",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#cccccc",
    width: "100%",
    marginVertical: 10,
  },
  creditsText: {
    fontSize: 12,
    color: "#333333",
    textAlign: "center",
  },
  brandTag: {
    fontWeight: "bold",
    color: "#000000",
  },
});