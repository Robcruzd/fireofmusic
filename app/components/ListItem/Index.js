import React from 'react';
import {Icon, ListItem, View, Text} from 'native-base';
import styles from './Styles';
import {CustomIcon} from 'fireofmusic/app/components/Index';
import {COLOR_GRAY} from 'fireofmusic/app/styles/common';
import { Image } from 'react-native';

class CustomListItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ListItem onPress={this.props.onPress}
                      style={[styles.listItem, this.props.style]}>
                <View style={styles.iconTextContainer}>
                    {this.props.uriImage ?
                        <Image style={[styles.image, this.props.styleIcon]} source={{
                            uri: this.props.uriImage,
                          }}></Image>:
                        <CustomIcon name={this.props.icon} style={this.props.styleIcon}></CustomIcon>
                    }
                    <View style={styles.viewtext}>
                        <View style={styles.viewtitle}>
                            <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.text}</Text>
                        </View>
                        {this.props.children ?
                            <Text
                                style={[styles.textBody, this.props.textBodyStyle]}>Listeners: {this.props.children}</Text>:null}
                    </View>
                </View>
                {this.props.arrow &&
                    <Icon name="chevron-thin-right" type="Entypo" style={[{color: COLOR_GRAY}, this.props.arrowStyle]}/>
                }
            </ListItem>
        )
    }
}

export default CustomListItem;
