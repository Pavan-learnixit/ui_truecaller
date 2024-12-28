import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './normal/Splash';
import Parent from './normal/Parent';
import LanguageSelection from '../screens/Language';
import Slider from './Carousel';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen
          name="Language"
          component={LanguageSelection}
          options={{ headerShown: false, title: 'lan' }}
        />
        <Stack.Screen
          name="Info"
          component={Slider}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Parent" component={Parent} options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})