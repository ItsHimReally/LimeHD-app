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

export default function App({ navigation }) {
  useEffect(() => {}, []);

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Teleprograms" component={Teleprograms} />
          <Stack.Screen name="Subscriptions" component={Subscriptions} />
          <Stack.Screen name="Filters" component={Filters} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
