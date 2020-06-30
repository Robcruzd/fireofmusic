import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import {View, Text, StyleSheet, PixelRatio, StatusBar, Platform} from 'react-native';
import configureStore from 'fireofmusic/app/redux/store/configureStore';
import Spinner from 'fireofmusic/app/components/spinner/Index';
import AsyncStorage from '@react-native-community/async-storage';
import {COLOR_SECONDARY, COLOR_WHITE, COLOR_GRAY} from './app/styles/common';
import firebase from 'react-native-firebase';
import Login from './app/screens/login/login.component';
import Menu from './app/screens/menu/menu.component';
import TopTracks from './app/screens/topTracks/topTracks.component';
import TopArtists from './app/screens/topArtists/topArtists.component';

const store = configureStore();
const RouterWithRedux = connect()(Router);

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            flag1: false,
            flag2: false
        }
    }

    componentDidMount() {
        this.setupGoogleSignin();
    }

    async setupGoogleSignin() {
        AsyncStorage.getItem('USER', (err, result) => {
            console.log(result);
            if(result==null){
                this.setState({flag1:true, flag2:true});
            }
            else {
                this.setState({flag2:true});
            }
        });
    }

    render() {
        if(this.state.flag1===false&&this.state.flag2===false){
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    <Spinner/>
                </View>
            );
        }
        //rutas para usario que no ha iniciado sesión
        else if(this.state.flag1===true&&this.state.flag2===true){
            return(
                <Provider store={store}>
                    <RouterWithRedux>
                        <Scene key="root" navigationBarStyle={styles.navigationBarStyle}>
                            <Scene key="login" component={Login} title='login' hideNavBar={true}/>
                            <Scene key="menu" component={Menu} title='menu' hideNavBar={true}/>
                            <Scene key="topTracks" component={TopTracks} title='topTracks' hideNavBar={true}/>
                            <Scene key="topArtists" component={TopArtists} title='topArtists' hideNavBar={true}/>
                        </Scene>
                    </RouterWithRedux>
                </Provider>
            );
        }
        //rutas para usuario que ya inició sesión
        else if(this.state.flag1===false&&this.state.flag2===true){
            return (
                <Provider store={store}>
                    <RouterWithRedux>
                        <Scene key="root" navigationBarStyle={styles.navigationBarStyle}>
                            <Scene key="menu" component={Menu} title='menu' hideNavBar={true}/>
                            <Scene key="login" component={Login} title='login' hideNavBar={true}/>
                            <Scene key="topTracks" component={TopTracks} title='topTracks' hideNavBar={true}/>
                            <Scene key="topArtists" component={TopArtists} title='topArtists' hideNavBar={true}/>
                        </Scene>
                    </RouterWithRedux>
                </Provider>
            );
        }
        else{
        }

    }
}

export default App;

const styles = StyleSheet.create({
    navigationBarStyle: {
        backgroundColor: COLOR_SECONDARY,
    }
});
