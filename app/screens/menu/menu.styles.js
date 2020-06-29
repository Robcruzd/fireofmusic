import {StyleSheet} from 'react-native';
import { COLOR_YELLOW, COLOR_ORANGE } from '../../styles/common';

export default StyleSheet.create({
    menu: {
        width: '100%',
        height: '100%'
    },
    content: {
        display: "flex",
        flexDirection: "column"
    },
    touchable: {
        backgroundColor: COLOR_ORANGE,
        width: '90%',
        height: 150
    }
});
