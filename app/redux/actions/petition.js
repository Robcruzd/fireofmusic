import Petition from 'supercade/app/services/sdqs/petition/Petition';
import api from 'supercade/app/services/sdqs/login/api';
import {Actions} from 'react-native-router-flux';
import {login, logout} from 'supercade/app/redux/actions/auth';
var CryptoJS = require("crypto-js");

export function getDataSuccess(data, point) {
    return {
        type: 'FETCHING_DATA_SUCCESS',
        data,
        point
    }
}

export function getToken(typeService, point, user, body ) {
    return (dispatch) => {
        var session = user;
        if (session.expires_in > new Date().getTime() / 1000) {
            let bytes  = CryptoJS.AES.decrypt(session.token, 'zap31k4d3+e51tNEFSiX@o^-2+B[Y');
            let token = bytes.toString(CryptoJS.enc.Utf8);
            Petition.createRestService(typeService, point, token, body ).then((res) => {
                dispatch(getDataSuccess(res, point))
            })
        } else {
            let bytes  = CryptoJS.AES.decrypt(session.refreshToken, 'zap31k4d3+e51tNEFSiX@o^-2+B[Y');
            let refreshToken = bytes.toString(CryptoJS.enc.Utf8);
            api.getRefreshToken(refreshToken).then((res) => {
                console.log("res refresh: ",res)
                if (res.data.access_token) {
                    let userSession = {
                        username: session.username,
                        name: session.name,
                        photo: session.photo,
                        token: res.data.access_token,
                        refreshToken: res.data.refresh_token,
                        expires_in: res.data.expires_in,
                        identification: session.identification
                    }
                    dispatch(login(userSession))
                    Petition.createRestService(typeService, point, res.access_token, body).then((res) => {
                        dispatch(getDataSuccess(res, point))
                    })
                } else if(res.data.error_description === "Refresh token is expired."){
                    Actions.gaboMainLogin();
                    Actions.reset("gaboMainLogin");
                    dispatch(logout());
                }
            })
        }
    }
}
