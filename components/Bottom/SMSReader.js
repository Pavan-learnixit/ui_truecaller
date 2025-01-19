import { View, Text, PermissionsAndroid, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import SmsAndroid from 'react-native-get-sms-android';
import { RenderItem } from '../Common';

const SMSReader = ({ navigation }) => {
  const [smsList, setSmsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredContact, setFilteredContact] = useState('');


  const seacrhContact = (text) => {
    setFilteredContact(text);
    const filteredData = Object.keys(smsList).filter((item) => item.includes(text));
    const filteredDataObj = filteredData.reduce((acc, item) => {
      acc[item] = smsList[item];
      return acc;
    }, {});
    setSmsList(filteredDataObj);
  };

  

  const requestSmsPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.READ_SMS] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.SEND_SMS] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('SMS permissions granted');
      } else {
        Alert.alert('Permissions Denied', 'SMS permissions are required to use this app.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchMessages = () => {
    const filter = {
      box: 'inbox', // 'inbox' or 'sent'
      read: 1, // 0 for unread messages, 1 for read messages
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        const messages = JSON.parse(smsList);
        const groupedMessages = messages.reduce((acc, message) => {
          if (!acc[message.address]) acc[message.address] = [];
          acc[message.address].push(message);
          return acc;
        }, {});        
        setSmsList(groupedMessages);
      }
    );
  };

  useEffect(() => {
    requestSmsPermissions();
    fetchMessages();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {loading ? (
        <Text>Loading messages...</Text>
      ) : smsList.length === 0 ? (
        <Text>No SMS Found</Text>
      ) : (
        <View>
          <TextInput
            // style={styles.searchInput}
            placeholder="Search numbers, names & more"
            placeholderTextColor="#aaa"
            value={filteredContact}
            onChangeText={seacrhContact}
          />
        <FlatList
          data={Object.keys(smsList)}
          keyExtractor={(item) =>item}
          renderItem={({ item }) => <RenderItem item={item} smsList={Object.keys(smsList)} onPress={()=> navigation.navigate("NewMessage", {sms : item, smsList : smsList})} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        </View>
      )}
    </View>
  );
};

export default SMSReader;
