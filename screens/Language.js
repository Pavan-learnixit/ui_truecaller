import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const LanguageSelection = ({ navigation }) => {

  useFocusEffect(
    React.useCallback(() =>{
      requestPermissions();
    },[])
  )

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        // Request permissions for contacts
        const contactsPermission = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
        const callLogPermission = await request(PERMISSIONS.ANDROID.READ_CALL_LOG);
  
        if (
          contactsPermission === RESULTS.GRANTED &&
          callLogPermission === RESULTS.GRANTED
        ) {
          console.log('Permissions granted for contacts and call logs');
        } else {
          console.log('Permissions denied');
        }
      } catch (error) {
        console.error('Error requesting permissions', error);
      }
    }
  };
  
  const languages = [
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'mr', label: 'मराठी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'ur', label: 'اردو' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Welcome to Truecaller</Text>
        <Text style={styles.subtitle}>Pick your language to get started</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.middleContainer}>
        <View style={styles.languageGrid}>
          {languages.map((language, index) => (
            <TouchableOpacity key={index} style={styles.languageButton} onPress={() => navigation.navigate('Info')}>
              <Text style={styles.languageText}>{language.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.footerText}>Choose another language</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 10,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    textAlign: "center"
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap:30
  },
  languageButton: {
    width: 100,
    height: 50,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 5,
    elevation: 2,
  },
  languageText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  footerText: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
    textAlign : "center"
  },
  container: {
    flex: 1, // Full screen height
    backgroundColor: '#f8f8f8',
    margin:10
  },
  topContainer: {
    height: 60, // Fixed height for the top container
    // backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flexGrow: 1, // Dynamically fill available space
    padding: 20,
    flex:1,
    // backgroundColor: '#2196f3',
    alignItems: 'center',
    flexDirection : 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  bottomContainer: {
    height: 40, // Fixed height for the bottom container
    // backgroundColor: '#ff5722',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LanguageSelection;
