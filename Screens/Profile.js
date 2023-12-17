import { StatusBar } from "expo-status-bar";
import {
    Text,
    View,
    ScrollView,
    Pressable,
    TouchableOpacity,
    Image,
} from "react-native";
import styles from "../Styles/MainStyle";

/// REDUX ///
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/actions";

/// CACHE ///
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

/// NAVBAR ///
import * as NavigationBar from "expo-navigation-bar";
import ProfileIcon from "../assets/profile.svg";
import TV from "../assets/tvDeactivated.svg";
import Remote from "../assets/remoteDeactivated.svg";

/// DATA ///
import {subs} from "./data";

const Profile = ({ navigation }) => {
    const profile = useSelector((state) => state.user.profile);

    console.log(profile);

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
        navigation.navigate("LoginMain");
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
            return jsonValue != null || jsonValue != undefined ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error("READING CACHE ERROR\n", e);
        }
    };

    useEffect(() => {
        const myUser = getData().then((response) => {
            // if (response !== undefined)
            console.log('check', response["id"])
            if (response["id"] == null) {
                console.log(myUser);
                navigation.navigate("LoginMain");
            }
            // if (profile !== undefined)
            console.log('check2', profile["id"])
            if (profile["id"] != null) {
                dispatch(setProfile(response));
            }
            else navigation.navigate("LoginMain");
            // else navigation.navigate("LoginMain");
        });
    }, [profile]);
    console.log('user profile', profile)
    console.log('cache', getData().then(response => console.log(response)))

    if (profile !== undefined)
    if (profile["id"] != null)
        return (
            <View style={styles.container}>
                <ScrollView style={styles.profileScroller}>
                    <View style={styles.profile_div}>
                        <Image
                            style={styles.profileImg}
                            source={{
                                uri:
                                    profile["avatar"] == null
                                        ? "https://yt3.googleusercontent.com/Khx8qvqjrG56W-EqzhHpp4zh46Qvz1oCL1bAO_u4AWdtMJbpULc8P4lihcRZptgl60f-I2dpyQ=s900-c-k-c0x00ffffff-no-rj"
                                        : profile["avatar"],
                            }}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.profileName}>
                                {profile["name"]} {profile["surname"]}
                            </Text>
                            <Text style={styles.profileUsername}>@{profile["username"]}</Text>
                        </View>
                    </View>

                    {subs.map((sub) => {
                        if (Object.keys(profile["fare"]).includes(sub["title"]))
                            return (
                                <View style={styles.subsDiv}>
                                    <Image
                                        style={styles.subsImgActive}
                                        source={{ uri: sub["img"] }}
                                    />
                                    <View style={styles.subsTint} />
                                    <Text style={styles.subsTitle}>{sub["title"]}</Text>
                                    <Text style={styles.subsDescr}>{sub["descr"]}</Text>
                                    <Text style={styles.subsType}>{sub["type"]}</Text>
                                    {Object.keys(profile["fare"]).includes(sub["title"]) ? (
                                        <View style={styles.subsTimeActive}>
                                            <Text style={styles.subsTimeActiveText1}>
                                                Подписка действует до
                                            </Text>
                                            <Text style={styles.subsTimeActiveText2}>
                                                {profile["fare"][sub["title"]]}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={styles.subsTime}>
                                            <Text style={styles.subsTimeText1}>{sub["price"]}</Text>
                                            <Text style={styles.subsTimeText2}> ₽/Мес</Text>
                                        </View>
                                    )}
                                </View>
                            );
                    })}

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Subscriptions")}
                    >
                        <View style={styles.subsButton}>
                            <Text style={styles.subsButtonText}>Все подписки</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleExit()}>
                        <View
                            style={{
                                marginTop: 300,
                                height: 40,
                                flexGrow: 0,
                                backgroundColor: "#eee",
                            }}
                        >
                            <Text>Выйти</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 200 }}></View>
                </ScrollView>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <TV style={styles.navbar.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Teleprograms")}>
                        <Remote style={styles.navbar.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <ProfileIcon style={styles.navbar.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        );
};

export default Profile;
