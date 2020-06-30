import AsyncStorage from '@react-native-community/async-storage';
var CryptoJS = require("crypto-js");

export const login = (userSession) => {
    console.log("action auth: ", userSession);
    var cipherToken = CryptoJS.AES.encrypt(userSession.token, 'zap31k4d3+e51tNEFSiX@o^-2+B[Y').toString();
    let object = {
        email: userSession.email,
        name: userSession.name,
        photo: userSession.photo,
        token: cipherToken
    };
    AsyncStorage.setItem('USER', JSON.stringify(object));
    return {
        type: 'LOGIN',
        data: object
    };
};

export const logout = () => {
    let object = null;
    AsyncStorage.clear();
    return {
        type: 'LOGOUT',
        data: object
    };
};

export const init = (userSession) => {
    let object = {
        email: userSession.email,
        name: userSession.name,
        photo: userSession.photo,
        token: userSession.token
    };
    return {
        type: 'INIT',
        data: object
    };
};

export const setId = (userSession) => {
    let object = {
        email: userSession.email,
        name: userSession.name,
        photo: userSession.photo,
        token: userSession.token
    };
    AsyncStorage.mergeItem('USER', JSON.stringify(object));
    return {
        type: 'LOGIN',
        data: object
    };
};


