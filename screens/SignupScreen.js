import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LoginScreen from './LoginScreen';
import OtpScreen from './OtpScreen';

const SignupScreen = ({ navigation }) => {
//   const [mobile, setMobile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSignup = () => {
    if (firstName && lastName && mobile.length === 10) {
    //   alert('Login Successful!');
    navigation.navigate('OtpScreen')
    } else {
      alert('Please enter all details correctly.');
    }
  };
//   const handleSignup = () => {
//     if (mobile.length === 10) {
//       navigation.navigate('OtpScreen');
//     } else {
//       alert('Please enter a valid mobile number');
//     }
//   };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <Text style={styles.title}>Lifeline</Text>
      
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
        placeholderTextColor="#bbb"
        style={styles.input}
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.normalText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    backgroundColor: '#fff',
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
    color: '#6a11cb',
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
