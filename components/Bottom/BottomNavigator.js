// import { View, Text } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
const Bottom = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
 <Bottom.Navigator>
    <Bottom.Screen name="Screen1" component={Screen1} options={{headerShown:false, tabBarIcon:()=>{
      return(
        <Icon name="close" size={50} color="red"/>
      );
    }}}/>
    <Bottom.Screen name="Screen2" component={Screen2} options={{headerShown:false}}/>
    <Bottom.Screen name="Screen3" component={Screen3} options={{headerShown:false}}/>
 </Bottom.Navigator>
  );
};

export default BottomNavigator;
