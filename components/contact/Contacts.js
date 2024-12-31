import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';

const ContactsInfo = ({ navigation }) => {
  const [contactDetails, setContactDetails] = React.useState([]);

  React.useEffect(() => {
    const fetchContacts = async () => {
      const hasPermission = await requestContactsPermission();
      if (hasPermission) {
        Contacts.getAll()
        
          .then(fetchedContacts => setContactDetails(fetchedContacts))
          .catch(error => console.error('Error fetching contacts:', error));
      }
    };

    fetchContacts();
  }, []);

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

  const renderContactItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ContactDetails', { contact: item })}>
    <View style={styles.contactItem}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.contactImage} />
      ) : (
        <View style={styles.contactInitial}>
          <Text style={styles.contactInitialText}>{item.displayName[0]}</Text>
        </View>
      )}
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.displayName}</Text>
        {/* <Text style={styles.contactType}>{item.type}</Text> */}
      </View>
      {/* <Text style={styles.contactTime}>{item.time}</Text> */}
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search numbers, names & more"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Spam Warning */}
      <View style={styles.spamWarning}>
        <Text style={styles.spamTitle}>Spam protection disabled</Text>
        <Text style={styles.spamDescription}>
          Allow Truecaller to identify numbers and block calls.
        </Text>
        <TouchableOpacity>
          <Text style={styles.spamEnable}>ENABLE</Text>
        </TouchableOpacity>
      </View>

      {/* Contact List */}
      <FlatList
        data={contactDetails}
        keyExtractor={(item) => item.recordID}
        renderItem={renderContactItem}
        contentContainerStyle={styles.contactList}
      />
    </View>
  );
};

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
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  topButton: {
    alignItems: 'center',
  },
  topButtonText: {
    fontSize: 14,
    color: '#333',
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactInitial: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInitialText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactType: {
    fontSize: 14,
    color: '#666',
  },
  contactTime: {
    fontSize: 14,
    color: '#999',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#555',
  },
});

export default ContactsInfo;