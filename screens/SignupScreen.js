import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../assets/images/LearnixIT.png';

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');

  // Function to store user data in AsyncStorage
  const storeUserData = async () => {
    try {
      const userData = { firstName, lastName, mobile };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('User data saved:', userData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Handle sign up and save data
  const handleSignup = async () => {
    if (firstName && lastName && mobile.length === 10) {
      await storeUserData(); // Store user data in AsyncStorage
      navigation.navigate('VerifyOtp');
    } else {
      Alert.alert('Error', 'Please enter all details correctly.');
    }
  };

  return (
    <LinearGradient colors={['#1E98CA', '#000']} style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Lifeline</Text>
        <Image source={Logo} style={{ width: 80, height: 80, borderRadius: 60 }} />
      </View>
      <View style={{ alignItems: 'center', width: '100%' }}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#fff"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#fff"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Enter mobile number..."
          placeholderTextColor="#fff"
          style={styles.input}
          keyboardType="numeric"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.normalText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SignupScreen;

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 12,
    width: '85%',
    marginBottom: 20,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  button: {
    backgroundColor: '#1E98CA',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  normalText: {
    color: '#fff',
    fontSize: 14,
  },
  loginText: {
    color: '#ffcc00',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
