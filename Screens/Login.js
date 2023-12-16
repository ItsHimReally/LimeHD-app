import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import styles from "../Styles/MainStyle";

/// REDUX ///
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/actions";

/// CACHE ///
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const myUser = {
    id: 1,
    username: "vdmk",
    name: "Вадим",
    surname: "Соловьев",
    // "avatar": "https://funik.ru/wp-content/uploads/2018/10/17478da42271207e1d86.jpg",
    avatar: null,
    password: "Mip12345",
    fare: {
      START: "20.12.2024",
      Киномир: "28.12.2023",
    },
    tvUntil: "20.12.2024",
    likes: {},
    wishlist: {},
  };

  function handleLogin() {
    dispatch(setProfile(myUser));
    storeData(myUser).then((response) => {
      navigation.navigate("Home");
    });
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleLogin()}>
        <View
          style={{
            marginTop: 300,
            height: 40,
            flexGrow: 0,
            backgroundColor: "#fdd",
          }}
        >
          <Text>Регнуться</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
