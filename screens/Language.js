import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import commonStyles from '../assets/css/Style';
import { languages } from '../assets/data/Data';

const LanguageSelection = ({ navigation }) => {

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.topContainer}>
        <Text style={commonStyles.title}>Welcome to Truecaller</Text>
        <Text style={commonStyles.subtitle}>Pick your language to get started</Text>
      </View>
      
      <ScrollView contentContainerStyle={[commonStyles.middleContainer, {paddingVertical: 90}]}>
        <View style={styles.languageGrid}>
          {languages.map((language, index) => (
            <TouchableOpacity key={index} style={styles.languageButton} onPress={() => navigation.navigate('Info', { language: language.label })}>
              <Text style={styles.languageText}>{language.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={commonStyles.bottomContainer}>
        <Text style={styles.footerText}>Choose another language</Text>
      </View>
    </View>
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
