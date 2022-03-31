import { LogBox } from 'react-native';
import React from 'react';
import NavigatorComponent from './src/components/NavigatorComponent';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
const App = () => {
  return (
    <NavigatorComponent></NavigatorComponent>
  );
}
export default App;
