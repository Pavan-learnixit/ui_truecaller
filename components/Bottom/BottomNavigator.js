// import { View, Text } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import { Text } from 'react-native';
import FoundIcon from 'react-native-vector-icons/Foundation';
import Home from '../../screens/Home';

const Bottom = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
 <Bottom.Navigator tabBarOptions={{activeTintColor:'blue', inactiveTintColor:'black'}}>
    <Bottom.Screen name="Call" component={Home} options={{headerShown:false, tabBarIcon:()=>{
      return(
        <Icon name="call" size={20} color="blue"/>
      );
    }, tabBarLabel:()=> {
      return(
        <Text>Calls</Text>
      )
    }
    }}/>
    <Bottom.Screen name="Spam" component={Screen2} options={{headerShown:false, tabBarIcon:()=>{
      return(
        <FoundIcon name="alert" size={20} color="blue"/>
      );
    }, tabBarLabel:()=> {
      return(
        <Text>Scams</Text>
      )
    }
    }}/>
    <Bottom.Screen name="Message" component={Screen3} options={{headerShown:false, tabBarIcon:()=>{
      return(
        <Icon name="message" size={20} color="blue"/>
      );
    }, tabBarLabel:()=> {
      return(
        <Text>Messages</Text>
      )
    }
    }}/>
 </Bottom.Navigator>
  );
};

export default BottomNavigator;
