const defaultState = {
    isLoggedIn: false,
    email: '',
    name: '',
    photo: null,
    token: ''
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: true,
                email: action.data.email,
                name: action.data.name,
                photo: action.data.photo,
                token: action.data.token
            });
        case 'LOGOUT':
            return Object.assign({}, state, {
                isLoggedIn: false,
                email: '',
                name: '',
                photo: '',
                token: ''
            });
        case 'INIT':
            return Object.assign({}, state, {
                isLoggedIn: true,
                email: action.data.email,
                name: action.data.name,
                photo: action.data.photo,
                token: action.data.token
            });

        default:
            return state;
    }
}
