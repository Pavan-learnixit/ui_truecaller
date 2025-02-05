import React from 'react';
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
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CallLogs from 'react-native-call-log';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useSharedValue, useDerivedValue} from 'react-native-reanimated';
import Favourates from './Favourates';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = ({navigation}) => {
  const [callLogs, setCallLogs] = React.useState([]);
 const [openModal, setOpenModel] = React.useState(false);
  // Shared value to handle call logs safely
  const sharedCallLogs = useSharedValue([]);

  React.useEffect(() => {
    const fetchCallLogs = async () => {
      if (Platform.OS === 'android') {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        );

        if (!hasPermission) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Call log permission denied');
            return;
          }
        }

        try {
          const logs = await CallLogs.loadAll();

          setCallLogs(logs);
          sharedCallLogs.value = logs; // Update shared value
        } catch (error) {
          console.error('Error fetching call logs:', error);
        }
      } else {
        console.log('Call logs are not supported on iOS');
      }
    };

    fetchCallLogs();
  }, []);

  // Use derived value to read from shared value
  const derivedCallLogs = useDerivedValue(
    () => sharedCallLogs.value,
    [sharedCallLogs],
  );

  const renderContactItem = ({item}) => (
    <View style={styles.contactItem}>
      {item.image ? (
        <Image source={{uri: item.image}} style={styles.contactImage} />
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
      <Text style={styles.contactTime}>{item.duration} sec</Text>
    </View>
  );
 function renderModel() {
    return (
      <Modal visible={openModal} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            // backgroundColor: transperent,
          }}>
          <View
            style={{backgroundColor: 'white', padding: 15, borderRadius: 10}}>
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={() => setOpenModel(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="arrow-up-outline" size={24} color="green" />
                <Text style={{fontSize: 18, marginBottom: 5, marginLeft: 8}}>
                  Outgoing calls
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="arrow-down-outline" size={24} color="red" />

                <Text style={{fontSize: 18, marginBottom: 5, marginLeft: 8}}>
                  Incoming calls
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="call-outline" size={20} color="red" />
                <Text style={{fontSize: 18, marginBottom: 5, marginLeft: 8}}>
                  Missed calls
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="ban-outline" size={20} color="red" />
                <Text style={{fontSize: 18, marginBottom: 5, marginLeft: 8}}>
                  Blocked calls
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="trash-outline" size={20} color="red" />

                <Text style={{fontSize: 18, marginBottom: 5, marginLeft: 8}}>
                  Delete all calls
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
            <Ionicons name="call-outline" size={20} color="black" />
            <Text style={{fontSize: 18, marginBottom: 5,marginLeft: 8}}>Set default sim</Text>
            </View>
              
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
            <Ionicons name="clipboard-outline" size={20} color="black" />

            <Text style={{fontSize: 18, marginBottom: 5,marginLeft: 8}}>
                Paste
              </Text>
            </View>
             
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
            <Ionicons name="settings-outline" size={20} color="black" />

            <Text style={{fontSize: 18, marginBottom: 5,marginLeft: 8}}>
                Settings
              </Text>
            </View>  
             
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search numbers, names & more"
          placeholderTextColor="#aaa"
        />
       
<TouchableOpacity style={{   
  // flex: 1,
  position:'absolute',
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'flex-end', // Push to the right
    alignItems: 'center', // Center vertically
    padding: 10,
    top:9,
    right:10
     }}
     onPress={() => setOpenModel(true)}>
<Ionicons  name="ellipsis-vertical" size={24} color="#000" />

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
        data={callLogs} // Use derived value for rendering
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderContactItem}
        contentContainerStyle={styles.contactList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#f1f1f1',
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
    backgroundColor: '#f9f9f9',
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
  },
});

export default Home;
