export default function AppBar({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Opción 1: Inicio */}
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Inicio')}>
        {/* Aquí va tu ícono */}
        <Text style={styles.navTextActive}>Home</Text>
      </TouchableOpacity>

      {/* Opción 2: Carrito / Tienda */}
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
        <Text style={{ fontSize: 20 }}>🛒</Text>
        <Text style={styles.navText}>Carrito</Text>
      </TouchableOpacity>

      {/* Opción 3: Menú / Drawer */}
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.openDrawer()}>
        <Text style={{ fontSize: 20 }}>☰</Text>
        <Text style={styles.navText}>Menú</Text>
      </TouchableOpacity>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    
    position: "absolute",
    bottom: 25,          
    left: 20,            
    right: 20,           

    
    height: 70,
    backgroundColor: "#16161a", 
    borderRadius: 20,          

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around", 
    paddingHorizontal: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    color: "#a0a0a0",
    fontSize: 12,
    marginTop: 4,
  },

  navTextActive: {
    color: "#3b82f6", 
    fontSize: 12,
    marginTop: 4,
    fontWeight: "bold",
  }
});