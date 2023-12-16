import { StatusBar } from "expo-status-bar";
import {
    Text,
    View,
    ScrollView,
    Pressable,
    TouchableOpacity,
} from "react-native";
import styles from "../Styles/MainStyle";
import { useEffect } from "react";
import homeStyles from "../Styles/MainStyle";

/// REDUX ///
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/actions";

/// CACHE ///
import AsyncStorage from "@react-native-async-storage/async-storage";

/// NAVBAR ///
import * as NavigationBar from "expo-navigation-bar";
import Profile from "../assets/profileDeactivated.svg";
import TV from "../assets/tv.svg";
import Remote from "../assets/remoteDeactivated.svg";
import RecScroller from "./RecScroller";

const Home = ({ navigation }) => {
    const profile = useSelector((state) => state.user.profile);

    const emptyUser = {
        id: null,
        username: null,
        name: null,
        surname: null,
        avatar: null,
        password: null,
        fare: null,
        tvUntil: null,
        likes: null,
        wishlist: null,
    };


    const dispatch = useDispatch();

    function handleExit() {
        dispatch(setProfile(emptyUser));
        storeData(emptyUser);
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("userData", jsonValue);
        } catch (e) {
            console.error("STORING CACHE ERROR\n", e);
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("userData");
            console.log("cache", jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error("READING CACHE ERROR\n", e);
        }
    };

    useEffect(() => {
        const myUser = getData().then((response) => {
            console.log("brruh2", response);
            if (response["id"] == null) {
                console.log("bruh", myUser);
                navigation.navigate("Login");
            } else {
                dispatch(setProfile(response));
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <RecScroller />

            <View style={styles.kids}>
                <Text>Детишкам</Text>
            </View>

            <View style={styles.bottom_tv}>
                <View style={styles.bottom_div}>
                    <Text>Фильмы</Text>
                </View>
                <View style={styles.bottom_div}>
                    <Text>Сериалы</Text>
                </View>
            </View>

            <View style={styles.navbar}>
                <TouchableOpacity>
                    <TV style={styles.navbar.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Teleprograms")}>
                    <Remote style={styles.navbar.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Profile style={styles.navbar.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;
