import { StatusBar } from "expo-status-bar";
import {
    Text,
    View,
    ScrollView,
    Pressable,
    TouchableOpacity,
    TextInput
} from "react-native";
import styles from "../Styles/MainStyle";
import { useEffect, useState, useRef } from "react";

/// REDUX ///
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/actions";

/// CACHE ///
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from 'axios';

const Register = ({ navigation }) => {
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

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("userData", jsonValue);
        } catch (e) {
            // saving error
        }
    };

    function handleIn() {
        const myUser = {
            id: 1,
            username: login,
            name: name,
            surname: surnname,
            // "avatar": "https://funik.ru/wp-content/uploads/2018/10/17478da42271207e1d86.jpg",
            avatar: null,
            password: password,
            fare: {
                START: "20.12.2024",
                Киномир: "28.12.2023",
            },
            tvUntil: "20.12.2024",
            likes: {},
            wishlist: {},
        }
        axios.post('https://limehd.tw1.su/api/register', myUser)
        dispatch(setProfile(myUser));
        storeData(myUser).then((response) => {
            navigation.navigate("Home");
        });
    }

    const [name, setName] = useState('');

  const handleName = (value) => {
    setName(value);
  };
  const [surnname, setSurname] = useState('');

  const handleSurname = (value) => {
    setSurname(value);
  };

  const [login, setLogin] = useState('');

  const handleLogin = (value) => {
    setLogin(value);
  };

  const [password, setPassword] = useState('');

  const handlePassword = (value) => {
    setPassword(value);
  };

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={() => handleLogin()}>
                <View style={[styles.loginButton, {marginTop: 200}]}>
                    <Text style={styles.loginButtonText}>Регистрация</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLogin()}>
                <View style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Вход</Text>
                </View>
            </TouchableOpacity> */}
            <TextInput
                value={name}
                onChangeText={handleName}
                style={[styles.inputLogin, {marginTop: 200}]}
                placeholder="Имя"
                placeholderTextColor={"#ccc"}
            />
            <TextInput
                value={surnname}
                onChangeText={handleSurname}
                style={styles.inputLogin}
                placeholder="Фамилия"
                placeholderTextColor={"#ccc"}
            />
            <TextInput
                value={login}
                onChangeText={handleLogin}
                style={styles.inputLogin}
                placeholder="Логин"
                placeholderTextColor={"#ccc"}
            />
            <TextInput
                value={password}
                onChangeText={handlePassword}
                style={styles.inputLogin}
                placeholder="Пароль"
                placeholderTextColor={"#ccc"}
            />
            <TouchableOpacity onPress={() => handleIn()}>
                <View style={[styles.loginButton, {marginTop: 100}]}>
                    <Text style={styles.loginButtonText}>Регистрация</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Register;
