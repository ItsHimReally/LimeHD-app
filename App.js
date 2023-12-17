import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView } from "react-native";
import styles from "./Styles/MainStyle";
import { useEffect } from "react";

/// SCREENS ///
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Profile from "./Screens/Profile";
import Teleprograms from "./Screens/Teleprograms";
import Subscriptions from "./Screens/Subscriptions";

/// REDUX ///
import { Provider } from "react-redux";
import store from "./redux/store";

/// NAVIGATION ///
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";
import Filters from "./Screens/Filters";
import Channel from "./Screens/Channel";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Bruh from "./Screens/Bruh";
import LoginMain from "./Screens/LoginMain";
import { LogBox } from 'react-native'
import Register from "./Screens/Register";
import Program from "./Screens/Program";

export default function App({ navigation }) {
  useEffect(() => {}, []);
  LogBox.ignoreAllLogs(); 

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="LoginMain" component={LoginMain} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Teleprograms" component={Teleprograms} />
          <Stack.Screen name="Subscriptions" component={Subscriptions} />
          <Stack.Screen name="Filters" component={Filters} />
          <Stack.Screen name="Channel" component={Channel} />
          <Stack.Screen name="Program" component={Program} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}
