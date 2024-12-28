import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

const BottomSheet = ({ visible, onClose, data, onSelect, title }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: height * 0.4, // Slide to 30% of the screen height
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        onClose(); // Ensure the Modal closes when animation completes
      });
    }
  }, [visible]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => {
        onSelect(item.label); // Pass the selected item to the parent
        onClose(); // Close the bottom sheet
      }}
    >
      <Text style={styles.languageText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex:0}}>
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose} // Handle back button press on Android
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />
        <Animated.View style={[styles.bottomSheet, { top: slideAnim }]}>
          <Text style={styles.header}>{title || 'Select an Option'}</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </Animated.View>
      </View>
    </Modal>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    bottom: 0
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  languageItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  languageText: {
    fontSize: 16,
  },
});
