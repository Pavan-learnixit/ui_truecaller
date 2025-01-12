import { View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const Splash = ({navigation}) => {
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Language')
        },4000)
    },[])

    const scaleValue = useRef(new Animated.Value(1)).current; // Initial scale
    const opacityValue = useRef(new Animated.Value(1)).current; // Initial opacity

    useEffect(() => {
        const startAnimation = () => {
            // Subtle pulsating effect
            Animated.sequence([
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(scaleValue, {
                            toValue: 1.2, // Slightly increase size
                            duration: 500,
                            useNativeDriver: true,
                        }),
                        Animated.timing(scaleValue, {
                            toValue: 1, // Return to original size
                            duration: 500,
                            useNativeDriver: true,
                        }),
                    ]),
                    { iterations: 3 } // Run pulsation 3 times
                ),
                // Fill screen at the end
                Animated.parallel([
                    Animated.timing(scaleValue, {
                        toValue: 10, // Scale large enough to fill screen
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityValue, {
                        toValue: 0, // Fade out for a smooth effect
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start();
        };

        startAnimation();
    }, [scaleValue, opacityValue]);

    const animatedStyle = {
        transform: [{ scale: scaleValue }], // Scale the image
        opacity: opacityValue, // Adjust opacity
    };

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:'center' }}>
      <Animated.Image
                source={require('../../assets/images/logo.png')}
                style={[ animatedStyle]}
            />
    </View>
  )
}

export default Splash