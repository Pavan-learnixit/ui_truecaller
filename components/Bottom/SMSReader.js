import { View, Text, PermissionsAndroid, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import SmsAndroid from 'react-native-get-sms-android';
import { RenderItem } from '../Common';

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
          renderItem={({ item }) => <RenderItem item={item} onPress={()=> navigation.navigate("NewMessage", {sms : item})} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default SMSReader;
