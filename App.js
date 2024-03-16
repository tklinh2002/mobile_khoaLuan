import { StatusBar } from 'expo-status-bar';
import { NavigationContainer,CommonActions } from '@react-navigation/native';
import Route from './router/router';
export default function App() {
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}

