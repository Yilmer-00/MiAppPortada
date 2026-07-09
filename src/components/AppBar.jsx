import React from "react";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function AppBar({ navigation, title }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/nutrick.png")} style={styles.logo} />

      <Text style={styles.title}>{title}</Text>

      <View style={styles.icons}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.cart}>🛒</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,

    backgroundColor: "#fff",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 15,

    borderBottomWidth: 1,

    borderBottomColor: "#ddd",
  },

  logo: {
    width: 90,

    height: 50,

    resizeMode: "contain",
  },

  title: {
    fontSize: 22,

    fontWeight: "bold",

    color: "#222",
  },

  icons: {
    flexDirection: "row",

    alignItems: "center",

    gap: 15,
  },

  menu: {
    fontSize: 32,
  },

  cart: {
    fontSize: 28,
  },
});
