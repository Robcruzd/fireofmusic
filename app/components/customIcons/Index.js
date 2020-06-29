import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from './Styles';

var images = {
    logo: require('fireofmusic/app/icons/fireofmusic.png'),
    
}

class CustomIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playImage: '',
        }
    }

    componentWillMount() {
        this.setState({playImage: this.props.name});
    }

    render() {
        if(this.props.onPress){
            return (
                <TouchableOpacity onPress={this.props.onPress} style={this.props.styleContent}>
                    <Image
                        style={[styles.icon, this.props.style]}
                        source={images[this.props.name]}
                    />
                </TouchableOpacity>
            )
        }else {
            return (
                <Image
                    style={[styles.icon, this.props.style]}
                    source={images[this.state.playImage]}
                />
            )
        }
    }
}

export default CustomIcon;
