import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './normal/Splash';
import Parent from './normal/Parent';
import LanguageSelection from '../screens/Language';
import Slider from './Carousel';
import Home from '../screens/Home';
import ContactsInfo from './contact/Contacts';
import CallerDetails from './CallerDetails/CallerDetails';
import Icon from 'react-native-vector-icons/Ionicons';

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
        <Stack.Screen
          name="Contacts"
          component={ContactsInfo}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ContactDetails"
          component={CallerDetails}
          options={{ headerShown: true, title: 'In Your Contacts', headerTitleAlign: 'center', headerStyle: { backgroundColor: '#007aff' }, headerTintColor: 'white', headerRight: () => <TouchableOpacity style={{marginRight: 10}}>
                    <Icon name="heart-outline" size={24} color="white" />
                  </TouchableOpacity> }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Parent" component={Parent} options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})