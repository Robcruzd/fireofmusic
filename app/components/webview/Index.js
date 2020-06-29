import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Keyboard, Platform, ActivityIndicator, StyleSheet, Text, 
    Share, Clipboard, Animated, Easing} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Actions, NavigationActions} from 'react-native-router-flux';
import {ShadowView, Header, Spinner, ContainerSuper, MessageOffLine, ContentSuper,
     ProgressWebview} from 'supercade/app/components/Index';
import {MESSAGE_OFF_LINE2, MESSAGE_OFF_LINE} from "../../config/constants";
import Toast from "react-native-simple-toast";
import firebase from 'react-native-firebase';
import { COLOR_PRIMARY, BORDER_RADIUS } from '../../styles/common';
//import LottieView from "lottie-react-native";
// import { anim } from './loader.json';
let Analytics = firebase.analytics();
const WEBVIEW_REF = 'progressWebview';


class Webviewgnrl extends Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        mainUrl = this.props.uri;
        this.state = {
            validate: true, 
            visible: true, 
            url: this.mainUrl,
            progress: new Animated.Value(0)
        }
        Analytics.setCurrentScreen('Guía de tramites', 'Web');
    }

    componentWillMount() {
        NetInfo.fetch().then((connectionInfo) => {
            if (connectionInfo.type === 'none'){
                Toast.showWithGravity(MESSAGE_OFF_LINE2, Toast.LONG, Toast.CENTER);
                this.setState({validate: false});
            }
        });
    }

    componentDidMount() {
        // Animated.timing(this.state.progress, {
        //     toValue: 1,
        //     duration: 5000,
        //     easing: Easing.linear,
        // }).start();

        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({validate: true});
        }
    };

    // closeDrawer = () => {
    //     this.drawer._root.close()
    // };
    // openDrawer = () => {
    //     Analytics.logEvent('DrawerNews');
    //     this.drawer._root.open();
    //     Keyboard.dismiss();
    // };
    ActivityIndicatorLoadingView(){
        return (
            <View style={styles.ActivityIndicatorStyle}>
                <ActivityIndicator
                    color= {COLOR_PRIMARY}
                    size='large'
                />
                <Text>Cargando...</Text>
            </View>
        );
      }

    onShare = async () => {
       Share.share({
            title: this.props.titleProcedure,
            message: 'Encuentra aquí la información relacionada con el trámite o servicio: '+ this.props.titleProcedure,
            url: this.props.uri
        });
    }

    onRefresh (){     
        this.ref.reload();
    }

    onCopyLink = ()=> {
        Clipboard.setString(this.props.uri);
        Toast.showWithGravity("¡El enlace a '"+ this.props.titleProcedure +"' se ha copiado, exitosamente!" , Toast.LONG, Toast.CENTER);
    }
     
    render() {
        //let jsCode = "document.querySelector('body').style.backgroundColor = 'red';";
        //let jsCode = "$(document).ready(function(){var chatAlc = $('#chatPanelDiv').html(); $('body').html(chatAlc); return true;})";
        const jsCode = `
                var scrollEventHandler = () =>
                {
                    window.scroll(0, window.pageYOffset)
                };
                setTimeout(() => {
                    var scrap = document.getElementById("chatPanelDiv").innerHTML
                    document.querySelector('body').innerHTML = scrap;
                    const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
                    document.addEventListener('scroll', scrollEventHandler, false);
                    document.getElementById('chatPanelDiv').style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    return true;
                }, 50);
            `;
        var url = this.props.uri;
        var jsCodeDefault = `
            const sectionsToHide = [
                'footer', 
                'header', 
                '.search_home',
                '.breadcrumbs-container',
                '#menu-header',
                '.menu-gts',
                '.related-container',
                '#chatBtn'
            ];

            hideSections=()=>{
                sectionsToHide.forEach(actionDOM);
            }

            actionDOM = (item, index) =>{
                if (document.querySelector(item) !== null) {
                    document.querySelector(item).style.display = 'none';
                }
            }

            setTimeout(() => {
                hideSections();
                return true;
            }, 50);
            (function() {
                setTimeout(() => {
                    hideSections();
                    return true;
                }, 50);
            })();



        `;
        if(url.includes("#"))
        {
            jsCodeDefault = jsCodeDefault + 
            `
                var url = window.location.href;
                var hash = url.substring(url.indexOf("#")+1);
                 setTimeout(() => {
                    window.scrollTo(0,document.getElementById(hash).offsetTop); 
                }, 200);
            `;
        }
        return (
            <View style={{flex: 1}}>
                    <ContainerSuper>
                        <Header
                            webview="true"
                            title={this.props.title}
                            logo={this.logo}
                            onPress={() => {
                                Actions.pop();
                            }}
                            logoStyle={{width: 120, height: 30, padding: 0, paddingTop:10, alignSelf: 'flex-start'}}
                            onPressLink={this.onShare} //  Linking.openURL(this.props.uri)}}
                            onRefresh={()=>this.onRefresh()}
                            onCopyLink={this.onCopyLink}
                            style={{paddingTop: (Platform.OS === 'android'?0:42)}}
                            url={this.props.uri}
                            jsCodeChat={(this.props.jsCodeChat)?true:false}
                        />

                        {this.state.validate ?
                            <ProgressWebview
                                ref={r => this.ref = r}
                                color={'#8BC34A'}
                                height={5}
                                style={styles.WebViewStyle}
                                source={{uri: this.props.uri}}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                mixedContentMode={'compatibility'}
                                renderLoading={this.ActivityIndicatorLoadingView} 
                                startInLoadingState={true}  
                                injectedJavaScript={jsCodeDefault}
                            /> :
                            <ContentSuper style={{paddingTop:0}}>
                                <ShadowView>
                                    <MessageOffLine>{MESSAGE_OFF_LINE}</MessageOffLine>
                                </ShadowView>
                            </ContentSuper>
                        }
                    </ContainerSuper>
            </View>
        );
    }
}
const styles = StyleSheet.create(
    {
     
    WebViewStyle:
    {
       justifyContent: 'center',
       alignItems: 'center',
       flex:1
    },
     
    ActivityIndicatorStyle:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:COLOR_PRIMARY
    }
});
export default connect()(Webviewgnrl);
