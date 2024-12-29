import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const CallerDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>IN YOUR CONTACTS</Text>
        <TouchableOpacity>
          <Icon name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder for user image
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Amith M</Text>
        <Text style={styles.callStatus}>On a call</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="call" size={30} color="white" />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="chatbubbles" size={30} color="white" />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="call-outline" size={30} color="white" />
          <Text style={styles.actionText}>Voice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MatIcon name="edit" size={30} color="white" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="cash-outline" size={30} color="white" />
          <Text style={styles.actionText}>Pay</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.adContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x100' }}
          style={styles.adImage}
        />
        <TouchableOpacity style={styles.adButton}>
          <Text style={styles.adButtonText}>OPEN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>095356 56560</Text>
        <Text style={styles.infoSubText}>Mobile · Airtel</Text>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Call History</Text>
        <View style={styles.historyItem}>
          <Text style={styles.historyTime}>10:31</Text>
          <Text style={styles.historyDetails}>Outgoing · 6m 22s</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyTime}>Yesterday · 19:56</Text>
          <Text style={styles.historyDetails}>Outgoing · 2m 53s</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyTime}>Yesterday · 19:50</Text>
          <Text style={styles.historyDetails}>Incoming · 35s</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewAll}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.blockContainer}>
        <TouchableOpacity>
          <Text style={styles.blockText}>BLOCK & REPORT</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.commentText}>ADD COMMENT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007aff',
    padding: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  callStatus: {
    color: 'red',
    fontSize: 14,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    marginTop: 5,
  },
  adContainer: {
    backgroundColor: '#2c2c2c',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  adImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  adButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#007aff',
    borderRadius: 5,
  },
  adButtonText: {
    color: 'white',
    fontSize: 14,
  },
  infoContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoText: {
    color: 'white',
    fontSize: 18,
  },
  infoSubText: {
    color: 'gray',
    fontSize: 14,
  },
  historyContainer: {
    padding: 15,
  },
  historyTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  historyItem: {
    marginBottom: 10,
  },
  historyTime: {
    color: 'white',
  },
  historyDetails: {
    color: 'gray',
  },
  viewAll: {
    color: '#007aff',
    marginTop: 10,
  },
  blockContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blockText: {
    color: 'red',
  },
  commentText: {
    color: '#007aff',
  },
});

export default CallerDetails;
