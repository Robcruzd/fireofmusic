import React from 'react';
import { Content } from 'native-base';
import styles from './Styles';

class ContentSuper extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Content style={[styles.container, this.props.style]}>{ this.props.children }</Content>
    )
  }
}
export default ContentSuper;
