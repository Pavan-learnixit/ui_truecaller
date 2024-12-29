import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Main from './Main'
import CutomDrawer from './CutomDrawer'
import ContactsInfo from '../contact/Contacts'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
   <Drawer.Navigator screenOptions={{
      headerShown: true, // Show header by default
    }} drawerContent={props => <CutomDrawer {...props}/>}>
    <Drawer.Screen name='Main' component={Main} options={{headerShown:true}}/>
   </Drawer.Navigator>
  )
}

export default DrawerNavigator