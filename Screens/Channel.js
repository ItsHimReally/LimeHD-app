import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import styles from "../Styles/MainStyle";
import axios from 'axios';
import VideoPlayer from "./VideoPlayer";
import Back from '../assets/back.svg'

const Channel = ({ navigation, route }) => {

    // const [channels, setChannels] = useState([])
    const [channel, setChannel] = useState({})

    /// ШАЛУН ID = 450
    const { programs, channels, channelID } = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Prepare data for the first POST request
                const postData = new URLSearchParams({
                    'grant_type': '',
                    'username': 'abobus',
                    'password': 'bobus',
                    'scope': '',
                    'client_id': '',
                    'client_secret': ''
                }).toString();

                // First request: Get the token
                const authResponse = await axios.post('https://limehd.tw1.su/api/auth', postData, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                // Extract token from the first response
                const token = authResponse.data["access_token"];

                // Headers for the second request
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                };

                // Second request: Use the token to get data
                const dataResponse = await axios.get(`https://limehd.tw1.su/api/channel/${channelID}`, { headers: headers });
                setChannel(dataResponse.data);
                return dataResponse.data
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchData().then(data => {
            console.log(channelID)
            console.log(data);
            setChannel(data) // data will now be the response data from the API
        }).catch(error => {
            console.error(error); // Handle any errors
        });

    }, []);

    const formatDate = (date) => {
        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString(); // Months are 0-indexed

        // Add leading zero if necessary
        day = day.length < 2 ? '0' + day : day;
        month = month.length < 2 ? '0' + month : month;

        return `${day}.${month}`;
    };

    const today = new Date();
    const tomorrow = new Date();
    const tomorrow1 = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow1.setDate(tomorrow1.getDate() + 2)

    const todayFormatted = formatDate(today);
    const tomorrowFormatted = formatDate(tomorrow);
    const tomorrowFormatted1 = formatDate(tomorrow1);

    const [tableActive, setTableActive] = useState(1)

    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // Format hours and minutes to always be two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}`;
    }

    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
      }
      
      function isTomorrow(date) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return date.getDate() === tomorrow.getDate() &&
               date.getMonth() === tomorrow.getMonth() &&
               date.getFullYear() === tomorrow.getFullYear();
      }
      function isTomorrow1(date) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 2);
        return date.getDate() === tomorrow.getDate() &&
               date.getMonth() === tomorrow.getMonth() &&
               date.getFullYear() === tomorrow.getFullYear();
      }

    if (channel != undefined)
        if (channel["name"] != undefined)
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><Back style={styles.filterBack} /></TouchableOpacity>
                    {channel["foreign_url"] !== null ? <VideoPlayer link={channel["foreign_url"]} /> : <View />}
                    <View style={styles.channelInfo}>
                        <Image style={styles.channelImg} source={{ uri: channel["img"] }} />
                        {/* {console.log(channel["name"])} */}
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
                    </ScrollView>
                    {/* <View style={{height: 40}}/> */}
                </View>
            )
}

export default Channel;