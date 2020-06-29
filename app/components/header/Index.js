import React from 'react';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import {Header, Left, Body, Icon, Button, Title, Right, View} from 'native-base';
import styles from './Styles';
import {COLOR_SECONDARY, COLOR_WHITE} from "../../styles/common";
import {Text} from 'react-native';
import TitleText from '../titleText/Index';

class HeaderBack extends React.Component {

    constructor(props) {
        super(props);
    }

    headerLeft = () =>
    {
        return (
            <View style={[styles.mainHeader, this.props.style]}>
                <Image
                    style={[styles.image, this.props.logoStyle]}
                    source={require("fireofmusic/app/icons/fireofmusic.png")}//this.props.logo)} //require('/react-native/img/favicon.png')
                />
                <View style={{flex: 0, flexDirection:'row', alignItems: 'center'}}>
                    <TitleText style={{color:COLOR_WHITE, fontSize: 12, textAlign:'right'}}>{this.props.title}</TitleText>
                    <Button style={{backgroundColor:COLOR_SECONDARY, elevation: 0, alignSelf: 'flex-end'}} onPress={this.props.onPress}>
                        <Icon name='menu'/>
                    </Button>
                </View>
            </View>
        )
    }
    
    headerWebview = () =>
    {
        if(!this.props.jsCodeChat){
            return (
                <View style={[styles.mainHeader, this.props.style]}>
                    <View style={{flex: 0, flexDirection:'row', alignItems: 'flex-start' }}>
                        <Button style={{backgroundColor:COLOR_SECONDARY, elevation: 0, margin:0, alignSelf: 'flex-start'}} onPress={this.props.onPress}>
                            <Icon name='arrow-back' style={{marginLeft: 5, fontSize: 22}}/>
                        </Button>
                        <Button style={{backgroundColor:COLOR_SECONDARY, elevation: 0, margin:0, alignSelf: 'flex-start'}}>
                            <Image
                                style={this.props.logoStyle}
                                source={require("fireofmusic/app/icons/fireofmusic.png")}//this.props.logo)} //require('/react-native/img/favicon.png')
                            />
                        </Button>
                    </View>
                    <View style={{flex: 0, flexDirection:'row', alignItems: 'center'}}>
                        <TitleText style={{color:COLOR_WHITE, fontSize: 12, textAlign:'right'}}>{this.props.title}</TitleText>
                        <Button style={{backgroundColor:COLOR_SECONDARY, elevation: 0, alignSelf: 'flex-end'}} onPress={this.props.onPressLink}>
                            <Icon name='share-alt'/>
                        </Button>
                    </View>
                </View>
            )
        }
        else{
            return (
                <View>
                    <View style={[styles.mainHeader, this.props.style]}>
                        <View style={{flex: 0, flexDirection:'row', alignItems: 'flex-start' }}>
                            <Button style={{backgroundColor:COLOR_SECONDARY, elevation: 0, margin:0, alignSelf: 'flex-start'}} onPress={this.props.onPress}>
                                <Icon name='arrow-back' style={{marginLeft: 5, fontSize: 22}}/>
                            </Button>
                            <Button style={{backgroundColor:COLOR_SECONDARY, elevation: 0, margin:0, alignSelf: 'flex-start'}}>
                                <Image
                                    style={this.props.logoStyle}
                                    source={require("fireofmusic/app/icons/fireofmusic.png")}//this.props.logo)} //require('/react-native/img/favicon.png')
                                />
                            </Button>
                        </View>
                        <View style={{flex: 0, flexDirection:'row', alignItems: 'center'}}>
                            <TitleText style={{color:COLOR_WHITE, fontSize: 12, textAlign:'right'}}>{this.props.title}</TitleText>
                            <Button style={{backgroundColor:COLOR_SECONDARY, elevation: 0, alignSelf: 'flex-end'}} onPress={this.props.onRefresh}>
                                <Icon name='refresh'/>
                            </Button>
                        </View>

                    </View>
                </View>
            )
        }
    }
    headerCenter= () => 
    {
        return (
            <Header style={[styles.header, this.props.style]}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TitleText style={{color:COLOR_WHITE}}>{this.props.title}</TitleText>
                </View>
            </Header>
        )
    }

    headerWhatEver = () => 
    {
        return (
            <Header style={[styles.header, this.props.style]}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    {this.props.onPress ?
                        <View style={{justifyContent: 'center'}}>
                            <Button style={{backgroundColor:COLOR_SECONDARY, elevation: 0, margin:0}} onPress={this.props.onPress}>
                                <Icon name='arrow-back' style={{marginLeft: 5, fontSize: 22}}/>
                            </Button>
                        </View> :
                        <View/>
                    }
                    <View style={{flex:1, flexDirection: 'column', justifyContent: 'center'}}>
                        <TitleText style={{color:COLOR_WHITE}}>{this.props.title}</TitleText>
                    </View>
                </View>
            </Header>
        )
    }

    render() {
        if (this.props.left === "true") {
            return this.headerLeft()
        }
        else if(this.props.center === "true") {
            return this.headerCenter()
        }
        else if(this.props.webview === "true") {
            return this.headerWebview()
        }
        else {
            return this.headerWhatEver()
        }
    }
}

export default HeaderBack;
