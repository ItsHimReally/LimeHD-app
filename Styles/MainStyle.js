import { StyleSheet, Dimensions } from 'react-native'

const winWidth = Dimensions.get('window').width
const winHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#292B2F',
        // backgroundColor: "#FFF",
        height: winHeight * 1.05
    },
    scroller: {
        item: {
            backgroundColor: "#36393F",
            width: winWidth * 0.95,
            marginLeft: winWidth * 0.025,
            marginRight: winWidth * 0.025,
            height: 330,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center"
        },
        width: winWidth,
        marginTop: winHeight * 0.07,
        flexGrow: 0
    },
    div: {
        width: winWidth * 0.9,
        backgroundColor: "#CCC",
        height: 30,
        marginTop: 10,
        marginRight: winWidth * 0.02
    },
    navbar: {
        backgroundColor: "#2F3136",
        width: winWidth,
        height: 60,
        position: "absolute",
        bottom: 0,
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        icon: {
            marginTop: 10
        }
    },
    bar: {
        flex: 0,
        flexDirection: "row",
        gap: 0,
        // justifyContent: "flex-start"
        position: 'absolute',
        top: 12
    },
    kids: {
        backgroundColor: "#36393F",
        width: winWidth * 0.95,
        marginTop: 15,
        borderRadius: 20,
        height: 150,
        marginLeft: winWidth * 0.025,
        alignItems: "center",
        justifyContent: "center"
    },
    bottom_tv: {
        flexDirection: "row",
        width: winWidth * 0.95,
        marginLeft: winWidth * 0.025,
        justifyContent: 'space-between',
        marginTop: 15,
    },
    bottom_div: {
        backgroundColor: "#36393F",
        height: winHeight * 1.05 - 330 - 150 - winHeight * 0.07 - 105,
        alignItems: "center",
        justifyContent: "center",
        width: (winWidth * 0.95 - 15) / 2,
        borderRadius: 20
    },
    profile_div: {
        width: winWidth * 0.95,
        marginLeft: winWidth * 0.025,
        // marginTop: winHeight * 0.07,
        backgroundColor: "#36393F",
        height: 200,
        borderRadius: 20,
        flexDirection: "row",
        flex: 0,
        marginBottom: 40
    },
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginLeft: 15,
        marginTop: 15
    },
    profileName: {
        color: "#FFF",
        marginTop: 15,
        fontSize: 20
    },
    profileUsername: {
        color: "#FFF"
    },
    profileScroller: {
        paddingTop: winHeight * .07,
        height: winHeight * 2
    },
    back: {
        position: "relative",
        marginLeft: 15,
        zIndex: 100,
        // marginBottom: 10,
        width: 40
    },
    subsButton: {
        alignSelf: "center",
        backgroundColor: "#97EE00",
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 20
    },
    subsButtonText: {
        fontSize: 18,
        fontWeight: "500"
    },
    subsDiv: {
        width: winWidth * 0.95,
        marginLeft: winWidth * 0.025,
        backgroundColor: "#36393F",
        height: 160,
        borderRadius: 20,
        marginBottom: 20
    },
    subsScroller: {
        paddingTop: winHeight * .07,
    },
    subsBlank: {
        height: winHeight * .07
    },
    subsImg: {
        height: 160,
        width: winWidth * 0.95,
        borderRadius: 20,
        flex: 0,
        position: "absolute",
        borderWidth: 6,
        borderColor: "#36393F"
    },
    subsImgActive: {
        height: 160,
        width: winWidth * 0.95,
        borderRadius: 20,
        flex: 0,
        position: "absolute",
        borderWidth: 4,
        borderColor: "#97EE00"
    },
    subsTint: {
        height: 160 - 8,
        width: winWidth * 0.95 - 8,
        top: 4,
        left: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        borderRadius: 15
    },
    subsTitle: {
        color: "#FFF",
        fontSize: 24,
        marginLeft: 20,
        marginTop: 10,
        fontWeight: "500"
    },
    subsDescr: {
        fontWeight: '300',
        fontSize: 12,
        color: "#FFF",
        marginLeft: 20,
    },
    subsType: {
        color: "#AAA",
        fontSize: 18,
        position: "absolute",
        bottom: 10,
        left: 20
    },
    subsTimeActive: {
        position: "absolute",
        bottom: 10,
        right: 20
    },
    subsTime: {
        position: "absolute",
        bottom: 10,
        right: 20,
        flexDirection: 'row'
    },
    subsTimeActiveText1: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: '300'
    },
    subsTimeActiveText2: {
        color: "#FFF",
        fontSize: 20,
        alignSelf: "flex-end",
        fontWeight: '500'
    },
    subsTimeText2: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: '400',
        alignSelf: 'center',
        marginTop: 5
    },
    subsTimeText1: {
        color: "#FFF",
        fontSize: 28,
        // alignSelf: "flex-end",
        fontWeight: '500'
    },
    searchText: {
        fontSize: 20,
        color: "#101010",
        marginTop: 60,
        fontWeight: "700",
    },
    searchListItem: {
        marginTop: 10,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
        width: "100%",
    },
    searchListItemText: {
        fontSize: 18,
    },
    teleTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        top: winHeight * .07,
        right: 16,
        position: "absolute",
        zIndex: 1
    },
    ratingBlock: {
        flexDirection: 'row',
        marginLeft: 20,
        marginBottom: 20
    },
    ratingText: {
        fontSize: 24,
        color: "#FFF",
        fontWeight: "500",
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20
    },
    ratingMain: {
        backgroundColor: "#36393F",
        width: winWidth * 0.95,
        marginLeft: winWidth * 0.025,
        marginTop: 10,
        borderRadius: 20,
    },
    filterBack: {
        // position: 'absolute'
        width: 40,
        height: 40,
        marginTop: winHeight * 0.07
    },
    genreMain: {
        backgroundColor: "#36393F",
        width: winWidth * .95,
        marginLeft: winWidth * .025,
        marginTop: 20,
        borderRadius: 20
    },
    yearMain: {
        backgroundColor: "#36393F",
        width: winWidth * .95,
        marginLeft: winWidth * .025,
        marginTop: 20,
        borderRadius: 20,
        flexDirection: 'column'
    },
    yearText: {
        fontSize: 24,
        color: "#FFF",
        fontWeight: "500",
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20
    },
    yearPicker: {
        position: 'relative',
        marginLeft: 20,
        marginBottom: 20,
        backgroundColor: "#4F545C",
        width: winWidth * .95 - 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        color: "#fff",
        fontSize: 16
    },
    clearFilters: {
        backgroundColor: "#97EE00",
        alignSelf: "center",
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 30
    },
    clearFiltersText: {
        fontSize: 20,
        fontWeight: "500"
    },
    filterError: {
        color: "#F33",
        fontSize: 14,
        marginLeft: winWidth * 0.025 + 10
    },
    videoDiv: {
        marginTop: winHeight * 0.07 + 100,
    },
    video: {
        width: winWidth,
        height: 240,
        zIndex: 0,
        position: 'absolute',
        top: 0
    },
    fullscreenVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    videoLayer: {
        top: 0,
        position: "absolute",
        height: 240,
        width: winWidth,
        zIndex: 1
    },
    pause: {
        width: 40,
        height: 40,
        alignSelf: "center",
        position: "absolute",
        top: 100
    }
});


export default styles;