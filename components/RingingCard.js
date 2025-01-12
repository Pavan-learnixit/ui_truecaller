import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image, Dimensions } from 'react-native';
import Ioniccon from 'react-native-vector-icons/Ionicons'


const width = Dimensions.get('window').width;

const RingingCard = ({ item }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const startPulsing = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleValue, {
                        toValue: 1.2, // Increase size
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleValue, {
                        toValue: 1, // Return to original size
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        startPulsing();
    }, [scaleValue]);

    return (
        // <View style={styles.cardContainer}>
            <View style={[styles.carouselItemsContainer]}>
                                    <Text style={styles.text}>{item.title}</Text>
                                        
                                {/* </View> */}
                                <View style={[styles.card, styles.image, { backgroundColor: item.bgColor}]}>
                                    <View style={[{ alignItems:"center" }]}>
                                        <View style={[styles.iconBg, { backgroundColor : item.iconBg ? item.iconBg : '#445987' }]}>
                                            {item.icon}
                                        </View>
                                        <Text style={[styles.text, {color:"#fff"}]}>{item.desc}</Text>
                                    </View>
        {!item.desc.includes("M") &&
            <Animated.View style={[styles.ring, { transform: [{ scale: scaleValue }] }]}>
                <Ioniccon name='call' size={20} color={item.iconBg ? item.iconBg : '#445987'}/>           
            </Animated.View>
        }
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 20
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
      getStartedText:{
        color: 'white',
        fontSize: 18,
        // fontWeight: 'bold',
        textTransform: 'uppercase'
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
    ring: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconBg:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: '#445987',
    }
});

export default RingingCard;
