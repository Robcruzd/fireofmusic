import React, { Component } from 'react';
import { Header, ContentSuper, TitleText } from '../../components/Index';
import { View, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
import styles from './menu.styles.js';

class Menu extends Component {
    render() {
        return (
            <View style={styles.menu}>
                <Header left={'true'} title={'Menú'}></Header>
                <ContentSuper style={styles.content}>
                    <TouchableOpacity style={styles.touchable}>
                        <TitleText>TOP MUSIC</TitleText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchable}>
                        <TitleText>TOP MUSIC</TitleText>
                    </TouchableOpacity>
                </ContentSuper>
            </View>
        );
    }
}

export default Menu;