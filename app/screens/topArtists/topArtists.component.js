import React, { Component } from 'react';
import { Header, ContentSuper, TitleText, ScadevListItem } from '../../components/Index';
import { View, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
import styles from './menu.styles.js';

class TopArtists extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    componentDidMount(){
        
    }

    render() {
        return (
            <View style={styles.menu}>
                <Header left={'true'} title={'TopArtists'}></Header>
                <ContentSuper style={styles.content}>
                    <ScadevListItem

                    ></ScadevListItem>
                </ContentSuper>
            </View>
        );
    }
}

export default TopArtists;