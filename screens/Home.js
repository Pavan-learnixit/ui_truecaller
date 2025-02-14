import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Modal,
  ActivityIndicator,
  NativeModules
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CallLogs from 'react-native-call-log';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSharedValue } from 'react-native-reanimated';
import Favourates from './Favourates';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Splash from '../components/normal/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { commonColors } from '../components/Common';

const { DirectCall } = NativeModules;

const Home = ({ navigation }) => {
  const [callLogs, setCallLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const [data, setData] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [filterType, setFilterType] = useState(null); // 'OUTGOING', 'INCOMING', 'MISSED', 'BLOCKED'
  const sharedCallLogs = useSharedValue([]);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          fetchCallLogs();
        }
      } else {
        fetchCallLogs();
      }
    };

    const fetchCallLogs = async () => {
      try {
        const logs = await CallLogs.loadAll();
        setCallLogs(logs);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching call logs:', error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    requestPermissions();
  }, []);


  // Function to filter logs based on search input
  useEffect(() => {
    let filtered = filteredLogs.length ? filteredLogs : callLogs;
    setData(callLogs);

    if (searchQuery.trim()) {
      filtered = filtered.filter((log) =>
        log.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.phoneNumber.includes(searchQuery)
      );
    }

    if (filterType) {
      filtered = filtered.filter((log) => {
        return (
          (filterType === 'OUTGOING' && log.type.includes('OUT')) ||
          (filterType === 'INCOMING' && log.type.includes('IN')) ||
          (filterType === 'MISSED' && log.type.includes('MISSED')) ||
          (filterType === 'BLOCKED' && log.type.includes('BLOCKED'))
        );
      });
    }
    setFilteredLogs(filtered);
  }, [searchQuery, filterType, callLogs]);

  const requestCallPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Call Permission',
          message: 'This app needs access to your phone to make calls.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleCall = async (phoneNumber) => {
    const hasPermission = await requestCallPermission();
    console.log('hasPermission', hasPermission);

    if (!hasPermission) {
      await requestCallPermission();
      Alert.alert('Permission Denied', 'Cannot make a call without permission.');
      return;
    }

    try {
      DirectCall.callNumber(phoneNumber); // Initiates the call directly
    } catch (error) {
      console.error('Error making a call:', error);
      Alert.alert('Error', 'Unable to make a direct call.');
    }
  };

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.contactImage} />
      ) : (
        <View style={styles.contactInitial}>
          <Text style={styles.contactInitialText}>{item.name?.[0] || 'U'}</Text>
        </View>
      )}
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name || item.phoneNumber}</Text>
        <Text style={[styles.contactType]}>
          <FeatherIcon
            name={
              item.type?.includes('OUT') ? 'arrow-up-right' : 'arrow-down-left'
            }
            size={20}
          />
          {item.type}
        </Text>
      </View>
      <TouchableOpacity style={styles.contactTime} onPress={() => handleCall(item.phoneNumber)}>
        <Icon name="call" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );

  function renderModel() {
    const handleLogout = () => {
      AsyncStorage.setItem('success', 'false'); // Set success to false
      navigation.navigate('Login'); // Navigate to login screen
    };
    return (
      <Modal visible={openModel} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          }}>
          <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10 }}>
            <TouchableOpacity
              style={{ alignItems: 'flex-end' }}
              onPress={() => setOpenModel(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterType('OUTGOING')}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="arrow-up-outline" size={24} color="green" />
                <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>
                  Outgoing calls
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterType('INCOMING')}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="arrow-down-outline" size={24} color="red" />
                <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>
                  Incoming calls
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterType('MISSED')}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="call-outline" size={20} color="red" />
                <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>
                  Missed calls
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterType('BLOCKED')}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="ban-outline" size={20} color="red" />
                <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>
                  Blocked calls
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="trash-outline" size={20} color="red" />
                <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>
                  Delete all calls
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="call-outline" size={20} color="black" />
                <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>Set default sim</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="clipboard-outline" size={20} color="black" />
                <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>
                  Paste
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="settings-outline" size={20} color="black" />
                <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  return (
    <LinearGradient colors={[commonColors.gradiend1, commonColors.light]} style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search numbers, names & more"
          placeholderTextColor="#aaa"
          autoCapitalize='none'
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: 10,
            top: 9,
            right: 10
          }}
          onPress={() => setOpenModel(true)}>
          <Ionicons name="ellipsis-vertical" size={24} color="#000" />
        </TouchableOpacity>
        {renderModel()}
      </View>

      {/* Top Navigation Buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => navigation.navigate('Contacts')}>
          <Ionicons name="people" size={24} color="black" />
          <Text style={styles.topButtonText}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => navigation.navigate('Favourates')}>
          <Ionicons name="heart" size={24} color="black" />
          <Text style={styles.topButtonText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Ionicons name="videocam" size={24} color="black" />
          <Text style={styles.topButtonText}>Voice HD</Text>
        </TouchableOpacity>
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
        data={filteredLogs.length ? filteredLogs : callLogs}
        keyExtractor={(item, index) =>
          item?.id?.toString() || `${item.phoneNumber}-${index}`
        }
        renderItem={renderContactItem}
        contentContainerStyle={styles.contactList}
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#5500dc" />
            </View>
          ) : null
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    // backgroundColor: '#f1f1f1',
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
    // backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  topButton: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    paddingBottom: 8,
    paddingTop: 8,
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
    paddingRight: 20
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;