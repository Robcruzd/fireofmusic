import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {
    View, Text, Image
} from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import {login} from 'fireofmusic/app/redux/actions/auth';
import {
    ContainerSuper,
    Spinner,
    CustomIcon
} from '../../components/Index.js';
import {GOOGLE_WEB_CLIENT_ID} from "fireofmusic/app/config/constants";
import styles from './login.styles';
import { Button } from 'native-base';

class Login extends Component {

    //Constructor de la Clase
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    // Somewhere in your code
    signIn = async () => {
        this.setState({loading:true});
        try {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        await GoogleSignin.configure({
                webClientId: GOOGLE_WEB_CLIENT_ID,
                offlineAccess: false
            });
            console.log("tryng with gmail")
            const user = await GoogleSignin.signIn();
            console.log("user gmail: ", user);
            let userSession = {
                email: user.user.email,
                name: user.user.name,
                photo: user.user.photo,
                token: user.idToken
            }
            this.props.onLogin(userSession);
            Actions.reset('menu');
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

    goMenu = () => {
        Actions.menu();
    }

    render() {
        return (
                <ContainerSuper>
                    <View style={styles.viewContainer}>
                        <View style={styles.content}>
                            <CustomIcon name={"logo"} style={styles.customIconLogo}/>
                            
                            <View style={{width: '100%'}}>
                            <GoogleSigninButton
                                style={{ width: 300, height: 48 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Light}
                                onPress={this.signIn}
                                disabled={this.state.loading} />
                            </View>
                            <Button onPress={() => Actions.menu()} iconLeft  style={styles.containerCustomIcon} >
                                <Image source={{uri: 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png'}} 
                                    style={styles.customIcon}/>
                                <Text style={styles.customText}>Iniciar como Invitado</Text>
                            </Button>
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

