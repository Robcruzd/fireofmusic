import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    listItem: {
        marginLeft: 0, 
        paddingRight: 0, 
        paddingTop: 10, 
        paddingBottom: 10, 
        paddingLeft: 0},
    iconTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightIconStyle: {
        right: 0
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'left',
        maxWidth: '95%'
    },
    textBody: {
        fontSize: 13,
        textAlign: 'left'
    }
});
