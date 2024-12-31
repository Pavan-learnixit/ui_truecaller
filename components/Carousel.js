/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import commonStyles from '../assets/css/Style';
import BottomPanel from './BottomPanel';
import Icon from 'react-native-vector-icons/Ionicons';
import { BaseButton } from 'react-native-gesture-handler';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { languages } from '../assets/data/Data';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('window').width;

function Slider({ navigation, route }) {
    const { language } = route.params;  

    const [isBottomSheetVisible, setBottomSheetVisible] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState(language);
      

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        console.log('Selected Language:', language);
    };

    const carouselItems = [
        { bgColor: 'green', title: 'Know who is calling you', icon: <Icon name='person-sharp' size={100} color="white" /> },
        { bgColor: 'red', title: 'Protect from spam', icon:<Icon name='alert-circle-outline' size={100} color="white" /> },
        { bgColor: 'blue', title: 'Categories you SMS inbox for spam alert', icon: <MatIcon name="message" size={100} color="white" /> },
      ];

    const requestPermissions = async () => {
    if (Platform.OS === 'android') {
        try {
        // Request permissions for contacts
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

    return (
        <View style={[commonStyles.container, {margin: 0}]} >
            <View style={commonStyles.topContainer}>
                <Text style={commonStyles.title}>Truecaller</Text>
            </View>
            <View style={[commonStyles.middleContainer, styles.carouselContainer]}>
            <Carousel
                loop
                width={width}
                height={width}
                autoPlay={true}
                data={carouselItems}
                scrollAnimationDuration={3000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <View style={[styles.carouselItemsContainer]}>
                        <Text style={styles.text}>{item.title}</Text>
                            <View style={[styles.card, styles.image, { backgroundColor: item.bgColor}]}>
                                {item.icon}
                            </View>
                    </View>
                )}
            />
            </View>
            <View style={[commonStyles.bottomContainer, styles.carouselBottomCotainer]}>
                <Text>Change language to <Text style={commonStyles.footerText}>{selectedLanguage}</Text>  -  <Text onPress={()=> setBottomSheetVisible(true)} style={commonStyles.footerText}>More</Text>
                </Text>
                <BaseButton 
                    children={
                        <Text style={{ color: 'white', textTransform:'capitalize', fontSize: 18}}>
                            Get started
                        </Text>
                    }
                    rippleColor={'#f8f8f8'}
                    style={{backgroundColor: 'green', padding: 10, borderRadius: 10, width: width/1.5, alignItems: 'center'}}
                    onPress={() => {
                        requestPermissions();
                        navigation.navigate('Parent')
                    }}
                />
                <Text style={styles.privacyText}>By clicking on 'Get Started' if you reside in EU, EEA or Switzerland you accept the <Text style={commonStyles.footerText}>Terms of service</Text> and if you reside in any other country you accept the <Text style={commonStyles.footerText}>Terms of service and Privacy Policy</Text></Text>
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
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      image: {
        width: width / 2,
        borderRadius: 16,
        // marginBottom: 16,
      },
      carouselContainer:{
        paddingVertical: 90,
        paddingHorizontal: 0
      },
      carouselItemsContainer:{
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    carouselBottomCotainer:{
        height: 200, 
        justifyContent: 'space-around'
    },
      text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
      },
      privacyText: {
        fontSize: 12,
        color: 'gray',
        justifyContent: 'flex-start',
        width: width/1.2,
      },
    })

export default Slider;