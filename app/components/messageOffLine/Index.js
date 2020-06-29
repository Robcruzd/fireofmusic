import React from 'react';
import { Text, View } from 'react-native';
import styles from './Styles';

class MessageOffline extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Text style={[styles.textTitle, this.props.style]}>{ this.props.children }</Text>
    )
  }
}
export default MessageOffline;
