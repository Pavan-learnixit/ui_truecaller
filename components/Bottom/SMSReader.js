import { View, Text, PermissionsAndroid, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import SmsAndroid from 'react-native-get-sms-android';

const SMSReader = ({ navigation }) => {
  const [smsList, setSmsList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function requestSmsPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'This app needs access to your SMS messages to display them.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  }

  useEffect(() => {
    const fetchSms = async () => {
      setLoading(true); // Start loading
      const hasPermission = await requestSmsPermissions();
      if (hasPermission) {
        SmsAndroid.list(
          JSON.stringify({
            box: 'inbox', // Specify 'inbox' to fetch received messages
            maxCount: 30, // Limit the number of messages fetched
          }),
          fail => {
            console.error('Failed to fetch SMS:', fail);
            setLoading(false);
          },
          (count, smsList) => {
            try {
              const messages = JSON.parse(smsList);
              setSmsList(messages);
            } catch (error) {
              console.error('Error parsing SMS:', error);
            }
            setLoading(false); // Stop loading
          },
        );
      } else {
        console.log('SMS permission denied');
        setLoading(false); // Stop loading
      }
    };

    fetchSms();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: '#f9f9f9',
          borderRadius: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        }}
        onPress={() => navigation.navigate('NewMessage', { sms: item })}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.address}</Text>
        <Text style={{ fontSize: 14, marginVertical: 5 }}>{item.body}</Text>
        <Text style={{ color: 'gray', fontSize: 10 }}>
          {new Date(item.date).toLocaleString()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {loading ? (
        <Text>Loading messages...</Text>
      ) : smsList.length === 0 ? (
        <Text>No SMS Found</Text>
      ) : (
        <FlatList
          data={smsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default SMSReader;
