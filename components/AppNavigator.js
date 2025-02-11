import {StyleSheet, Text, TouchableOpacity, View,PermissionsAndroid, Modal} from 'react-native';
// import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React, { createContext } from 'react';
import Contacts from 'react-native-contacts';

import Splash from './normal/Splash';
import Parent from './normal/Parent';
import LanguageSelection from '../screens/Language';
import Slider from './Carousel';
import Home from '../screens/Home';
import ContactsInfo from './contact/Contacts';
import CallerDetails from './CallerDetails/CallerDetails';
import PermissionScreen from '../screens/PermissionScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewMessage from './Bottom/NewMessage';
import Favourates from '../screens/Favourates';
import AddToFavourites from '../screens/AddToFavourites';
const transperent = 'rgba(0,0,0,0.5)';
const Stack = createStackNavigator();
export const myContext = createContext();

const AppNavigator = ({ navigation }) => {
  const [openModal, setOpenModel] = React.useState(false);
  const [isRed, setIsRed] = React.useState(false);
  const [contactDetails, setContactDetails] = React.useState([]);
  
  React.useEffect(() => {
    fetchContacts();
  }, [contactDetails]);

  const fetchContacts = async () => {
    const hasPermission = await requestContactsPermission();
    if (hasPermission) {
      Contacts.getAll()
      
        .then(fetchedContacts => setContactDetails(fetchedContacts))
        .catch(error => console.error('Error fetching contacts:', error));
    }
  };

  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to access your contacts.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return true;
    }
  };

  

  
  function renderModel() {
    return (
      <Modal visible={openModal} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            // backgroundColor: transperent,
          }}>
          <View
            style={{backgroundColor: 'white', padding: 15, borderRadius: 10}}>
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={() => setOpenModel(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="share-social-outline" size={24} color="black" />
                <Text style={{fontSize: 18, marginBottom: 5, marginLeft: 8}}>
                  Share
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="pencil-outline" size={20} color="black" />

                <Text style={{fontSize: 18, marginBottom: 5, marginLeft: 8}}>
                  Edit
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="copy-outline" size={20} color="black" />
                <Text style={{fontSize: 18, marginBottom: 5, marginLeft: 8}}>
                  Copy Name
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="globe-outline" size={20} color="black" />
                <Text style={{fontSize: 18, marginBottom: 5, marginLeft: 8}}>
                  Search the Web
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="documents-outline" size={20} color="black" />

                <Text style={{fontSize: 18, marginBottom: 5, marginLeft: 8}}>
                  Copy number
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
            <Ionicons name="call-outline" size={20} color="black" />
            <Text style={{fontSize: 18, marginBottom: 5,marginLeft: 8}}>Copy contact</Text>
            </View>
              
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
            <Ionicons name="trash-outline" size={20} color="black" />

            <Text style={{fontSize: 18, marginBottom: 5,marginLeft: 8}}>
                Remove contact
              </Text>
            </View>
             
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  
  return (
    <myContext.Provider value={contactDetails}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Language"
          component={LanguageSelection}
          options={{headerShown: false, title: 'lan'}}
        />
        <Stack.Screen
          name="Info"
          component={Slider}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Contacts"
          component={ContactsInfo}
          options={{headerShown: true}}
        />
           <Stack.Screen
          name="Favourates"
          component={Favourates}
          options={({ navigation }) => ({
            headerShown: true,
            headerBackVisible: true, // Ensures back button is visible
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={{ marginLeft: 15, fontSize: 18, color: 'blue', marginRight:15 }}>←</Text>
              </TouchableOpacity>
            ),
            headerBackTitleVisible: false, // Optional: hides "Back" text
          })}
        />
      <Stack.Screen
          name="AddToFavourites"
          component={AddToFavourites}
          options={{headerShown: true}}
        />
<Stack.Screen
          name="PermissionScreen"
          component={PermissionScreen}
          options={{headerShown: false}}
        />  
              <Stack.Screen
          name="ContactDetails"
          component={CallerDetails}
          options={{
            headerShown: true,
            title: 'In Your Contacts',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#007aff'},
            headerTintColor: 'white',
            headerRight: () => (
              <>
             <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={() => setIsRed(!isRed)} // Toggle the state on press
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
         name={isRed ? 'heart' : 'heart-outline'}
          size={24}
          color={isRed ? 'red' : 'white'} // Change color based on state
          style={{ marginRight: 10 }}
        />
      </View>
    </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => setOpenModel(true)}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
                {renderModel()}
              </>
            ),
          }}
        />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Parent" component={Parent} options={{headerShown:false}}/>
        <Stack.Screen name="NewMessage" component={NewMessage} options={{headerShown:true, title: 'Message'}}/>
    </Stack.Navigator>
  </NavigationContainer>
  </myContext.Provider>
  )
}

export default AppNavigator;

const styles = StyleSheet.create({});
