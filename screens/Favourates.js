import {View, Text, TouchableOpacity, Button, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../assets/images/home.png';
import Family from '../assets/images/family.png';
import Family1 from '../assets/images/family1.png';
const Favourites = ({navigation}) => {
  const [favContact, setFavContact] = useState([]);

  useEffect(() => {
    const fetchFavContact = async () => {
      try {
        const storedContact = await AsyncStorage.getItem('FAV');
        console.log('Fetched from AsyncStorage:', storedContact); // Debugging

        if (storedContact) {
          const parsedContacts = JSON.parse(storedContact);
          if (Array.isArray(parsedContacts)) {
            setFavContact(parsedContacts);
          } else {
            setFavContact([]);
            console.warn('Data in AsyncStorage is not an array!');
          }
        } else {
          console.warn('No data found in AsyncStorage for key: FAV');
        }
      } catch (error) {
        console.error('Error fetching favourite contact:', error);
      }
    };

    fetchFavContact();
  }, []);

  // Function to remove contact
  const removeContact = async id => {
    const updatedContacts = favContact.filter(contact => contact.id !== id);
    setFavContact(updatedContacts);

    // Update AsyncStorage
    try {
      await AsyncStorage.setItem('FAV', JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Error updating AsyncStorage:', error);
    }
  };

  return (
    <View>
      {/* <Text>Favourite Contacts:</Text> */}

      {favContact.length > 0 ? (
        favContact.map((contact, index) => (
          <View
            key={index}
            style={{
              flex:1,
              marginVertical: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: '100%',
            }}>
            <Text>
              {contact.name} - {contact.phoneNumber}
            </Text>
            <Button
              title="Remove"
              onPress={() => removeContact(contact.id)}
              color="red"
            />
          </View>
        ))
      ) : (
        // <Text>No favourite contacts saved</Text>
        <View>
          <Image
            source={Home}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              left: 150,
              top: 40,
            }}
          />
          <Image
            source={Family}
            style={{width: 150, height: 150, borderRadius: 100}}
          />
          <Image
            source={Family1}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              left: 160,
              bottom: 70,
            }}
          />
        </View>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('AddToFavourites')}>
        <Text style={{textAlign: 'center', color: 'blue', fontWeight: '500'}}>
          Add a Favourite
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Favourites;
