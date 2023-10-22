import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const setDeviceId = async () => {
    let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
    if(fetchUUID) return;

    let uuid = uuidv4();
    await SecureStore.setItemAsync('secure_deviceid', uuid);
}

export const getDeviceId = async () => {
    let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
    
    return fetchUUID;
}
