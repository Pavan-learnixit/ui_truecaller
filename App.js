import React from 'react';
// import CallerDetails from './components/CallerDetails/CallerDetails';
import AppNavigator from './components/AppNavigator';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Language from './screens/Language';
// import Home from './screens/Home';
// import Slider from './components/Carousel';

// const Stack = createStackNavigator();

const App = () => {
  return (
    // <CallerDetails/>
    <AppNavigator/>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="language"
    //       component={Language}
    //       options={{ headerShown: false, title: 'lan' }}
    //     />
    //     <Stack.Screen
    //       name="Info"
    //       component={Slider}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen name="Home" component={Home} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
