import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const LanguageSelection = () => {
  const languages = [
    { code: 'hi', label: 'हिंदी' },
    { code: 'en', label: 'English' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'mr', label: 'मराठी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'ur', label: 'اردو' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Truecaller</Text>
      <Text style={styles.subtitle}>Pick your language to get started</Text>
      <View style={styles.languageGrid}>
        {languages.map((language, index) => (
          <TouchableOpacity key={index} style={styles.languageButton}>
            <Text style={styles.languageText}>{language.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.footerText}>Choose another language</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
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
  },
});

export default LanguageSelection;
