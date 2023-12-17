import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { Button, useWindowDimensions } from "react-native";
import { View } from "react-native";
import styles from "../Styles/MainStyle";
import { setProfile } from "../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";

const CustomDrawerContent = ({ navigation, route }) => {
  const [showTimeZone, setShowTimeZone] = useState(false);

  const width = useWindowDimensions().width * 0.3;

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
    navigation.navigate("Login");
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {
      console.error("STORING CACHE ERROR\n", e);
    }
  };

  return (
    <DrawerContentScrollView {...{ navigation, route }}>
      <ScrollView>
        <View style={styles.changeTimeZone}>
          <DrawerItem
            label="Поменять часовой пояс"
            labelStyle={{ color: "#97EE00", fontSize: 10 }}
            onPress={() => {
              setShowTimeZone(true);
            }}
          />
        </View>
        <View style={styles.signOut}>
          <DrawerItem
            style={{
              left: 0,
              width: width,
              height: width,
            }}
            label="Выйти"
            labelStyle={{ color: "#C93940" }}
            onPress={() => {
              handleExit();
            }}
          />
        </View>
      </ScrollView>
      {/* <View style={styles.modalContainer}> */}
      <Modal visible={showTimeZone} animationType="slide" transparent={true}>
        <View style={styles.modalParent}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.timeZoneInput}
              placeholder="Выберите часовой пояс"
            ></TextInput>
            <Button
              title="ОК"
              color="#97EE00"
              style={styles.timeZoneOK}
              onPress={() => {
                setShowTimeZone(false);
              }}
            ></Button>
          </View>
        </View>
      </Modal>
      {/* </View> */}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
