import React, { Component } from 'react';
import { Header, ContentSuper, TitleText, DrawerCustom} from '../../components/Index';
import { View, TouchableOpacity, Keyboard } from 'react-native';
import { Drawer } from 'native-base';
import styles from './menu.styles.js';
import { Actions } from 'react-native-router-flux';
import {init, logout, login} from 'fireofmusic/app/redux/actions/auth';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class Menu extends Component {

    componentDidMount(){
        AsyncStorage.getItem('USER', (err, result) => {
            console.log(result);
            if(result!==null){
                this.props.onInit(result);
            }
        });
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open();
        Keyboard.dismiss();
    };

    render() {
        return (
            <Drawer
                    ref={(ref) => {
                        this.drawer = ref;
                    }}
                    content={ <DrawerCustom  onClose={this.closeDrawer}/>}
                    onClose={() => this.closeDrawer()}>
                <View style={styles.menu}>
                    <Header left={'true'} title={'Menú'} onPress={() => this.openDrawer()}></Header>
                    <ContentSuper style={styles.content}>
                        <TouchableOpacity style={styles.touchable}
                            onPress={() => Actions.topTracks()}>
                            <TitleText>TOP TRACKS</TitleText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchable}
                            onPress={() => Actions.topArtists()}>
                            <TitleText>TOP ARTISTS</TitleText>
                        </TouchableOpacity>
                    </ContentSuper>
                </View>
            </Drawer>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);