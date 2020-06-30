import { StyleSheet } from 'react-native';
import { COLOR_SECONDARY, COLOR_WHITE } from '../../styles/common';
export default StyleSheet.create({
  mainHeader: {
    flex:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:COLOR_SECONDARY,
    paddingLeft:10
  },
  image: {
    width: 254, height: 35, justifyContent: 'center'
  },
  header: {
    backgroundColor: COLOR_SECONDARY
  },
  titleText: {color:COLOR_WHITE, fontSize: 12, textAlign:'right'},
  button: {backgroundColor:COLOR_SECONDARY, elevation: 0, alignSelf: 'flex-end'}
});
