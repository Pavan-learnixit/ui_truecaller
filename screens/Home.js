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
import CallLogs from 'react-native-call-log';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { commonColors } from '../components/Common';

const { DirectCall } = NativeModules;

const Home = ({ navigation }) => {
  const [callLogs, setCallLogs] = useState([]);
  const [openModel, setOpenModel] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalSearchQuery, setModalSearchQuery] = useState('');

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
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching call logs:', error);
        setIsLoading(false);
      }
    };

    requestPermissions();
  }, []);

  const filterCalls = (type) => {
    const filtered = callLogs.filter((log) =>
      (type === 'OUTGOING' && log.type.includes('OUT')) ||
      (type === 'INCOMING' && log.type.includes('INC')) ||
      (type === 'MISSED' && log.type.includes('MISSED'))
    );
    setFilteredLogs(filtered);
    setModalType(type);
    setModalVisible(true);
  };
  // console.log('Call Logs:', callLogs);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setFilteredLogs(
        callLogs.filter(
          (log) =>
            log.name?.toLowerCase().includes(query.toLowerCase()) ||
            log.phoneNumber.includes(query)
        )
      );
    } else {
      setFilteredLogs([]);
    }
  };

  const handleModalSearch = (query) => {
    setModalSearchQuery(query);
    if (query.trim()) {
      setFilteredLogs(
        callLogs
          .filter((log) => log.type.includes(modalType))
          .filter(
            (log) =>
              log.name?.toLowerCase().includes(query.toLowerCase()) ||
              log.phoneNumber.includes(query)
          )
      );
    } else {
      setFilteredLogs(callLogs.filter((log) => log.type.includes(modalType)));
    }
  };

  const handleCall = async (phoneNumber) => {
    try {
      DirectCall.callNumber(phoneNumber);
    } catch (error) {
      console.error('Error making a call:', error);
      Alert.alert('Error', 'Unable to make a direct call.');
    }
  };
  const closeModal = () => {
    setModalVisible(false);
    setFilteredLogs(callLogs); // Reset to full call logs
  };
  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name || item.phoneNumber}</Text>
        <Text style={styles.contactType}>
          <Ionicons
            name={item.type.includes('OUT') ? 'arrow-up' : 'arrow-down'}
            size={18}
            color={item.type.includes('MISSED') ? 'red' : 'black'}
          />{' '}
          {item.type}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleCall(item.phoneNumber)}>
        <Ionicons name="call" size={20} color="#000" />
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
                 <TouchableOpacity onPress={() => filterCalls('OUTGOING')}>
                          <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="arrow-up-outline" size={24} color="green" />
                            <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>
                              Outgoing calls
                            </Text>
                          </View>
                        </TouchableOpacity>
             <TouchableOpacity onPress={() => filterCalls('INCOMING')}>
                        <View style={{ flexDirection: 'row' }}>
                          <Ionicons name="arrow-down-outline" size={24} color="red" />
                          <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>
                            Incoming calls
                          </Text>
                        </View>
                      </TouchableOpacity>
            <TouchableOpacity onPress={() => filterCalls('MISSED')}>
                       <View style={{ flexDirection: 'row' }}>
                         <Ionicons name="call-outline" size={20} color="red" />
                         <Text style={{ fontSize: 18, marginBottom: 5, marginLeft: 8 }}>
                           Missed calls
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
  return (
    <LinearGradient colors={[commonColors.gradiend1, commonColors.light]} style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search numbers, names & more"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={handleSearch}
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

      {/* Filter Buttons */}
      {/* <View style={styles.filterButtons}>
        <TouchableOpacity style={styles.filterButton} onPress={() => filterCalls('OUTGOING')}>
          <Ionicons name="arrow-up-outline" size={20} color="green" />
          <Text>Outgoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => filterCalls('INCOMING')}>
          <Ionicons name="arrow-down-outline" size={20} color="blue" />
          <Text>Incoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => filterCalls('MISSED')}>
          <Ionicons name="call-outline" size={20} color="red" />
          <Text>Missed</Text>
        </TouchableOpacity>
      </View> */}

      {/* Call Log List */}
      <FlatList
        data={filteredLogs.length ? filteredLogs : callLogs}
        keyExtractor={(item, index) => `${item.phoneNumber}-${index}`}
        renderItem={renderContactItem}
        contentContainerStyle={styles.contactList}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" color="#5500dc" />
          ) : (
            <Text style={styles.emptyText}>No call logs available</Text>
          )
        }
      />

      {/* Modal for Filtered Logs */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{modalType} Calls</Text>
          <TextInput
            style={styles.modalSearchInput}
            placeholder="Search..."
            placeholderTextColor="#aaa"
            value={modalSearchQuery}
            onChangeText={handleModalSearch}
          />
          <FlatList
            data={filteredLogs}
            keyExtractor={(item, index) => `${item.phoneNumber}-${index}`}
            renderItem={renderContactItem}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchBar: { padding: 10 },
  searchInput: { backgroundColor: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'center', // Align buttons in center
    alignItems: 'center',
    gap: 0.1, // Reduces space between buttons
    marginVertical: 10,
  },
  
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 229, 255, 0.15)', // Neon blue transparency
    borderWidth: 1,
    borderColor: '#00E5FF', // Bright cyan border
    shadowColor: '#00E5FF', // Glow effect
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 5, // Ensures even spacing
  },
  
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF', // Bright white text
    marginLeft: 8,
  },
  
  
  contactList: { paddingHorizontal: 10 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 8, padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  contactInfo: { flex: 1, marginLeft: 10 },
  contactName: { fontSize: 16, fontWeight: 'bold' },
  contactType: { fontSize: 14, color: '#666' },
  modalContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalSearchInput: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  closeButton: { padding: 10, alignItems: 'center', backgroundColor: '#ddd', borderRadius: 8, marginTop: 10 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
  topButton: {
    alignItems: 'center',
    // backgroundColor: '#ccc',
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    borderWidth: 1,
    borderColor: '#00E5FF', // Bright cyan border
    shadowColor: '#00E5FF', // Glow effect
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    paddingBottom: 8,
    paddingTop: 8,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    // backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
});

export default Home;
