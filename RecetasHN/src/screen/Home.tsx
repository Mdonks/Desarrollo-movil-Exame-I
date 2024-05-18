import { View, Text, Image, StyleSheet } from "react-native";
import React from 'react'

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image
          source={require("../../assets/icono.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>
        La aplicación permite a los usuarios agregar nuevas recetas, ver
        detalles de una receta específica, y eliminar recetas existentes.
      </Text>
      <Text style={styles.ownerText}>Dueño de la aplicación: Mario Pineda</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f0ff", 
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  containerImg: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff", 
    padding: 20,
    borderRadius: 15, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: "#333333", 
  },
  ownerText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666666", 
  },
});
