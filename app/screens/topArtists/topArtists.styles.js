import {StyleSheet} from 'react-native';
import { COLOR_PRIMARY } from '../../styles/common';

export default StyleSheet.create({
    topArtists: {
        width: '100%',
        height: '100%',
        flex:1,
        flexDirection: 'column'
    },
    viewText: {
        backgroundColor:COLOR_PRIMARY, alignItems:'center',  padding:20, width:'100%'
    }
});
