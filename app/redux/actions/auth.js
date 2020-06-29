import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';
var CryptoJS = require("crypto-js");

export const login = (userSession) => {
    console.log("action auth: ", userSession);
    var cipherToken = CryptoJS.AES.encrypt(userSession.token, 'zap31k4d3+e51tNEFSiX@o^-2+B[Y').toString();
    var cipherRefreshToken = CryptoJS.AES.encrypt(userSession.refreshToken, 'zap31k4d3+e51tNEFSiX@o^-2+B[Y').toString();
    var expires = userSession.expires_in + new Date().getTime() / 1000;
    let object = {
        username: userSession.username,
        name: userSession.name,
        photo: userSession.photo,
        token: cipherToken,
        refreshToken: cipherRefreshToken,
        expires_in: expires,
        identification: userSession.identification,
        typeIdentification: userSession.typeIdentification,
        matchSdqs: userSession.matchSdqs,
        latitude: userSession.latitude,
        longitude: userSession.longitude,
        address: userSession.address
    };
    AsyncStorage.setItem('USER', JSON.stringify(object));
    return {
        type: 'LOGIN',
        data: object
    };
};

export const logout = () => {
    let object = null;
    AsyncStorage.getItem("recoverPass", (err, result) => {
        AsyncStorage.clear();
        AsyncStorage.setItem("recoverPass", result);
        AsyncStorage.setItem("uniquekey", JSON.stringify({"value": "true"}));
    })
    return {
        type: 'LOGOUT',
        data: object
    };
};

export const init = (userSession) => {
    let object = {
        username: userSession.username,
        name: userSession.name,
        photo: userSession.photo,
        token: userSession.token,
        refreshToken: userSession.refreshToken,
        expires_in: userSession.expires_in,
        identification: userSession.identification,
        typeIdentification: userSession.typeIdentification,
        matchSdqs: userSession.matchSdqs,
        latitude: userSession.latitude,
        longitude: userSession.longitude,
        address: userSession.address
    };
    AsyncStorage.setItem('USER', JSON.stringify(object));
    return {
        type: 'INIT',
        data: object
    };
};

export const setId = (userSession) => {
    let object = {
        username: userSession.username,
        name: userSession.name,
        photo: userSession.photo,
        token: userSession.token,
        refreshToken: userSession.refreshToken,
        expires_in: userSession.expires_in,
        identification: userSession.identification,
        typeIdentification: userSession.typeIdentification,
        matchSdqs: userSession.matchSdqs,
        latitude: userSession.latitude,
        longitude: userSession.longitude,
        address: userSession.address
    };
    AsyncStorage.mergeItem('USER', JSON.stringify(object));
    return {
        type: 'LOGIN',
        data: object
    };
};


