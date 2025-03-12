import { 
  View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList, 
  NativeModules, PermissionsAndroid 
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../../screens/Home';
import SMSReader from './SMSReader';
import Contacts from 'react-native-contacts';
import CallLog from 'react-native-call-log';
import LinearGradient from 'react-native-linear-gradient';
import { commonColors } from '../../components/Common';
const Bottom = createBottomTabNavigator();
const DummyScreen = () => <View />;
const { DirectCall } = NativeModules;

const BottomNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [recentCalls, setRecentCalls] = useState([]);

  // ✅ Request Permissions
  const requestPermissions = async () => {
    try {
      const contactPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      const callLogPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG
      );

      return (
        contactPermission === PermissionsAndroid.RESULTS.GRANTED &&
        callLogPermission === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn('Permission Error:', err);
      return false;
    }
  };

  // ✅ Fetch Contacts & Call Logs
  const fetchContactsAndCalls = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      // Fetch Contacts
      const contactsList = await Contacts.getAll();
      setContacts(
        contactsList.map(contact => ({
          name: contact.displayName,
          number: contact.phoneNumbers[0]?.number || '',
        }))
      );

      // Fetch Call Logs (last 50)
      const callLogs = await CallLog.load(50);
      setRecentCalls(
        callLogs.map(log => ({
          name: log.name || 'Unknown',
          number: log.phoneNumber,
        }))
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      fetchContactsAndCalls();
    }
  }, [modalVisible]);

  // ✅ Filter Contacts & Calls Dynamically
  useEffect(() => {
    if (!number) {
      setFilteredResults([]);
      return;
    }

    const searchResults = [...contacts, ...recentCalls].filter(
      item => item.number.replace(/\D/g, '').includes(number.replace(/\D/g, ''))
    );

    setFilteredResults(searchResults);
  }, [number]);

  // ✅ Handle Dialpad Input
  const handlePress = (digit) => setNumber((prev) => prev + digit);
  const handleDelete = () => setNumber(number.slice(0, -1));

  // ✅ Make Call
  const handleCall = async () => {
    if (!number.trim()) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }
    DirectCall.callNumber(String(number));
  };

  return (
    
    <>
    
      <Bottom.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused }) => {
            let iconName = route.name === 'Call' ? 'call' : route.name === 'Dialer' ? 'dialpad' : 'message';
            let color = focused ? '#ebf5ff' : 'black';
            return <Icon name={iconName} size={28} color={color} />;
          },
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.activeLabel]}>{route.name}</Text>
          ),
          headerShown: false,
        })}
      >
        <Bottom.Screen name="Call" component={Home} />
        <Bottom.Screen
          name="Dialer"
          component={DummyScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(true);
            },
          }}
        />
        <Bottom.Screen name="Message" component={SMSReader} />
      </Bottom.Navigator>

      {/* 🔥 MODAL DialerPad */}
      {/* <LinearGradient colors={[commonColors.gradiend1, commonColors.light]} style={styles.container}> */}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        
        <View style={styles.modalContainer}>
      

          {/* 🔎 Dynamic Search Results */}
          {filteredResults.length > 0 && (
            <FlatList
              data={filteredResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => setNumber(item.number)}
                >
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.contactNumber}>{item.number}</Text>
                </TouchableOpacity>
              )}
            />
          )}
    <TextInput
            style={styles.display}
            value={number}
            placeholder="Enter Number"
            placeholderTextColor="gray"
            keyboardType="numeric"
            onChangeText={setNumber}
          />
          {/* 🔢 Dialpad */}
          <View style={styles.dialpad}>
            {['1', '2 ABC', '3 DEF', '4 GHI', '5 JKL', '6 MNO', '7 PQRS', '8 TUV', '9 WXYZ', '*', '0 +', '#'].map(
              (key) => (
                <TouchableOpacity key={key} style={styles.key} onPress={() => handlePress(key[0])}>
                  <Text style={styles.keyText}>{key.split(' ')[0]}</Text>
                  <Text style={styles.keySubText}>{key.split(' ')[1] || ''}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* 📲 Call & Delete Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
              <Icon name="call" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Icon name="backspace" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() =>{setNumber(''); setModalVisible(false)}}>
              <Icon name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* </LinearGradient> */}
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: { backgroundColor: '#007AFF', height: 55 },
  tabLabel: { fontSize: 12, fontWeight: '600' },
  activeLabel: { color: '#fff' },
  modalContainer: { flex: 1, backgroundColor: '#181818', padding: 20, alignItems: 'center' },
  display: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 10 },
  contactItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#444' },
  contactName: { fontSize: 18, color: 'white' },
  contactNumber: { fontSize: 14, color: '#999' },
  dialpad: { flexDirection: 'row', flexWrap: 'wrap', width: '75%', justifyContent: 'center' },
  key: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  keyText: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', width: '80%' },
  callButton: { backgroundColor: 'green', padding: 20, borderRadius: 50 },
  deleteButton: { backgroundColor: 'red', padding: 20, borderRadius: 50 },
  closeButton: { backgroundColor: 'gray', padding: 20, borderRadius: 50 },
});

export default BottomNavigator;
