import { View, Text, TouchableOpacity, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../assets/images/home.png';
import Family from '../assets/images/family.png';
import Family1 from '../assets/images/family1.png';

const Favourites = ({ navigation }) => {
  const [favContact, setFavContact] = useState([]);

  // Fetch saved contacts from AsyncStorage
  useEffect(() => {
    const fetchFavContact = async () => {
      try {
        const storedContact = await AsyncStorage.getItem('FAV');
        console.log('Fetched from AsyncStorage:', storedContact); // Debugging

        if (storedContact) {
          const parsedContacts = JSON.parse(storedContact);
          console.log('Parsed Contacts:', parsedContacts);

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
  const removeContact = async (id) => {
    const updatedContacts = favContact.filter(contact => contact.id !== id);
    setFavContact(updatedContacts);

    // Update AsyncStorage
    try {
      await AsyncStorage.setItem('FAV', JSON.stringify(updatedContacts));
      console.log('Updated AsyncStorage:', JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Error updating AsyncStorage:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
        Favourite Contacts
      </Text>

      {favContact.length > 0 ? (
        favContact.map((contact, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f9f9f9',
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 16 }}>
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
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Image source={Home} style={{ width: 120, height: 120, borderRadius: 60 }} />
          <Image source={Family} style={{ width: 120, height: 120, borderRadius: 60, marginVertical: 10 }} />
          <Image source={Family1} style={{ width: 120, height: 120, borderRadius: 60 }} />
          <Text style={{ fontSize: 16, color: '#555', marginTop: 15 }}>No favourite contacts saved</Text>
        </View>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('AddToFavourites')}>
        <Text style={{ textAlign: 'center', color: 'blue', fontWeight: '500', marginTop: 20 }}>
          Add a Favourite
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Favourites;
