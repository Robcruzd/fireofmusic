import React from 'react';
import {Image} from 'react-native';
import {Header, Icon, Button, View} from 'native-base';
import styles from './Styles';
import {COLOR_SECONDARY, COLOR_WHITE} from "../../styles/common";
import TitleText from '../titleText/Index';

class HeaderBack extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.mainHeader, this.props.style]}>
                <Image
                    style={[styles.image, this.props.logoStyle]}
                    source={require("fireofmusic/app/icons/fireofmusic.png")}
                />
                <View style={{flex: 0, flexDirection:'row', alignItems: 'center'}}>
                    <TitleText style={styles.titleText}>{this.props.title}</TitleText>
                    <Button style={styles.button} onPress={this.props.onPress}>
                        <Icon name='menu'/>
                    </Button>
                </View>
            </View>
        )
    }
}

export default HeaderBack;
