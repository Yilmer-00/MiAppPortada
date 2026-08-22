import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useCart } from "../../CarritoC/CartContext";

export default function FloatingCart() {

  const navigation = useNavigation();

  const { totalItems } = useCart();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Carrito 🛒")}
      activeOpacity={0.8}
    >

      <Ionicons
        name="cart"
        size={30}
        color="#fff"
      />

      {totalItems > 0 && (

        <View style={styles.badge}>

          <Text style={styles.badgeText}>
            {totalItems}
          </Text>

        </View>

      )}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  button: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#E53935",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
  },

});