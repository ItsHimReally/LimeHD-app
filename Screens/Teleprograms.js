import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import List from "../Components/List";
import SearchBar from "../Components/SearchBar";
import styles from "../Styles/MainStyle";
import { Feather, Entypo } from "@expo/vector-icons";

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



const Teleprograms = ({ navigation }) => {
    const data = searchData
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();
    useEffect(() => {
        console.log(data[0].title);
        setFakeData(data);
    });

    
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

            <VideoPlayer link=''/>
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
}

export default Teleprograms;