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

const LoginMain = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <View style={[styles.loginButton, {marginTop: 200}]}>
                    <Text style={styles.loginButtonText}>Регистрация</Text>
                </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <View style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Вход</Text>
                </View>
            </TouchableOpacity> */}
        </View>
    );
};

export default LoginMain;
