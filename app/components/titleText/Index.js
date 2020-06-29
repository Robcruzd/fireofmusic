import React from 'react';
import { Text, View } from 'react-native';
import styles from './Styles';

class TitleText extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
        <View style={[this.props.styleView]}>
            <Text style={[styles.textTitle, this.props.style]}>{ this.props.children }</Text>
        </View>
    )
  }
}
export default TitleText;
