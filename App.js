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
import Filters from "./Screens/Filters";

/// REDUX ///
import { Provider } from "react-redux";
import store from "./redux/store";

/// NAVIGATION ///
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";
import Channel from "./Screens/Channel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Bruh from "./Screens/Bruh";

/// SIDEBAR ///
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./Components/CustomDrawerContent";
const Stack = createNativeStackNavigator();
const StackNav = ({ route, navigation }) => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Teleprograms" component={Teleprograms} />
        <Stack.Screen name="Subscriptions" component={Subscriptions} />
        <Stack.Screen name="Filters" component={Filters} />
        <Stack.Screen name="Channel" component={Channel} />
      </Stack.Navigator>
    </>
  );
};

const Drawer = createDrawerNavigator();
function MyDrawer({ navigation }) {
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#363940",
          },
          headerShown: false,
          headerTransparent: true,
          drawerPosition: "right",
        }}
      >
        <Drawer.Screen name="LimeHD" component={StackNav} />
        <Drawer.Screen name="Settings" component={Filters} />
      </Drawer.Navigator>
    </>
  );
}

export default function App({ navigation }) {
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
}
