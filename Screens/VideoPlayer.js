import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { useEffect, useState } from "react";
import styles from "../Styles/MainStyle";

/// VIDEO ///
import { ResizeMode } from 'expo-av'
// import VideoPlayer from 'expo-video-player'
import * as ScreenOrientation from 'expo-screen-orientation';
import { Video } from 'expo-av';

/// ICON ///
import Pause from '../assets/pause.svg'


const VideoPlayer = (link) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [hidden, setHidden] = useState(false);

    const handleFullscreen = async () => {
        if (isFullscreen) {
            // Exiting fullscreen - change orientation to portrait
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        } else {
            // Entering fullscreen - change orientation to landscape
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        }
        setIsFullscreen(!isFullscreen);
    };



    return(
        <View style={styles.videoDiv}>
            <Video
                source={{ uri: "https://mhd.iptv2022.com/p/sk8u51fW7_guBD8jz3XnYw,1702953194/streaming/1kanalott/324/1/index.m3u8" }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                useNativeControls
                style={isFullscreen ? styles.fullscreenVideo : styles.video}
            />
            <Pressable><View style={styles.videoLayer && {opacity: hidden}}>
                <Pause style={styles.pause}/>
            </View></Pressable>
        </View>
    )
}


export default VideoPlayer;