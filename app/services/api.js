import RNFetchBlob from 'rn-fetch-blob';
import { MESSAGE_OFF_LINE, TOP_ARTISTS, TOP_TRACKS } from '../config/constants';


//SERVICIOS Api RESR wordpress
var api = {
    getTopArtists() {
        return RNFetchBlob.config({
            trusty: true
        }).fetch("GET", TOP_ARTISTS)
            .then((res) => {
                console.log('topartists: ',res);
                if (res.respInfo.status === 200 || res.respInfo.status === 404) {
                    response = {
                        data: res.json(),
                        validate: true
                    }
                    return response;
                } else {
                    response = {
                        data: MESSAGE_OFF_LINE,
                        validate: false
                    }
                    return response;
                }
            }).catch(e => {
                console.log('error', e);
                response = {
                    data: MESSAGE_OFF_LINE,
                    validate: false
                }
                return response;
            });
    },

    getTopTracks() {
        var response;
        return RNFetchBlob.config({
            trusty: true
        }).fetch("GET", TOP_TRACKS)
            .then((res) => {
                console.log('toptracks: ',res);
                if (res.respInfo.status === 200 || res.respInfo.status === 404) {
                    response = {
                        data: res.json(),
                        validate: true
                    }
                    return response;
                } else {
                    response = {
                        data: MESSAGE_OFF_LINE,
                        validate: false
                    }
                    return response;
                }
            }).catch(e => {
                console.log('error', e);
                response = {
                    data: MESSAGE_OFF_LINE,
                    validate: false
                }
                return response;
            });
    },

}

module.exports = api;
