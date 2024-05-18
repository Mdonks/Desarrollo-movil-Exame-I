import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { RecetasContext } from "./RecetasContext";
import { useNavigation } from "@react-navigation/native";

interface Receta {
  recetaID: number;
  nombre: string;
  ingredientes: string;
}

const ListReceta = () => {
  const { recetas, eliminarReceta } = useContext(RecetasContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mensajeVisible, setMensajeVisible] = useState<boolean>(false);
  const navigation: any = useNavigation();

  const handleSearch = () => {
    const recetaID = parseInt(searchQuery, 10);
    if (isNaN(recetaID)) {
      Alert.alert("Error", "Por favor, ingrese un ID válido");
      return;
    }
    const receta = recetas.find(
      (receta: Receta) => receta.recetaID === recetaID
    );
    if (receta) {
      navigation.navigate("DetailsReceta", { receta });
    } else {
      Alert.alert("Error", "Receta no encontrada");
    }
  };

  const handleEliminarReceta = (recetaID: number) => {
    eliminarReceta(recetaID);
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000); // Ocultar el mensaje después de 3 segundos
  };

  const renderItem = ({ item }: { item: Receta }) => (
    <View style={styles.recetaItem}>
      <View style={styles.recetaDetails}>
        <Text style={styles.recetaName}>{item.nombre}</Text>
        <Text style={styles.recetaID}>ID: {item.recetaID}</Text>
        <Text style={styles.recetaIngredients}>{item.ingredientes}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleEliminarReceta(item.recetaID)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetas Agregadas</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar receta por ID"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>
      {mensajeVisible && (
        <Text style={styles.mensaje}>Receta eliminada con éxito</Text>
      )}
      {recetas.length === 0 ? (
        <Text style={styles.emptyMessage}>No hay recetas agregadas</Text>
      ) : (
        <FlatList
          data={recetas}
          renderItem={renderItem}
          keyExtractor={(item) => item.recetaID.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#777777",
    marginTop: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "#d1d9e6",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    marginBottom: 15,
  },
  searchButton: {
    height: 45,
    backgroundColor: "#5f9ea0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  mensaje: {
    fontSize: 16,
    color: "#000000", // Color negro para el mensaje
    textAlign: "center",
    marginBottom: 10,
  },
  recetaItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  recetaDetails: {
    marginBottom: 10,
  },
  recetaName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  recetaID: {
    fontSize: 14,
    color: "#888888",
  },
  recetaIngredients: {
    fontSize: 16,
    color: "#555555",
    marginTop: 5,
  },
  deleteButton: {
    alignSelf: "flex-end",
    backgroundColor: "#e57373",
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ListReceta;

