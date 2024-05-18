import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RecetasContext } from "./RecetasContext";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

interface Receta {
  recetaID: number;
  nombre: string;
  ingredientes: string;
}

type RouteParams = {
  DetailsReceta: {
    receta: Receta;
  };
};

const DetailsReceta = () => {
  const { eliminarReceta } = useContext(RecetasContext);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, "DetailsReceta">>();
  const { receta } = route.params;

  const handleEliminar = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar esta receta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            eliminarReceta(receta.recetaID);
            navigation.goBack();
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{receta.nombre}</Text>
      <Text style={styles.info}>ID: {receta.recetaID}</Text>
      <Text style={styles.info}>Ingredientes: {receta.ingredientes}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleEliminar}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 45,
    backgroundColor: "#5f9ea0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: "#ff6b6b",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetailsReceta;
