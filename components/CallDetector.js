import { NativeModules, PermissionsAndroid } from 'react-native';

const CallDetector = NativeModules.CallDetector;

export const startCallDetection = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW
    ]);
    
    if (
      granted['android.permission.READ_PHONE_STATE'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.SYSTEM_ALERT_WINDOW'] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      CallDetector.startService();
    }
  }
};