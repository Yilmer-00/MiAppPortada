import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { useCart } from "../CarritoC/CartContext";

export default function CartScreen() {

  const {
    carrito,
    eliminarProducto,
    cambiarCantidad,
    totalPrecio,
  } = useCart();

  const renderItem = ({ item }) => (

    <View style={styles.card}>

      {item.imagen && (
        <Image
          source={{ uri: item.imagen }}
          style={styles.imagen}
        />
      )}

      <View style={{ flex: 1 }}>

        <Text style={styles.nombre}>
          {item.nombre}
        </Text>

        <Text style={styles.precio}>
          ${item.precio}
        </Text>

        <View style={styles.botonesCantidad}>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => cambiarCantidad(item.id, -1)}
          >
            <Text style={styles.btnTexto}>-</Text>
          </TouchableOpacity>

          <Text style={styles.cantidad}>
            {item.cantidad}
          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => cambiarCantidad(item.id, 1)}
          >
            <Text style={styles.btnTexto}>+</Text>
          </TouchableOpacity>

        </View>

      </View>

      <TouchableOpacity
        style={styles.eliminar}
        onPress={() => eliminarProducto(item.id)}
      >
        <Text style={{ color: "white" }}>
          Eliminar
        </Text>
      </TouchableOpacity>

    </View>

  );

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Mi Carrito
      </Text>

      {carrito.length === 0 ? (

        <View style={styles.vacio}>
          <Text>🛒 Tu carrito está vacío</Text>
        </View>

      ) : (

        <>
          <FlatList
            data={carrito}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />

          <View style={styles.footer}>

            <Text style={styles.total}>
              Total: ${totalPrecio}
            </Text>

            <TouchableOpacity style={styles.pagar}>
              <Text style={styles.textoBoton}>
                PAGAR
              </Text>
            </TouchableOpacity>

          </View>

        </>

      )}

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#fff",
    padding:15,
  },

  titulo:{
    fontSize:25,
    fontWeight:"bold",
    marginBottom:20,
  },

  vacio:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },

  card:{
    flexDirection:"row",
    backgroundColor:"#f7f7f7",
    marginBottom:15,
    padding:10,
    borderRadius:12,
    alignItems:"center",
  },

  imagen:{
    width:70,
    height:70,
    marginRight:10,
    borderRadius:10,
  },

  nombre:{
    fontWeight:"bold",
    fontSize:17,
  },

  precio:{
    color:"green",
    marginVertical:5,
  },

  botonesCantidad:{
    flexDirection:"row",
    alignItems:"center",
  },

  btn:{
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor:"#4CAF50",
    justifyContent:"center",
    alignItems:"center",
  },

  btnTexto:{
    color:"white",
    fontSize:18,
    fontWeight:"bold",
  },

  cantidad:{
    marginHorizontal:15,
    fontWeight:"bold",
  },

  eliminar:{
    backgroundColor:"#E53935",
    padding:10,
    borderRadius:8,
  },

  footer:{
    borderTopWidth:1,
    borderColor:"#ddd",
    paddingTop:15,
  },

  total:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:15,
  },

  pagar:{
    backgroundColor:"#4CAF50",
    padding:15,
    borderRadius:10,
    alignItems:"center",
  },

  textoBoton:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:18,
  },

});