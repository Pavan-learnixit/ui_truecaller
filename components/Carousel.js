import * as React from 'react';
import { Button, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import commonStyles from '../assets/css/Style';
import BottomPanel from './BottomPanel';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/root'

import Icon from 'react-native-vector-icons/Ionicons';
import { BaseButton } from 'react-native-gesture-handler';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { languages } from '../assets/data/Data';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { translation } from '../assets/data/utils';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Dimensions.get('window').width;

function Slider({ navigation, route }) {
    const { language } = route.params;

    const [isBottomSheetVisible, setBottomSheetVisible] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState(language);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        saveSelectedLang(language)
        console.log('Selected Language:', language);
        const datasss =    AsyncStorage.getItem("LANG")
     console.log("ASYNC DATA", datasss)
    };

    const carouselItems = [
        {
            bgColor: 'green',
            title: selectedLanguage === "English" 
              ? translation[1].English 
              : selectedLanguage === "ಕನ್ನಡ" 
              ? translation[1].Kannada 
              : selectedLanguage === "हिंदी" 
              ? translation[1].Hindi 
              : selectedLanguage === "తెలుగు" 
              ? translation[1].Telagu 
              : selectedLanguage === "தமிழ்" 
              ? translation[1].Tamil 
              : null,
            icon: <Icon name='person-sharp' size={100} color="white" />
          },
          
        { bgColor: 'red',   title: selectedLanguage === "English" 
            ? translation[2].English 
            : selectedLanguage === "ಕನ್ನಡ" 
            ? translation[2].Kannada 
            : selectedLanguage === "हिंदी" 
            ? translation[2].Hindi 
            : selectedLanguage === "తెలుగు" 
            ? translation[2].Telagu 
            : selectedLanguage === "தமிழ்" 
            ? translation[2].Tamil 
            : null, icon: <Icon name='alert-circle-outline' size={100} color="white" /> },
        { bgColor: 'blue', title: selectedLanguage === "English" 
            ? translation[3].English 
            : selectedLanguage === "ಕನ್ನಡ" 
            ? translation[3].Kannada 
            : selectedLanguage === "हिंदी" 
            ? translation[3].Hindi 
            : selectedLanguage === "తెలుగు" 
            ? translation[3].Telagu 
            : selectedLanguage === "தமிழ்" 
            ? translation[3].Tamil 
            : null, icon: <MatIcon name="message" size={100} color="white" /> },
    ];

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const contactsPermission = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
                const callLogPermission = await request(PERMISSIONS.ANDROID.READ_CALL_LOG);
                console.log('Contacts permission:', contactsPermission);

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

    const saveSelectedLang =  async(selectedLanguage)=>{
        await AsyncStorage.setItem('LANG', selectedLanguage);
     
    }

    return (
        <View style={[commonStyles.container, styles.container]}>
            <View style={commonStyles.topContainer}>
                <Text style={commonStyles.title}>Truecaller</Text>
            </View>
            <View style={[commonStyles.middleContainer, styles.middleContainer]}>
                <Carousel
                    loop
                    width={width}
                    height={width}
                    autoPlay
                    data={carouselItems}
                    scrollAnimationDuration={3000}
                    renderItem={({ item }) => (
                        <View style={styles.carouselItemContainer}>
                            <Text style={styles.text}>{item.title}</Text>
                            <View style={[styles.card, { backgroundColor: item.bgColor }]}>
                                {item.icon}
                            </View>
                        </View>
                    )}
                />
            </View>
            <View style={[commonStyles.bottomContainer, styles.bottomContainer]}>
                <Text>
                    Change language to <Text style={commonStyles.footerText}>{selectedLanguage}</Text> -
                    <Text onPress={() => setBottomSheetVisible(true)} style={commonStyles.footerText}> More</Text>
                </Text>
                <BaseButton
                    rippleColor={'#f8f8f8'}
                    style={styles.getStartedButton}
                    onPress={() => {
                        requestPermissions();
                        navigation.navigate('Parent');
                    }}
                >
                    <Text style={styles.getStartedText}>{selectedLanguage=="English"?translation[0].English:selectedLanguage=="ಕನ್ನಡ"?translation[0].Kannada:selectedLanguage=="हिंदी"?translation[0].Hindi:selectedLanguage=="తెలుగు"?translation[0].Telagu:selectedLanguage=="தமிழ்"?translation[0].Tamil:null}</Text>
                </BaseButton>
                <Text style={styles.privacyText}>
                    By clicking on 'Get Started' if you reside in EU, EEA or Switzerland you accept the
                    <Text style={commonStyles.footerText}> Terms of service</Text> and if you reside in any
                    other country you accept the
                    <Text style={commonStyles.footerText}> Terms of service and Privacy Policy</Text>
                </Text>
            </View>
            <BottomPanel
                visible={isBottomSheetVisible}
                onClose={() => setBottomSheetVisible(false)}
                data={languages}
                onSelect={handleLanguageSelect}
                title="Choose a Language"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
    },
    middleContainer: {
        paddingVertical: 90,
        paddingHorizontal: 0,
    },
    carouselItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: width / 2,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    bottomContainer: {
        height: 200,
        justifyContent: 'space-around',
    },
    getStartedButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        width: width / 1.5,
        alignItems: 'center',
    },
    getStartedText: {
        color: 'white',
        textTransform: 'capitalize',
        fontSize: 18,
    },
    privacyText: {
        fontSize: 12,
        color: 'gray',
        width: width / 1.2,
    },
});

export default Slider;