/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './App';  // Make sure App is correctly imported
import { name as appName } from './app.json';  // Ensure this is correct

AppRegistry.registerComponent(appName, () => App);
