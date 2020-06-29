import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import styles from './Styles';
import COLOR_PRIMARY from '../../styles/common';

class Spinner extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={[styles.spinnerComponent, this.props.styleContent]}>
                <ActivityIndicator size="large" color = {COLOR_PRIMARY} />
                <Text style={this.props.textStyle}>Cargando...</Text>
            </View>
        )
    }
}
export default Spinner;
