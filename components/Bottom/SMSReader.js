import { 
  View, 
  Text, 
  PermissionsAndroid, 
  FlatList, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SmsAndroid from 'react-native-get-sms-android';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SMSReader = ({ navigation }) => {
  const [smsList, setSmsList] = useState({});
  const [filteredContact, setFilteredContact] = useState('');
  const [unreadMessages, setUnreadMessages] = useState({});
  const [readMessages, setReadMessages] = useState(new Set()); // ✅ Store read messages
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    requestSmsPermissions();
    fetchMessages(true); // ✅ Show loading only for first-time fetch

    const interval = setInterval(() => {
      fetchMessages(false); // ✅ Silent background refresh every 5 sec
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const requestSmsPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.READ_SMS] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('✅ SMS permissions granted');
      } else {
        Alert.alert('❌ Permissions Denied', 'SMS permissions are required to use this app.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchMessages = (showLoading) => {
    if (showLoading) {
      setIsInitialLoad(true);
    }

    const filter = {
      box: 'inbox',
      read: 0, // Fetch unread messages
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('❌ Failed with this error: ' + fail);
        if (showLoading) setIsInitialLoad(false);
      },
      (count, smsList) => {
        const messages = JSON.parse(smsList);
        
        const groupedMessages = messages.reduce((acc, message) => {
          if (!acc[message.address]) acc[message.address] = [];
          acc[message.address].push(message);
          return acc;
        }, {});

        setSmsList(groupedMessages);

        // ✅ Properly track unread messages
        setUnreadMessages(prevUnread => {
          const newUnread = { ...prevUnread };

          Object.keys(groupedMessages).forEach(key => {
            const isNewMessage = groupedMessages[key].length > (smsList[key]?.length || 0);
            
            if (isNewMessage) {
              newUnread[key] = true; // ✅ Mark as unread only if new message arrives
            } else if (readMessages.has(key)) {
              newUnread[key] = false; // ✅ Keep normal if already read
            }
          });

          return newUnread;
        });

        if (showLoading) setIsInitialLoad(false);
      }
    );
  };

  // ✅ Mark message as read when clicked
  const handleMarkAsRead = (item) => {
    setReadMessages(prevReadMessages => {
      const updatedReadMessages = new Set(prevReadMessages);
      updatedReadMessages.add(item);
      return updatedReadMessages;
    });

    setUnreadMessages(prevState => ({ ...prevState, [item]: false }));

    navigation.navigate("NewMessage", { sms: item, smsList: smsList });
  };

  const sortedMessages = Object.keys(smsList).sort((a, b) => {
    const latestA = smsList[a][0]?.date || 0;
    const latestB = smsList[b][0]?.date || 0;
    return latestB - latestA; // Newest messages on top
  });

  const renderItem = ({ item }) => {
    const lastMessage = smsList[item][0];
    const previewText = lastMessage.body.length > 50 ? `${lastMessage.body.substring(0, 50)}...` : lastMessage.body;
    const formattedTime = moment(lastMessage.date).format('hh:mm A | dddd');

    return (
      <TouchableOpacity 
        onPress={() => handleMarkAsRead(item)}
        style={[styles.messageContainer, unreadMessages[item] && styles.unreadMessage]}
      >
        <View style={styles.messageHeader}>
          <Text style={[styles.phoneNumber, unreadMessages[item] && styles.unreadText]}>{item}</Text>
          <Text style={styles.timestamp}>{formattedTime}</Text>
        </View>
        <Text style={[styles.messagePreview, unreadMessages[item] && styles.unreadText]}>{previewText}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          placeholderTextColor="#aaa"
          value={filteredContact}
          onChangeText={setFilteredContact}
        />
      </View>

      {isInitialLoad ? (
        <Text style={styles.loadingText}>📩 Loading messages...</Text>
      ) : (
        <FlatList
          data={sortedMessages}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  unreadMessage: {
    backgroundColor: '#E3F2FD', // ✅ Light blue background for unread messages
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  unreadText: {
    fontWeight: 'bold', // ✅ Bold text for unread messages
    color: '#004C99',
  },
  messagePreview: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  loadingText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default SMSReader;
