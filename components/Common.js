import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

export function RenderItem({ item, onPress, route }) {
    return(
  <TouchableOpacity onPress={() => onPress(item, route)}>

  <View style={styles.contactItem}>
    {item.image ? (
      <Image source={{ uri: item.image }} style={styles.contactImage} />
    ) : (
      <View style={styles.contactInitial}>
        {item.displayName ? 
        <Text style={styles.contactInitialText}>{item.displayName[0]}</Text> : 
            <Icon name="person" size={30} color="#000" />
        } 
        
      </View>
    )}
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{item.displayName || item.address}</Text>
      {item.body && 
            <Text style={{ fontSize: 14, marginVertical: 5 }}>{truncateText(item.body, 40)}</Text>
        }
      {/* <Text style={styles.contactType}>{item.type}</Text> */}
    </View>
    {/* <Text style={styles.contactTime}>{item.time}</Text> */}
  </View>
  </TouchableOpacity>
)}

const styles = StyleSheet.create({
contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactInitial: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInitialText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactType: {
    fontSize: 14,
    color: '#666',
  },
  contactTime: {
    fontSize: 14,
    color: '#999',
  },
})