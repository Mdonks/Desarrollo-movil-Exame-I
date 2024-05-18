import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import ListReceta from "./ListReceta";
import AgregarRecetas from "./AddRecetas";
import DetailsReceta from "./DetailsReceta";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RecetasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListReceta" component={ListReceta} />
      <Stack.Screen name="DetailsReceta" component={DetailsReceta} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <MaterialIcons name="home-filled" size={24} />,
          }}
        />
        <Tab.Screen
          name="Agregar Recetas"
          component={AgregarRecetas}
          options={{
            tabBarLabel: "Agregar Recetas",
            tabBarIcon: () => <MaterialIcons name="library-add" size={24} />,
          }}
        />
        <Tab.Screen
          name="Recetas"
          component={RecetasStack}
          options={{
            tabBarLabel: "Recetas",
            tabBarIcon: () => (
              <MaterialIcons name="filter-list-alt" size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}