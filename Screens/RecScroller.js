import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Pressable, TouchableOpacity, Button, Dimensions } from 'react-native';
import styles from '../Styles/MainStyle';
import { useEffect, useRef, useState } from 'react';
import homeStyles from '../Styles/MainStyle'

const RecScroller = ({navigation}) => {

    const winWidth = Dimensions.get('window').width

    const contentLength = 4;

    const scrollViewRef = useRef(null);

    const scrollToPage = () => {
        const xOffset = ((page + 1) % contentLength) * winWidth;
        scrollViewRef.current?.scrollTo({ x: xOffset, animated: true });
        setPage((page + 1) % contentLength)
    };

    const [timeLeft, setTimeLeft] = useState(10)
    const [isRunning, setIsRunning] = useState(true)
    const [page, setPage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            isRunning && setTimeLeft((timeLeft) => (timeLeft >= 0.1 ? timeLeft - 0.1 : 10))
        }, 50)

        if (timeLeft === 10) {
            scrollToPage();

        }
        return () => {
            clearInterval(interval);
        }
    }, [timeLeft, isRunning])

    const handleScroll = (event) => {
        const xOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(xOffset / winWidth);
        if (index >= 0 && index < contentLength) {
            setPage(index);
        }
        setTimeLeft(9.99)
    };

    const Bar = () => {
        let gaps = contentLength - 1;
        let lineWidth = (winWidth * 0.95 - gaps * 10 - 30) / contentLength;
        return(
            <View style={styles.bar}>
                {Array.from({ length: contentLength - 1 }, (_, i) => i + 1).map((key) => {
                    return(
                        <View style={{flex: 0, flexDirection: "row"}}>
                            <View>
                                <View style={{width: lineWidth, height: 3, backgroundColor: "#292B2F"}}/>
                                <View style={{width: key - 1 < page ? lineWidth : key - 1 > page ? 0 : lineWidth / 10 * (10 - timeLeft), height: 3, backgroundColor: "#FFF", position: "absolute"}}/>
                            </View>
                            <View style={{width: 10, height: 5}}/>
                        </View>
                    )
                })}
                <View>
                    <View style={{width: lineWidth, height: 3, backgroundColor: "#292B2F"}}/>
                    <View style={{width: contentLength - 1 < page ? lineWidth : contentLength - 1 > page ? 0 : lineWidth / 10 * (10 - timeLeft), height: 3, backgroundColor: "#FFF", position: "absolute"}}/>
                </View>
                
            </View>
        )
    }

    channels = [257, 6604, 6849, 6841]

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                ref={scrollViewRef}
                style={homeStyles.scroller}
                onScroll={handleScroll}
            >
                <TouchableOpacity><View style={homeStyles.scroller.item}><Bar/><Text style={styles.recName}>Падение олимпа</Text></View></TouchableOpacity>
                <TouchableOpacity><View style={homeStyles.scroller.item}><Bar/><Text style={styles.recName}>Большая игра</Text></View></TouchableOpacity>
                <TouchableOpacity><View style={homeStyles.scroller.item}><Bar/><Text style={styles.recName}>Comedy Club</Text></View></TouchableOpacity>
                <TouchableOpacity><View style={homeStyles.scroller.item}><Bar/><Text style={styles.recName}>Легенда о круге</Text></View></TouchableOpacity>

            </ScrollView>
        </View>
    )
};

export default RecScroller;