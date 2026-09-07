import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useCart } from "../context/CartContext";

export function CartPanel() {
  const {
    carrito,
    carritoAbierto,
    setCarritoAbierto,
    eliminarProducto,
    cambiarCantidad,
    totalPrecio,
  } = useCart();

  return (
    <Modal
      visible={carritoAbierto}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setCarritoAbierto(false)}
    >
      <View style={styles.overlay}>
        {/* Cierra el carrito al tocar la zona oscura de arriba */}
        <Pressable style={styles.backdrop} onPress={() => setCarritoAbierto(false)} />

        <SafeAreaView style={styles.panel}>
          {/* HEADER */}
          <View style={styles.cartHeader}>
            <Text style={styles.headerIcon}>🛒</Text>
            <Text style={styles.headerTitle}>Mi Carrito</Text>
            <TouchableOpacity
              style={styles.cartCerrar}
              onPress={() => setCarritoAbierto(false)}
            >
              <Text style={styles.cartCerrarText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* LISTA DE ITEMS */}
          {carrito.length === 0 ? (
            <View style={styles.cartVacio}>
              <Text style={styles.cartVacioTitulo}>🛒 Tu carrito está vacío</Text>
              <Text style={styles.cartVacioSub}>Agrega productos para comenzar</Text>
            </View>
          ) : (
            <FlatList
              data={carrito}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.cartItemsList}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Image
                    source={{ uri: item.imagen }}
                    style={styles.cartItemImg}
                    resizeMode="cover"
                  />
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemNombre} numberOfLines={1}>
                      {item.nombre}
                    </Text>
                    <Text style={styles.cartItemPrecio}>
                      ${(item.precio * item.cantidad).toLocaleString("es-CO")}
                    </Text>

                    {/* Botones - / + */}
                    <View style={styles.cartItemControles}>
                      <TouchableOpacity
                        style={styles.controlBtn}
                        onPress={() => cambiarCantidad(item.id, -1)}
                      >
                        <Text style={styles.controlBtnText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.controlCantidad}>{item.cantidad}</Text>
                      <TouchableOpacity
                        style={styles.controlBtn}
                        onPress={() => cambiarCantidad(item.id, 1)}
                      >
                        <Text style={styles.controlBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Eliminar */}
                  <TouchableOpacity
                    style={styles.cartItemEliminar}
                    onPress={() => eliminarProducto(item.id)}
                  >
                    <Text style={styles.cartItemEliminarText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          {/* FOOTER */}
          {carrito.length > 0 && (
            <View style={styles.cartFooter}>
              <View style={styles.cartTotal}>
                <Text style={styles.cartTotalText}>Total:</Text>
                <Text style={styles.cartTotalPrecio}>
                  ${totalPrecio.toLocaleString("es-CO")}
                </Text>
              </View>

              <TouchableOpacity style={styles.cartBtnPagar}>
                <Text style={styles.cartBtnPagarText}>Pagar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cartBtnSeguir}
                onPress={() => setCarritoAbierto(false)}
              >
                <Text style={styles.cartBtnSeguirText}>Seguir comprando</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
}

export default CartPanel;

// ── COLORES DE TU PALETA EN STYLESHEET ──
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  panel: {
    height: "85%",
    backgroundColor: "#ecfdf5", // --fondo-suave
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  cartHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#127150", // --verde-oscuro
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  cartCerrar: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCerrarText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cartVacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cartVacioTitulo: {
    fontSize: 20,
    fontWeight: "600",
    color: "#127150",
    marginBottom: 8,
  },
  cartVacioSub: {
    fontSize: 14,
    color: "#127150",
  },
  cartItemsList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: "rgba(18, 113, 80, 0.12)",
    elevation: 3,
  },
  cartItemImg: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  cartItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemNombre: {
    fontSize: 14,
    fontWeight: "600",
    color: "#127150",
  },
  cartItemPrecio: {
    fontSize: 15,
    color: "#127150",
    fontWeight: "700",
    marginVertical: 2,
  },
  cartItemControles: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  controlBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#6afd6a", // --verde-neon
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtnText: {
    color: "#127150",
    fontSize: 16,
    fontWeight: "bold",
  },
  controlCantidad: {
    marginHorizontal: 12,
    fontWeight: "700",
    color: "#052e16", // --verde-claro
  },
  cartItemEliminar: {
    borderWidth: 1,
    borderColor: "#ef4444",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  cartItemEliminarText: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "600",
  },
  cartFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(18, 113, 80, 0.12)",
    backgroundColor: "#ffffff",
  },
  cartTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cartTotalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#052e16",
  },
  cartTotalPrecio: {
    color: "#127150",
    fontSize: 20,
    fontWeight: "800",
  },
  cartBtnPagar: {
    backgroundColor: "#6afd6a", // --verde-neon
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  cartBtnPagarText: {
    color: "#127150",
    fontSize: 16,
    fontWeight: "700",
  },
  cartBtnSeguir: {
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#127150",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
  },
  cartBtnSeguirText: {
    color: "#127150",
    fontSize: 15,
    fontWeight: "600",
  },
});