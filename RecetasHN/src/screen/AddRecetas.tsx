import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RecetasContext } from "./RecetasContext";

const AddRecetas = () => {
  const [ingInputText, setIngInputText] = useState("");
  const [nomInputText, setNomInputText] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const navigation = useNavigation();
  const context = useContext(RecetasContext);

  if (!context) {
    throw new Error("RecetasContext must be used within a RecetasProvider");
  }

  const { recetas, agregarReceta } = context;

  const agregaReceta = () => {
    if (nomInputText.length < 3) {
      Alert.alert("Ups", "El nombre debe tener al menos 3 caracteres");
      return;
    }

    if (ingInputText.length < 8) {
      Alert.alert(
        "Ups",
        "El número de contacto debe tener al menos 8 caracteres"
      );
      return;
    }

    const newReceta = {
      recetaID: recetas.length + 1,
      nombre: nomInputText,
      ingredientes: ingInputText,
    };

    agregarReceta(newReceta);
    setIngInputText("");
    setNomInputText("");
    setMensajeVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icono.png")}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        onChangeText={setNomInputText}
        value={nomInputText}
        placeholder="Nombre de la receta"
      />
      <TextInput
        style={styles.input}
        onChangeText={setIngInputText}
        value={ingInputText}
        placeholder="Ingredientes de la receta"
      />
      <TouchableOpacity style={styles.button} onPress={agregaReceta}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
      {mensajeVisible && (
        <Text style={styles.mensaje}>Detalle receta agregada</Text>
      )}
      <ScrollView contentContainerStyle={styles.recetaList}>
        {recetas.map((elemento) => (
          <TouchableOpacity key={elemento.recetaID} style={styles.recetaItem}>
            <Text style={styles.recetaName}>{elemento.nombre}</Text>
            <Text style={styles.ingName}>{elemento.ingredientes}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: "#d1d9e6",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  button: {
    width: '90%',
    height: 45,
    backgroundColor: "#5f9ea0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  mensaje: {
    marginTop: 10,
    fontSize: 16,
    color: "#000000",
  },
  recetaList: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  recetaItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recetaName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  ingName: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
  },
});

export default AddRecetas;
