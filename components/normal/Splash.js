import { View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;
    const opacityValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        checkLoginStatus(); // Check AsyncStorage for login success
    }, []);

    const checkLoginStatus = async () => {
        const success = await AsyncStorage.getItem('success');

        setTimeout(() => {
            if (success === 'true') {
                navigation.replace('Parent'); // Navigate to Parent if OTP was verified
            } else {
                navigation.replace('Language'); // Otherwise, go to Language selection
            }
        }, 4000);
    };

    useEffect(() => {
        const startAnimation = () => {
            Animated.sequence([
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(scaleValue, {
                            toValue: 1.2,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                        Animated.timing(scaleValue, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                    ]),
                    { iterations: 3 }
                ),
                Animated.parallel([
                    Animated.timing(scaleValue, {
                        toValue: 10,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityValue, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start();
        };

        startAnimation();
    }, [scaleValue, opacityValue]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
            <Animated.Image
                source={require('../../assets/images/logo.png')}
                style={{ transform: [{ scale: scaleValue }], opacity: opacityValue }}
            />
        </View>
    );
};

export default Splash;
