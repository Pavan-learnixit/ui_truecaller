import React, { useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, ToastAndroid, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/images/LearnixIT.png';

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleContinue = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp !== '1234') {
      ToastAndroid.show('Invalid OTP!', ToastAndroid.LONG);
      return;
    }
    await AsyncStorage.setItem('success', 'true'); // Store success in AsyncStorage
    ToastAndroid.show('OTP Verified!', ToastAndroid.LONG);
    navigation.navigate('Parent')
  };


  return (
    <LinearGradient colors={['#1E98CA', '#000']} style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flexBasis: '30%' }}>
        <Text style={styles.title}>Enter OTP</Text>
        <Image source={Logo} style={{ width: 80, height: 80, borderRadius: 60 }} />
        <Text style={styles.subtitle}>We've sent a verification code to your phone</Text>
      </View>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn't receive the OTP? <Text style={styles.resendLink}>Resend</Text>
      </Text>
    </LinearGradient>
  );
};

export default OtpScreen;

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
    // marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    // marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  input: {
    width: 50,
    height: 55,
    borderWidth: 1,
    borderColor: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
  },
  button: {
    backgroundColor: '#1E98CA',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resendText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 14,
  },
  resendLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
