import { Text, View, ScrollView, Pressable, TouchableOpacity, Image } from 'react-native';
import styles from '../Styles/MainStyle';
import { useEffect } from 'react';
import {subs} from './data';
import Back from '../assets/back.svg'

///REDUX///
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/actions';

const Subscriptions = ({navigation}) => {
    const profile = useSelector(state => state.user.profile);

    
const newSubs = subs.sort((a, b) => {
    return Object.keys(profile["fare"]).includes(b["title"]) - Object.keys(profile["fare"]).includes(a["title"])
}) 
    return(
        <View style={styles.container}>
            <ScrollView style={styles.subsScroller}>
                <Pressable style={{width: 60, height: 60}} onPress={() => navigation.goBack()}><Back style={styles.back}/></Pressable>
                {newSubs.map(sub => {
                    return(
                        <View style={styles.subsDiv}>
                            <Image style={Object.keys(profile["fare"]).includes(sub["title"]) ? styles.subsImgActive :styles.subsImg} source={{uri: sub["img"]}}/>
                            <View style={styles.subsTint}/>
                            <Text style={styles.subsTitle}>{sub["title"]}</Text>
                            <Text style={styles.subsDescr}>{sub["descr"]}</Text>
                            <Text style={styles.subsType}>{sub["type"]}</Text>
                            {Object.keys(profile["fare"]).includes(sub["title"]) ? 
                            <View style={styles.subsTimeActive}>
                                <Text style={styles.subsTimeActiveText1}>Подписка действует до</Text>
                                <Text style={styles.subsTimeActiveText2}>{profile["fare"][sub["title"]]}</Text>
                            </View> : 
                            <View style={styles.subsTime}>
                                <Text style={styles.subsTimeText1}>{sub["price"]}</Text>
                                <Text style={styles.subsTimeText2}> ₽/Мес</Text>
                            </View>}
                        </View>
                    )
                })}
                <View style={styles.subsBlank}/>
            </ScrollView>
            
        </View>
    )
}

export default Subscriptions;