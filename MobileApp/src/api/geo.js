import Geolocation from '@react-native-community/geolocation';

const getCurrentPosition = (success) => {
    Geolocation.getCurrentPosition(success);
}

export {getCurrentPosition};