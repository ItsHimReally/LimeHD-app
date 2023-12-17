import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import styles from "../Styles/MainStyle";
import axios from 'axios';
import VideoPlayer from "./VideoPlayer";
import Back from '../assets/back.svg'

import Stars from '../assets/stars.svg'

const Program = ({ navigation, route }) => {
    const { programs, channels, channelID } = route.params;
    // console.log('allo', programs[channelID])

    // const [channels, setChannels] = useState([])
    const [channel, setChannel] = useState(programs[channelID][0])
    console.log('allo', channel)

    /// ШАЛУН ID = 450

    // useEffect(() => {
    //     setChannel(programs[channelID])
    // }, [programs])

    if (channel != undefined)
        // if (channel["name"] != undefined)
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><Back style={styles.filterBack} /></TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                    <Image resizeMode="contain" style={styles.programImg} source={{uri: channel["img"]}}></Image>
                    <Text style={styles.programTitle}>{channel["name"]}</Text>
                    </View>
                    <Text>Рейтинг</Text>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.programDesc}>{channel["description"]}</Text>
                        {channel["isDescrModify"] ? <Stars/> : <View/>}
                    </View>
                    {/* {channel["foreign_url"] !== null ? <VideoPlayer link={channel["foreign_url"]} /> : <View />} */}
                    {/* <View style={styles.channelInfo}>
                        <Image style={styles.channelImg} source={{ uri: channel["img"] }} />
                        {console.log(channel["name"])}
                        <Text style={[
                            styles.channelTitle,
                            channel["name"].length > 30 ? { fontSize: 14 } :
                                channel["name"].length > 25 ? { fontSize: 18 } :
                                    channel["name"].length > 20 ? { fontSize: 20 } :
                                        channel["name"].length > 15 ? { fontSize: 22 } :
                                            { fontSize: 28 }
                        ]}>{channel["name"]}</Text>
                    </View>
                    <ScrollView
                        horizontal
                        style={styles.channelTableScroller}
                    >
                        <TouchableOpacity onPress={() => setTableActive(1)}>
                            <View style={styles.channelTableDiv}>
                                <Text style={tableActive == 1 ? styles.channelTableTextActive : styles.channelTableText}>Сегодня, {todayFormatted}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setTableActive(2)}>
                            <View style={styles.channelTableDiv}>
                                <Text style={tableActive == 2 ? styles.channelTableTextActive : styles.channelTableText}>Завтра, {tomorrowFormatted}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setTableActive(3)}>
                            <View style={styles.channelTableDiv}>
                                <Text style={tableActive == 3 ? styles.channelTableTextActive : styles.channelTableText}>Послезавтра, {tomorrowFormatted1}</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.channelLine} />
                    <ScrollView style={{}}>
                        {programs[channelID].filter(item => tableActive == 1 ? isToday(item["timeStart"]) : tableActive == 2 ? isTomorrow(item["timeStart"]) : isTomorrow1(item["timeStart"])).length != 0 ?
                        programs[channelID].filter(item => tableActive == 1 ? isToday(item["timeStart"]) : tableActive == 2 ? isTomorrow(item["timeStart"]) : isTomorrow1(item["timeStart"])).map(prog => {
                            return (
                                <View style={styles.channelsProg}>
                                    <Text style={styles.channelsProgText}>{prog["name"]}</Text>
                                    <Text style={styles.channelsProgTime}>{formatTime(prog["timeStart"])} - {formatTime(prog["timeEnd"])}</Text>
                                    <Text style={styles.channelsType}>{prog["isSeries"] ? 'Сериал/Шоу' : 'Фильм'}</Text>
                                </View>
                            )
                        }) : <Text style={styles.noProg}>На этот день нет расписания :(</Text>}
                    </ScrollView> */}
                    {/* <View style={{height: 40}}/> */}
                </View>
            )
}

export default Program;