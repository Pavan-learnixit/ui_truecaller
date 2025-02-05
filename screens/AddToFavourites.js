import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { myContext } from '../components/AppNavigator';
import { RenderItem } from '../components/Common';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddToFavourites = ({ navigation }) => {
  const contactDetails = useContext(myContext);
  const [filteredContacts, setFilteredContacts] = useState(contactDetails || []);
  // const [favContact, setFavContact] = useState([]);

  const searchHandler = (text) => {
    if (!contactDetails) return;

    if (text.length === 0) {
      setFilteredContacts(contactDetails);
    } else {
      const filtered = contactDetails.filter((contact) =>
        contact.displayName?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search numbers, names & more"
          placeholderTextColor="#aaa"
          onChangeText={searchHandler}
        />
      </View>
      <FlatList
        data={filteredContacts} // Use filteredContacts here
        keyExtractor={(item) => item.recordID}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            onPress={async () => {
              try {
                // Extract current contact details
                const newContact = {
                  id: item.recordID,
                  name: item.displayName || item.givenName || "Unknown",
                  phoneNumber: item.phoneNumbers?.[0]?.number || "No Number",
                  email: item.emailAddresses?.[0]?.email || "No Email",
                  avatar: item.thumbnailPath || null,
                };
            
                // Retrieve existing favourites from AsyncStorage
                const existingFavs = await AsyncStorage.getItem("FAV");
                let favContacts = [];
            
                if (existingFavs) {
                  try {
                    favContacts = JSON.parse(existingFavs);
                    if (!Array.isArray(favContacts)) {
                      favContacts = []; // Ensure it's an array
                    }
                  } catch (error) {
                    console.error("Error parsing existing favourites:", error);
                    favContacts = []; // Reset to empty array in case of error
                  }
                }
            
                // Check if contact is already saved (to prevent duplicates)
                const isAlreadyAdded = favContacts.some((contact) => contact.id === newContact.id);
                if (!isAlreadyAdded) {
                  favContacts.push(newContact); // Append new contact
                  await AsyncStorage.setItem("FAV", JSON.stringify(favContacts)); // Save updated list
                  console.log("Updated Favourites List:", favContacts);
                } else {
                  console.log("Contact already exists in Favourites.");
                }
            
                // Navigate to Favourites screen
                navigation.navigate("Favourates", { contacts: favContacts });
            
              } catch (error) {
                console.error("Error saving contact:", error);
              }
            }}
            
            
            
            
          />
        )}
        contentContainerStyle={styles.contactList}
      />
    </View>
  );
};

export default AddToFavourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
