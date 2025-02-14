import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../assets/images/LearnixIT.png';

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');

  const handleLogin = () => {
    if (mobile.length === 10) {
      navigation.navigate('VerifyOtp');
    } else {
      alert('Please enter a valid mobile number');
    }
  };

  return (
    <LinearGradient colors={['#1E98CA', '#63BC46']} style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Welcome Back</Text>
        <Image source={Logo} style={{ width: 80, height: 80, borderRadius: 60 }} />
      </View>
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
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
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
    marginBottom: 15,
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
