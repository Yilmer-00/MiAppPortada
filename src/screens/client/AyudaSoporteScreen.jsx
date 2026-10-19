import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  HelpCircle,
} from "lucide-react-native";

export default function AyudaSoporteScreen() {
  const navigation = useNavigation();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      pregunta: "¿Cuánto tiempo tarda en llegar mi pedido?",
      respuesta:
        "Los envíos locales suelen tardar entre 24 y 48 horas hábiles según la zona de entrega.",
    },
    {
      id: 2,
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta:
        "Aceptamos tarjetas de crédito/débito, transferencias bancarias y pagos en efectivo contra entrega.",
    },
    {
      id: 3,
      pregunta: "¿Puedo realizar devoluciones o cambios?",
      respuesta:
        "Sí, cuentas con un plazo de 5 días hábiles después de recibir tu producto para solicitar un cambio si viene defectuoso.",
    },
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleWhatsApp = () => {
    Linking.openURL("https://wa.me/573000000000?text=Hola,%20necesito%20ayuda%20con%20mi%20compra");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Cabecera */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayuda y Soporte</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Contacto Directo */}
        <Text style={styles.sectionTitle}>¿Necesitas ayuda inmediata?</Text>
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactCard} onPress={handleWhatsApp} activeOpacity={0.8}>
            <View style={[styles.iconCircle, { backgroundColor: "#DCFCE7" }]}>
              <MessageCircle size={22} color="#15803D" />
            </View>
            <Text style={styles.contactTitle}>WhatsApp</Text>
            <Text style={styles.contactSub}>Atención directa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} activeOpacity={0.8}>
            <View style={[styles.iconCircle, { backgroundColor: "#E0F2FE" }]}>
              <Mail size={22} color="#0284C7" />
            </View>
            <Text style={styles.contactTitle}>Correo</Text>
            <Text style={styles.contactSub}>soporte@nutrik.com</Text>
          </TouchableOpacity>
        </View>

        {/* Preguntas Frecuentes */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Preguntas Frecuentes</Text>
        {faqs.map((faq) => {
          const isOpen = openFaq === faq.id;
          return (
            <View key={faq.id} style={styles.faqCard}>
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => toggleFaq(faq.id)}
                activeOpacity={0.7}
              >
                <View style={styles.faqTitleRow}>
                  <HelpCircle size={18} color="#15803D" />
                  <Text style={styles.faqQuestion}>{faq.pregunta}</Text>
                </View>
                {isOpen ? (
                  <ChevronUp size={18} color="#64748B" />
                ) : (
                  <ChevronDown size={18} color="#64748B" />
                )}
              </TouchableOpacity>
              {isOpen && <Text style={styles.faqAnswer}>{faq.respuesta}</Text>}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
  },
  backButton: {
    padding: 4,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: "row",
    gap: 12,
  },
  contactCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  contactSub: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },
  faqCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  faqTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
  },
  faqAnswer: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 10,
    lineHeight: 18,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
});