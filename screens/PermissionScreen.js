import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import SignupScreen from './SignupScreen';


const PermissionScreen = ({ navigation }) => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const callLogPermission = await request(PERMISSIONS.ANDROID.READ_CALL_LOG);
        const contactsPermission = await request(PERMISSIONS.ANDROID.READ_CONTACTS);

        if (callLogPermission === RESULTS.GRANTED && contactsPermission === RESULTS.GRANTED) {
          setPermissionsGranted(true);
        } else {
          Alert.alert('Permissions Required', 'Please grant the required permissions to continue.');
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    };

    requestPermissions();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Permissions</Text>

      <View style={styles.section}>
        <Icon name="phone" size={20} color="#007AFF" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Calls</Text>
          <Text style={styles.description}>
            Limited information about your calls, such as phone number and outgoing/incoming calls, 
            is collected by us to display your call history, verify your number through a missed call 
            from us and to help you manage your calls.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Icon name="user" size={20} color="#007AFF" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Contacts</Text>
          <Text style={styles.description}>
            Information regarding your contacts, such as phone number and related name, is accessed by us, 
            but kept on your device, to show Caller ID, enhance your calling experience by providing features 
            such as "frequently used numbers" and "favourite contacts", and to allow you to manage your contacts 
            within the app. Please note that we do not store any information about your contacts on our servers.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Icon name="comment" size={20} color="#007AFF" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Messages</Text>
          <Text style={styles.description}>
            Limited information about your messages, such as message IDs, metadata of messages, and related media types, 
            is accessed by us, but kept on your device, to identify and block spam, help you organize your messages, 
            and to provide message notifications and reminders for transactional messages. Please note that we do 
            not store any information about your messages.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Your contacts are safe and will not be shared with anyone</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: permissionsGranted ? '#007AFF' : 'gray' }]}
        onPress={() => {
          if (permissionsGranted) {
            navigation.navigate('SignupScreen');
          } else {
            Alert.alert('Permissions Required', 'Please grant the required permissions before continuing.');
          }
        }}
        disabled={!permissionsGranted}
      >
        <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    backgroundColor: '#EAF6FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#007AFF',
    fontSize: 14,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PermissionScreen;
