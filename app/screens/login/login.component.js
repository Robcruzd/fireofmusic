import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {
    View,
    StyleSheet,
} from 'react-native';
//import api from 'supercade/app/services/sdqs/login/api';
import {GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
//import {login} from 'supercade/app/redux/actions/auth';
import NetInfo from '@react-native-community/netinfo';
import {
    ContainerSuper,
    MessageOffLine,
    Spinner,
    CustomIcon
} from 'fireofmusic/app/components/Index';
import SplashScreen from "react-native-splash-screen";
import Toast from "react-native-simple-toast";
import {MESSAGE_OFF_LINE2} from 'fireofmusic/app/config/constants';
import {GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID} from "fireofmusic/app/config/constants";

import firebase from 'react-native-firebase';
import {Icon, Button} from "native-base";
//let Analytics = firebase.analytics();
// import NotificationFirebase from 'supercade/app/components/notifications';

class Login extends Component {

    //Oculpa el Splash cuando la interfaz se termina de desplegar
    componentDidMount() {
        SplashScreen.hide();
    }

    //Constructor de la Clase
    constructor(props) {
        super(props);

        this.state = {
            validate: true,
            message: null,
            loading: false,
            isModalPoliticsVisible: true,
            loginbte: false
        }

        //Se registra la interfaz de Inicio de Sesión en Google Analytics
        // Analytics.setCurrentScreen('Inicio de Sesión', 'MainLogin');
    }

    componentWillMount() {
        //Se verifica si hay Conexión a internet antes de desplegar la interfaz
        NetInfo.fetch().then((connectionInfo) => {
            if (connectionInfo.type === 'none') {
                Toast.showWithGravity(MESSAGE_OFF_LINE2, Toast.LONG, Toast.CENTER);
            }
        });

        //Se configura el Client ID para iOS del registro por Google
        GoogleSignin.configure({
            iosClientId: GOOGLE_IOS_CLIENT_ID
        })
    }

    //Se inicia sesión con Google
    async googleAuth() {
        this.setState({loading: true});
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        await GoogleSignin.configure({
            webClientId: GOOGLE_WEB_CLIENT_ID,
            iosClientId: GOOGLE_IOS_CLIENT_ID,
            offlineAccess: false
        });
        console.log("tryng with gmail")
        GoogleSignin.signIn()
            .then((user) => {
                var loginToken = {
                    "username": "",
                    "password": "",
                    "google_id_token": user.idToken,
                    "facebook_id_token": ""
                }
                console.log("user gmail: ", user);
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
                this.setState({
                    loading: false,
                    message: 'Tenemos problemas para recuperar la sesión de Google, intente más tarde'
                });
            })
            .done();
    }

    // Somewhere in your code
    signIn = async () => {
        try {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        await GoogleSignin.configure({
                webClientId: GOOGLE_WEB_CLIENT_ID,
                iosClientId: GOOGLE_IOS_CLIENT_ID,
                offlineAccess: false
            });
            console.log("tryng with gmail")
        const userInfo = await GoogleSignin.signIn();
        console.log("user gmail: ", userInfo);
        this.setState({ userInfo });
        Actions.menu();
        } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } else {
            // some other error happened
        }
        }
    };

    render() {
        return (
            <ContainerSuper>
                <View style={{flex: 0, width: '100%', alignItems: 'center', justifyContent: 'center', height:'100%'}}>
                    <View style={styles.content}>
                        {/*<Text style={styles.textTitle}>{TITLE_LOGIN}</Text>*/}
                        <CustomIcon name={"logo"} style={{marginBottom:80, width:250, height:50}}/>
                        
                        <View style={{width: '100%'}}>
                        <GoogleSigninButton
                            style={{ width: 312, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Light}
                            onPress={this.signIn}
                            disabled={this.state.loading} />

                        </View>
                        {this.state.loading ?
                            <Spinner styleContent={{paddingTop:35}}
                                     textStyle={{paddingTop:10}}/> :
                            null
                        }
                    </View>
                </View>
            </ContainerSuper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (userSession) => {
            dispatch(login(userSession));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    content: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        maxWidth: 300
    },
    modalContainer: {
        backgroundColor: 'white',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8
    },
    flex: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonStyles: {
        padding: 8,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    textButtonStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555'
    },
    textTitle: {
        fontSize: 27,
        color: '#003e65',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    separatorContainer: {
        flex:0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        width:'100%',
        marginBottom: 30,
        marginTop: 20
    }
})
