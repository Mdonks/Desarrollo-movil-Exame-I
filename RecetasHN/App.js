import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/screen/Navigation';
import { RecetasProvider } from './src/screen/RecetasContext';

export default function App() {
  return (
    <RecetasProvider>
      <Navigation />
    </RecetasProvider>
  );
}
