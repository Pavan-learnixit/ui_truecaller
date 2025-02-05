import { Alert, Button, FlatList, NativeModules, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
const { SmsModule } = NativeModules;

const NewMessage = () => {
  const [messages, setMessages] = useState({});
  const route = useRoute();
  const [newMessage, setNewMessage] = useState('');
  const [selectedSender, setSelectedSender] = useState('');

  useEffect(() => {
    // Extract SMS data from the route

    const { sms, smsList } = route.params || {};
    setSelectedSender(sms);
    
    setMessages(smsList[sms]);
    // console.log("totla",messages)
  }, [route.params]);


  const checkDefaultSmsApp = async () => {
    console.log(SmsManager, 'SmsManager');
    
    if (SmsManager && SmsManager.isDefaultSmsApp) {
      const isDefault = await SmsManager.isDefaultSmsApp();
      if (!isDefault) {
        Alert.alert(
          'Set Default SMS App',
          'This app needs to be set as the default SMS app to manage messages. Would you like to set it now?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Set Default',
              onPress: () => SmsManager.requestDefaultSmsApp(),
            },
          ]
        );
      }
    }
  };
  
  const sendSms = async () => {
    try {
      const result = await SmsModule.sendSms('7815058420', newMessage);
      console.log(result); // SMS sent successfully
      // console.log("here",messages);
      Alert.alert('Success', 'Message sent successfully');
    } catch (error) {
      console.error(error.message); // Handle error
    }
  };

  return (
    <View style={styles.messageContainer}>
          <Text style={styles.subtitle}>Messages from: {selectedSender}</Text>
          <FlatList
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return(
              <Text style={styles.messageText}>{item.body}</Text>
            )}}
          />
          <TextInput
            style={styles.input}
            placeholder="Type your message"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <Button
            title="Send Message"
            onPress={() => {
              if (newMessage.trim()) {
                sendSms()
                setNewMessage('');
              } else {
                Alert.alert('Error', 'Message cannot be empty');
              }
            }}
          />
        </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  senderContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  sender: { fontSize: 18, color: 'blue' },
  messageContainer: { marginTop: 20 },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  messageText: { fontSize: 16, marginBottom: 5,backgroundColor:'#fff', padding:15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default NewMessage;
