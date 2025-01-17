import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Home from '../assets/images/home.png';
import Family from '../assets/images/family.png';
import Family1 from '../assets/images/family1.png';
import Contacts from '../components/contact/Contacts'
const Favourates = ({navigation}) => {
  return (
    <View>
      {/* <Text>Favourates</Text> */}
      <Image
        source={Home}
        style={{width: 150, height: 150, borderRadius: 100, left: 150, top: 40}}
      />
      <Image
        source={Family}
        style={{width: 150, height: 150, borderRadius: 100}}
      />
      <Image
        source={Family1}
        style={{
          width: 150,
          height: 150,
          borderRadius: 100,
          left: 160,
          bottom: 70,
        }}
      />
      <Text
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 18,
          fontWeight: '500',
          marginBottom:10
        }}>
        Quickly call your favourate contacts
      </Text>
      <TouchableOpacity  onPress={() => navigation.navigate('Contacts')}>
        <Text style={{textAlign:'center', color:'blue',fontWeight: '500',}}>Add a Favourite</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Favourates;
