import {StyleSheet} from 'react-native';
import { COLOR_WHITE_W } from '../../styles/common';

export default StyleSheet.create({
    content: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        maxWidth: 300
    },
    containerCustomIcon: {
        backgroundColor: COLOR_WHITE_W,
        width: '100%',
        marginRight: 20,
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: '#ddd',
        shadowColor: "#ccc",
        shadowOffset: { width: 3, height : 3 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 1,
        padding: 8,
    },
    customIcon: {
        width:18,
        height:18,
        marginLeft:13,
        position:'absolute'
    },
    customText: {
        fontWeight: 'bold',
        width:'100%'
    },
    viewContainer: {flex: 0, width: '100%', alignItems: 'center', justifyContent: 'center', height:'100%'},
    customIconLogo: {marginBottom:80, width:363, height:50}
});
