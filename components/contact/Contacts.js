import { 
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, PermissionsAndroid, Platform 
} from 'react-native';
import Contacts from 'react-native-contacts';
import { commonColors, RenderItem } from '../Common';
import React, { useContext, useState, useEffect } from 'react';
import { myContext } from '../AppNavigator';
import LinearGradient from 'react-native-linear-gradient';

const ContactsInfo = ({ navigation }) => {
  const contactDetails = useContext(myContext); // Getting contacts from context
  const [filteredContacts, setFilteredContacts] = useState(contactDetails || []);

  useEffect(() => {
    setFilteredContacts(contactDetails); // Sync filtered list when contacts change
  }, [contactDetails]);

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
    <LinearGradient colors={[commonColors.gradiend1, commonColors.light]} style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search numbers, names & more"
          placeholderTextColor="#aaa"
          onChangeText={searchHandler}
        />
      </View>

      {/* Spam Warning */}
      {/* <View style={styles.spamWarning}>
        <Text style={styles.spamTitle}>Spam protection disabled</Text>
        <Text style={styles.spamDescription}>
          Allow Truecaller to identify numbers and block calls.
        </Text>
        <TouchableOpacity>
          <Text style={styles.spamEnable}>ENABLE</Text>
        </TouchableOpacity>
      </View> */}

      {/* Contact List */}
      <FlatList
        data={filteredContacts} // Using filtered list instead of original
        keyExtractor={(item) => item.recordID}
        renderItem={({ item }) => (
          <RenderItem item={item} onPress={() => navigation.navigate("ContactDetails", { contact: item })} />
        )}
        contentContainerStyle={styles.contactList}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    // backgroundColor: '#f1f1f1',
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  spamWarning: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ffe5e5',
    borderRadius: 8,
  },
  spamTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d9534f',
  },
  spamDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  spamEnable: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  contactList: {
    paddingHorizontal: 10,
  },
});

export default ContactsInfo;
