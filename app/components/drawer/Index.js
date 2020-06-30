import React from 'react';
import {Text, View, Image, Alert} from 'react-native';
import {Container, Content, Header, Body, ListItem, Left} from 'native-base';
import styles from './Styles';
import {connect} from "react-redux";
import {init, logout, login} from 'fireofmusic/app/redux/actions/auth';
import {Actions} from "react-native-router-flux";
import {CustomIcon, CustomText} from 'fireofmusic/app/components/Index';
import {GoogleSignin} from 'react-native-google-signin';

class Drawer extends React.Component {

    constructor(props) {
        super(props)
    }

    signOut = () => {
        Alert.alert(
            '', 
            '¿Quieres cerrar sesión en Fire of music?',
            [
                {text: 'No', onPress:() => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Si', onPress:() => this.logOut()},
            ],
            { cancelable: false })
        return true;
    };

    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        this.setState({ isLoginScreenPresented: !isSignedIn });
    };

    async logOut(){
        this.props.onLogout();
        try {
                if(await GoogleSignin.isSignedIn()){
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                }
            } catch (error) {
                console.error(error);
            }
        Actions.reset("login");
        Actions.jump("login");
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={styles.drawerHeader}>
                    <Body style={styles.bodyStyle}>
                    {this.props.user.photo ?
                        <Image
                            style={styles.drawerImage}
                            source={{uri: this.props.user.photo}}
                        /> :
                        <Image
                            style={styles.drawerImage}
                            source={{uri: 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png'}}/>
                    }
                    <View style={styles.containerInfo}>
                        <Text style={styles.welcome}>Bienvenido(a)</Text>
                        {this.props.user.name ?
                            <Text style={styles.text}>{this.props.user.name.toUpperCase().replace(/ NULL/g,"")}</Text>
                            :
                            <Text style={styles.text}>Invitado Fire of Music</Text>
                        }
                        {this.props.user.username ?
                            <Text style={styles.textEmail}>{this.props.user.username}</Text>:
                            null
                        }
                    </View>
                    </Body>
                </Header>
                <Content>
                    <ListItem icon onPress={() => this.signOut()} accessibilityLabel= {"exit"}>
                        <Left>
                            <CustomIcon name="exit" style={{width:32, height:32}}/>
                        </Left>
                        <Body >
                        <Text>Cerrar Sesión</Text>
                        </Body>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInit: (userSession) => {
            dispatch(init(userSession));
        },
        onLogout: () => {
            dispatch(logout())
        },
        onLogin: (userSession) => {
            dispatch(login(userSession));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
