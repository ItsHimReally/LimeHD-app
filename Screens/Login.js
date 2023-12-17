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
import axios from 'axios';

/// CACHE ///
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  async function bruh() {
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

  console.log(token)

  // Headers for the second request
  const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
  };

  const res =  await axios.get('https://limehd.tw1.su/api/user/', { headers: headers })
  return res.data
  }

  async function handleIn() {

    bruh().then(response => {
      console.log(response)
        dispatch(setProfile(response));
      storeData(response).then((response) => {
        navigation.navigate("Home");
      });
    })

    
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {
      // saving error
    }
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
      <TextInput
                value={login}
                onChangeText={handleLogin}
                style={[styles.inputLogin, {marginTop: 300}]}
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
                    <Text style={styles.loginButtonText}>Войти</Text>
                </View>
            </TouchableOpacity>
    </View>
  );
};

export default Login;
