import { StyleSheet, Dimensions } from 'react-native'

const winWidth = Dimensions.get('window').width
const winHeight = Dimensions.get('window').height

const homeStyles = StyleSheet.create({
    scroller: {
        item: {
            backgroundColor: "#36393F",
            // width: winWidth * 0.95,
            width: 300,
            height: 400
        },
        marginTop: winHeight * 0.1,
        flexGrow: 0
    }
})

export default homeStyles;