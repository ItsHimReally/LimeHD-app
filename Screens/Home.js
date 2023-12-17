import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import styles from "../Styles/MainStyle";
import { useEffect, useState } from "react";
import homeStyles from "../Styles/MainStyle";

/// REDUX ///
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProfile, setChannels, setPrograms } from "../redux/actions";
import axios from "axios";

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
  // const data = useSelector((state) => state.user.programs);

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
  const currentTime = new Date();

  function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours and minutes to always be two digits
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }
  const [data1, setData1] = useState([]);
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
    const fetchData = async () => {
      try {
        // Prepare data for the first POST request
        const postData = new URLSearchParams({
          grant_type: "",
          username: "abobus",
          password: "bobus",
          scope: "",
          client_id: "",
          client_secret: "",
        }).toString();

        // First request: Get the token
        const authResponse = await axios.post(
          "https://limehd.tw1.su/api/auth",
          postData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        // Extract token from the first response
        const token = authResponse.data["access_token"];

        // Headers for the second request
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        };

        // Second request: Use the token to get data
        const dataResponse = await axios.get(
          "https://limehd.tw1.su/api/programs/",
          { headers: headers }
        );
        const channelsResponse = await axios.get(
          "https://limehd.tw1.su/api/channels/",
          { headers: headers }
        );
        return { data: dataResponse.data, channelData: channelsResponse.data };
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData().then(({ data, channelData }) => {
      data = data.map((program) => {
        return {
          ...program,
          timeStart: new Date(program["timeStart"] + "Z"),
          timeEnd: new Date(program["timeEnd"] + "Z"),
        };
      });
      data = data
        .sort((a, b) => {
          return a["timeStart"] - b["timeStart"];
        })
        .filter(
          (item) =>
            item["timeEnd"] > currentTime &&
            formatTime(item["timeStart"]) !== "02:02" &&
            formatTime(item["timeStart"]) !== "02:01"
        )

        .reduce((acc, obj) => {
          if (!acc[obj.channel]) {
            acc[obj.channel] = [];
          }
          acc[obj.channel].push(obj);
          return acc;
        }, {});
      dispatch(setChannels(channelData));
      dispatch(setPrograms(data));
      setData1(data);
    });
  }, []);

  if (data1.length != 0)
    return (
      <View style={styles.container}>
        <RecScroller />

        <ImageBackground
          style={styles.kids}
          imageStyle={{ borderRadius: 20 }}
          source={require("../static/img/kids.png")}
        ></ImageBackground>
        {/* </LinearGradient> */}

        <View style={styles.bottom_tv}>
          <ImageBackground
            style={styles.bottom_div}
            imageStyle={{ borderRadius: 20 }}
            source={require("../static/img/ninePlusTen.png")}
          >
            <Text style={styles.filmText}>Фильмы</Text>
          </ImageBackground>

          <ImageBackground
            style={styles.bottom_div}
            imageStyle={{ borderRadius: 20 }}
            source={require("../static/img/chushpan.png")}
          >
            <Text style={styles.seriesText}>Сериалы</Text>
          </ImageBackground>
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
