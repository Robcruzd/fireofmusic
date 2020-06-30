import {StyleSheet} from 'react-native';
import { COLOR_YELLOW, COLOR_ORANGE, COLOR_PRIMARY } from '../../styles/common';

export default StyleSheet.create({
    menu: {
        width: '100%',
        height: '100%'
    },
    content: {
        display: "flex",
        width: '100%',
        flexDirection: "column"
    },
    touchable: {
        alignSelf: 'center',
        backgroundColor: COLOR_PRIMARY,
        width: '90%',
        marginVertical: 5,
        height: 150,
        borderRadius: 10,
        borderWidth: 2
    }
});
