import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList,NativeModules } from 'react-native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../../screens/Home';
import SMSReader from './SMSReader';

const Bottom = createBottomTabNavigator();
const DummyScreen = () => <View />; // ✅ FIX: Dummy Component
const { DirectCall } = NativeModules;

const BottomNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [number, setNumber] = useState('');


  const handlePress = (digit) => setNumber((prev) => prev + digit);
  const handleDelete = () => setNumber(number.slice(0, -1));

  const handleCall = async () => {
    try {
      if (!number.trim()) {
        Alert.alert('Error', 'Please enter a valid phone number.');
        return;
      }
  
      DirectCall.callNumber(String(number)); // Ensure it is a string
    } catch (error) {
      console.error('Error making a call:', error);
      Alert.alert('Error', 'Unable to make a direct call.');
    }
  };
  
  return (
    <>
      <Bottom.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused }) => {
            let iconName = route.name === 'Call' ? 'call' : route.name === 'Dialer' ? 'dialpad' : 'message';
            let color = focused ? '#007AFF' : 'black';
            return <Icon name={iconName} size={28} color={color} />;
          },
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.activeLabel]}>{route.name}</Text>
          ),
          headerShown: false,
        })}
      >
        <Bottom.Screen name="Call" component={Home} />

        {/* ✅ FIX: Dummy Screen, Opens Modal */}
        <Bottom.Screen
          name="Dialer"
          component={DummyScreen} // Dummy component
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
      <Modal visible={modalVisible} animationType="slide" transparent={true} >
        <View style={styles.modalContainer}>
   

          {/* 📟 Dialpad Display */}
          <Text style={styles.display}>{number || 'Enter Number'}</Text>

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
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    // backgroundColor: '#fff',
    backgroundColor: 'rgba(0, 229, 255, 2)', // Neon blue transparency

    height: 55,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  tabLabel: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
  },
  activeLabel: {
    color: '#007AFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#181818',
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 2)', // Neon blue transparency

  },
  searchBar: {
    width: '90%',
    backgroundColor: '#222',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 10,
    marginVertical: 5,
  },
  contactName: {
    fontSize: 16,
    color: 'white',
  },
  contactNumber: {
    fontSize: 14,
    color: '#999',
  },
  display: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
  },
  dialpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '75%',
    justifyContent: 'center',
    marginVertical: 10,
    
  },
  key: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(12, 57, 62, 0.2)', // Neon blue with transparency
    margin: 5,
    borderRadius: 40,
    borderWidth: 3, // ✅ Thicker border for visibility
    borderColor: '#00E5FF', // Bright cyan border
    shadowColor: '#00E5FF', // ✅ Stronger glow effect
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, // ✅ More visible shadow
    shadowRadius: 10, // ✅ Larger glow radius
    elevation: 10, // ✅ For Android shadow effect
  },

  keyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  keySubText: {
    fontSize: 10,
    color: 'white',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  callButton: {
    backgroundColor: '#00A000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 50,
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 50,
  },
});

export default BottomNavigator;
