import {StyleSheet} from 'react-native';
import {COLOR_WHITE, COLOR_PRIMARY, BORDER_RADIUS, FONT_BOLD} from 'fireofmusic/app/styles/common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE

    },
    bodyStyle:
    {
        flexDirection:'row', 
        paddingLeft: 0
    },
    containerInfo:
    {
        flexDirection:'column', 
        paddingLeft: 5,
        width: '78%',
        flex: 3
    },
    drawerHeader: {
        minHeight: 120,
        height: 120,
        maxHeight: 350,
        backgroundColor: COLOR_WHITE,
        paddingLeft: 15,
        flex: -1
    },
    drawerImage: {
        height: 65,
        width: 65,
        borderRadius: 65/2,
    },
    welcome: {
        fontSize: 14,
        textAlign: 'left'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'left'
    },
    textEmail: {
        fontSize: 14,
        textAlign: 'left'
    },
});
