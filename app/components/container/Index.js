import React from 'react';
import { Container } from 'native-base';
import styles from './Styles';

class ContainerSuper extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container style={[styles.container, this.props.styleContainer]}>{ this.props.children }</Container>
    )
  }
}
export default ContainerSuper;
