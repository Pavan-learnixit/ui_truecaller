import React, { useEffect, useState, useRef } from 'react';
import { 
  Alert, FlatList, StyleSheet, Text, TextInput, View, 
  ActivityIndicator, TouchableOpacity 
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import SmsAndroid from 'react-native-get-sms-android';

const normalizePhoneNumber = (number) => number.replace(/\D/g, "");

const NewMessage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const [newMessage, setNewMessage] = useState('');
  const [selectedSender, setSelectedSender] = useState('');
  const flatListRef = useRef(null);

  // ✅ Fetch messages every 5 seconds (Silent Polling)
  useEffect(() => {
    if (selectedSender) {
      fetchMessages(selectedSender, true); // Show loading only first time

      const interval = setInterval(() => {
        fetchMessages(selectedSender, false); // Silent update
      }, 5000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [selectedSender]);

  // ✅ Fetch messages from SMS databases
  const fetchMessages = async (sender, showLoading) => {
    if (!sender) return;
    
    if (showLoading) {
      setIsLoading(true);
    }

    try {
      const [inbox, sent] = await Promise.all([
        getSmsMessages('inbox', sender),
        getSmsMessages('sent', sender),
      ]);

      const allMessages = [...inbox, ...sent]
        .sort((a, b) => a.timestamp - b.timestamp);

      setMessages(allMessages);
      setIsLoading(false);
      scrollToBottom();

    } catch (error) {
      console.error("Message fetch error:", error);
      setIsLoading(false);
    }
  };

  // ✅ Get inbox and sent messages
  const getSmsMessages = async (box, sender) => {
    try {
      const smsList = await new Promise((resolve, reject) => {
        SmsAndroid.list(
          JSON.stringify({ box, max: 100 }),
          (fail) => reject(fail),
          (count, list) => resolve(JSON.parse(list))
        );
      });

      return smsList
        .filter(msg => normalizePhoneNumber(msg.address) === normalizePhoneNumber(sender))
        .map(msg => ({
          _id: `${box}_${msg._id}`,
          body: msg.body,
          timestamp: msg.date,
          sentByUser: box === 'sent',
        }));

    } catch (error) {
      console.error(`${box} error:`, error);
      return [];
    }
  };

  // ✅ Initial setup
  useEffect(() => {
    if (route.params?.sms) {
      const sender = normalizePhoneNumber(route.params.sms);
      setSelectedSender(sender);
      fetchMessages(sender, true);
    }
  }, [route.params]);

  // ✅ Send SMS and refresh messages
  const sendSms = async () => {
    if (!newMessage.trim()) return;

    try {
      // Optimistic UI update
      const tempMsg = {
        _id: `temp_${Date.now()}`,
        body: newMessage,
        timestamp: Date.now(),
        sentByUser: true,
      };
      setMessages(prev => [...prev, tempMsg]);
      setNewMessage('');
      scrollToBottom();

      // Actual SMS sending
      await SmsAndroid.autoSend(
        selectedSender,
        newMessage,
        (fail) => { throw new Error(fail) },
        async (success) => {
          // Refresh messages after successful send
          await fetchMessages(selectedSender, false);
        }
      );
    } catch (error) {
      // Remove optimistic message on failure
      setMessages(prev => prev.filter(msg => msg._id !== tempMsg._id));
      Alert.alert('Send Failed', error.message);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Messages from: {selectedSender}</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={[
              styles.messageBubble,
              item.sentByUser ? styles.sentMessage : styles.receivedMessage
            ]}>
              <Text style={styles.messageText}>{item.body}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          )}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendSms}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  loader: { marginVertical: 20 },
  messageBubble: { maxWidth: '75%', padding: 12, borderRadius: 16, marginHorizontal: 8, elevation: 3, marginVertical: 6 },
  sentMessage: { backgroundColor: '#007AFF', alignSelf: 'flex-end' },
  receivedMessage: { backgroundColor: '#FF9800', alignSelf: 'flex-start' },
  messageText: { fontSize: 16, color: '#fff' },
  timestamp: { fontSize: 12, color: '#666', textAlign: 'right', marginTop: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 30, backgroundColor: '#fff', paddingHorizontal: 15, marginTop: 10 },
  input: { flex: 1, paddingVertical: 10, fontSize: 16 },
  sendButton: { backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, marginLeft: 10 },
  sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default NewMessage;
