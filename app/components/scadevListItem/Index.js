import React from 'react';
import {Icon, ListItem, View, Text} from 'native-base';
import styles from './Styles';
import {CustomIcon, CustomText} from 'supercade/app/components/Index';
import {COLOR_GREEN, COLOR_GRAY, COLOR_RED} from 'supercade/app/styles/common';

class ScadevListItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ListItem onPress={this.props.onPress}
                      style={[styles.listItem, this.props.style]}>
                <View style={styles.iconTextContainer}>
                    {this.props.uriImage?
                        <Image style={this.props.styleIcon} source={{uri: this.props.uriImage}}/>:
                        <CustomIcon name={this.props.icon} style={this.props.styleIcon}/>
                    }
                    <View style={{flexDirection: "column", flex: 1, marginLeft: 8}}>
                        <View style={{flex:0, flexDirection:'row', alignContent:'center'}}>
                            <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.text}</Text>
                        </View>
                        {this.props.children ?
                            <Text
                                style={[styles.textBody, this.props.textBodyStyle]}>{this.props.children}</Text>:null}
                    </View>
                </View>
                {this.props.arrow &&
                    <Icon name="chevron-thin-right" type="Entypo" style={[{color: COLOR_GRAY}, this.props.arrowStyle]}/>
                }
            </ListItem>
        )
    }
}

export default ScadevListItem;
