import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Button, Dimensions, Image } from "react-native";
import { useEffect, useState, useRef } from "react";
import List from "../Components/List";
import SearchBar from "../Components/SearchBar";
import styles from "../Styles/MainStyle";
import axios from 'axios';

/// NAVBAR ///
import * as NavigationBar from 'expo-navigation-bar';
import Profile from '../assets/profileDeactivated.svg'
import TV from '../assets/tvDeactivated.svg'
import Remote from '../assets/remote.svg'
import RecScroller from './RecScroller';

///DATA ///
import { searchData } from "./data";

/// ICONS ///
import FiltersIcon from '../assets/filter.svg'
import VideoPlayer from "./VideoPlayer"

import { useSelector } from "react-redux";


/// GESTURES ///
import {
    GestureHandlerRootView,
    PinchGestureHandler,
    PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');
const Teleprograms = ({ navigation }) => {
    // const data = searchData
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();

    function convertDate(dateString) {
        const date = new Date(dateString);
        const gmtDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        const offset = 7;
        const gmtPlusThreeDate = new Date(gmtDate.getTime() + (offset * 60 * 60000));
        return gmtPlusThreeDate;
    }

    function formatTimeDifference(startDate, endDate) {
        // Calculate the difference in milliseconds
        const difference = endDate.getTime() - startDate.getTime();

        // Convert the difference to minutes and hours
        const minutes = Math.floor(difference / 60000);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        // Format the output based on the duration
        if (minutes < 60) {
            return `${minutes} мин. осталось`;
        } else {
            return `${hours} ч. ${remainingMinutes} мин. осталось`;
        }
    }

    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
      
        // Format hours and minutes to always be two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
      
        return `${formattedHours}:${formattedMinutes}`;
      }

    var data = useSelector((state) => state.user.programs);
    
    var channelData = useSelector((state) => state.user.channels);

    console.log('exp', data)

    const currentTime = new Date();
    console.log(searchPhrase)

    const [programs, setPrograms] = useState([]);
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        // setFakeData(data);
        setPrograms(data);
        setChannels(channelData)
    }, [data, channelData]);


    if (programs.length != 0 && channels.length != 0)
        return (
            <View style={styles.container}>
                <View style={styles.teleTop}>
                    <SearchBar
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                        clicked={clicked}
                        setClicked={setClicked}
                    />
                    <FiltersIcon
                        style={{ height: 40, width: 40 }}
                        onPress={() => navigation.navigate("Filters")}
                    />
                </View>

                {/* <VideoPlayer link="https://mhd.iptv2022.com/p/sk8u51fW7_guBD8jz3XnYw,1702953194/streaming/1kanalott/324/1/index.m3u8"/> */}
                <View style={{ height: 130 }}></View>
                <ScrollView>
                    {Object.keys(programs).map((channel) => {
                        for (let i = 0; i < channels.length; i++) if (parseInt(channel) == channels[i]["id"]) var currChannel = channels[i];
                        if (currChannel !== undefined)
                            return (
                                <View style={styles.progRow}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Channel', { programs: programs, channels: channels, channelID: parseInt(currChannel["id"]) })}>
                                        <Image style={styles.progImg} source={{ uri: currChannel["img"] }} />
                                    </TouchableOpacity>
                                    <ScrollView
                                        pagingEnabled
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.progRowScroller}
                                    >

                                        {programs[channel].map((prog, index) => {
                                            if (index === 0) var timeStr = formatTimeDifference(currentTime, prog["timeEnd"])
                                            else var timeStr = "Начало сегодня в " + formatTime(prog["timeStart"])
                                            return (
                                                <View style={styles.progProg}>
                                                    <Text style={styles.progText}>{prog["name"].length > 30 ? prog["name"].slice(0, 27) + "..." : prog["name"]}</Text>
                                                    <Text style={styles.progTime}>{timeStr}</Text>
                                                </View>
                                            )
                                        })}
                                    </ScrollView>
                                </View>

                            )
                    })}

                </ScrollView>

                {/* <View><Text>{programs[0]["name"]}</Text></View> */}
                {/* <Button title='bruh' onPress={() => navigation.navigate('Channel', { channelID: 0 })} /> */}
                {/* <Button title='bruh' onPress={() => navigation.navigate('Bruh')}></Button> */}

                {/* <VideoPlayer
                videoProps={{
                    shouldPlay: true,
                    resizeMode: ResizeMode.CONTAIN,
                    // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                    source: {
                        uri: 'https://mhd.iptv2022.com/p/sk8u51fW7_guBD8jz3XnYw,1702953194/streaming/1kanalott/324/1/index.m3u8',
                    },
                }}
                defaultControlsVisible={false}
            /> */}
                {/* <List
                searchPhrase={searchPhrase}
                data={fakeData}
                setClicked={setClicked}
            /> */}
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <TV style={styles.navbar.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Remote style={styles.navbar.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Profile style={styles.navbar.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    else return (
        <View style={styles.container}>
            <Text>ЗАГРУЗКА</Text>
        </View>
    )
}

export default Teleprograms;