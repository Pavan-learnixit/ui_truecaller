import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation }) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleLogin = () => {
    if (mobile.length === 10) {
      navigation.navigate('OtpScreen');
    } else {
      alert('Please enter a valid mobile number');
    }
  };

  return (
    <LinearGradient colors={['#ff7eb3', '#ff758c']} style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      {/* <TextInput
        placeholder="First Name"
        placeholderTextColor="#fff"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      /> */}

      {/* <TextInput
        placeholder="Last Name"
        placeholderTextColor="#fff"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      /> */}

      <TextInput
        placeholder="Mobile Number"
        placeholderTextColor="#fff"
        style={styles.input}
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.normalText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;

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
    marginBottom: 15,
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
    color: '#ff758c',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  normalText: {
    color: '#fff',
    fontSize: 14,
  },
  signupText: {
    color: '#ffcc00',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
