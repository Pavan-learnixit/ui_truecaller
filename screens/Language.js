import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, NativeModules } from 'react-native';
import commonStyles from '../assets/css/Style';
import { languages } from '../assets/data/Data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { commonColors } from '../components/Common';

const LanguageSelection = ({ navigation }) => {

  useEffect(() => {
    const { CallDetectionModule } = NativeModules;

    // Request overlay permission and log the result.
    CallDetectionModule.requestOverlayPermission()
      .then(result => console.log("Overlay Permission:", result))
      .catch(err => console.error("Error in requestOverlayPermission:", err));

    // Start call detection and log the result.
    CallDetectionModule.startCallDetection()
      .then(result => console.log("Call Detection:", result))
      .catch(err => console.error("Error in startCallDetection:", err));
  }, []);

  return (
    <LinearGradient colors={[commonColors.gradiend1, commonColors.white]} style={commonStyles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={commonStyles.title}>Welcome to Lifeline</Text>
        <Text style={commonStyles.subtitle}>Pick your language to get started</Text>
      </View>
      
      <ScrollView contentContainerStyle={[commonStyles.middleContainer, {paddingVertical: 90}]}>
        <View style={styles.languageGrid}>
          {languages.map((language, index) => (
            <TouchableOpacity key={index} style={styles.languageButton} onPress={() => {
              AsyncStorage.setItem("LANG", language.label)
              navigation.navigate('Info', { language: language.label })}}>
              <Text style={styles.languageText}>{language.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={commonStyles.bottomContainer}>
        <Text style={styles.footerText}>Choose another language</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
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
  }
});

export default LanguageSelection;
