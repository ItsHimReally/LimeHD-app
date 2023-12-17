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
import Fullscreen from '../assets/fullscreen.svg'
import Play from '../assets/play.svg'
import Sound from '../assets/sound.svg'
import SoundOff from '../assets/soundOff.svg'


const VideoPlayer = ({link}) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [hidden, setHidden] = useState(1);

    const [timeLeft, setTimeLeft] = useState(5)
    const [isRunning, setIsRunning] = useState(true)

    const [paused, setPaused] = useState(false)
    const [muted, setMuted] = useState(true)

    const handleFullscreen = async () => {
        // if (isFullscreen) {
        //     // Exiting fullscreen - change orientation to portrait
        //     await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        // } else {
        //     // Entering fullscreen - change orientation to landscape
        //     await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        // }
        // setIsFullscreen(!isFullscreen);
    };

    const updateTime = () => {
        if (timeLeft > 0.31) setTimeLeft(0.3)
        else{
            setTimeLeft(5);
            setHidden(1);
        }
        
    }

    useEffect(() => {
        const interval = setInterval(() => {
            isRunning && setTimeLeft((timeLeft) => (timeLeft >= 0.1 ? timeLeft - 0.1 : 0))
            if (timeLeft <= .3) setHidden(timeLeft * 3);
        }, 50)

        if (timeLeft === 5) {
            // scrollToPage();

        }
        return () => {
            clearInterval(interval);
        }
    }, [timeLeft, isRunning])

    const handlePause = () => {
        if (hidden == 1){
            setTimeLeft(5);
            setPaused(!paused)
        }
    }

    const handleMute = () => {
        if (hidden == 1){
            setTimeLeft(5);
            setMuted(!muted)
        }
        
    }

    return(
        <View style={styles.videoDiv}>
            <Pressable style={styles.overlay} onPress={() => updateTime()}><View style={{...styles.videoLayer, opacity: hidden, zIndex: 20}}>
                <TouchableOpacity>
                    {paused ? <Play onPress={() => handlePause()} style={styles.pause}/> : <Pause onPress={() => handlePause()} style={styles.pause}/> }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFullscreen()}><Fullscreen style={styles.fullscreen}/></TouchableOpacity>
                <TouchableOpacity>{muted ? <SoundOff onPress={() => handleMute()} style={styles.sound}/> : <Sound onPress={() => handleMute()} style={styles.sound}/>}</TouchableOpacity>
            </View></Pressable>
            <Video
                source={{ uri: link }}
                rate={1.0}
                volume={1.0}
                isMuted={muted}
                resizeMode="cover"
                shouldPlay={!paused}
                isLooping
                useNativeControls={false}
                style={isFullscreen ? styles.fullscreenVideo : styles.video}
            />
        </View>
    )
}


export default VideoPlayer;