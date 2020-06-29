const defaultState = {
    isLoggedIn: false,
    username: '',
    name: '',
    photo: null,
    token: '',
    refreshToken: '',
    expires_in: null,
    identification: '',
    typeIdentification: '',
    matchSdqs: '',
    latitude: null,
    longitude: null,
    address: ''
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: true,
                username: action.data.username,
                name: action.data.name,
                photo: action.data.photo,
                token: action.data.token,
                refreshToken: action.data.refreshToken,
                expires_in: action.data.expires_in,
                identification: action.data.identification,
                typeIdentification: action.data.identification,
                matchSdqs: action.data.matchSdqs,
                latitude: action.data.latitude,
                longitude: action.data.longitude,
                address: action.data.address
            });
        case 'LOGOUT':
            return Object.assign({}, state, {
                isLoggedIn: false,
                username: '',
                name: '',
                photo: '',
                token: '',
                refreshToken: '',
                expires_in: null,
                identification: '',
                typeIdentification: '',
                matchSdqs: '',
                latitude: null,
                longitude: null,
                address: ''
            });
        case 'INIT':
            return Object.assign({}, state, {
                isLoggedIn: true,
                username: action.data.username,
                name: action.data.name,
                photo: action.data.photo,
                token: action.data.token,
                refreshToken: action.data.refreshToken,
                expires_in: action.data.expires_in,
                identification: action.data.identification,
                typeIdentification: action.data.identification,
                matchSdqs: action.data.matchSdqs,
                latitude: action.data.latitude,
                longitude: action.data.longitude,
                address: action.data.address
            });

        default:
            return state;
    }
}
