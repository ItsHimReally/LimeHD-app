// SearchBar.js
import { React, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Dimensions } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";


/// ICONS ///
import SearchIcon from '../assets/search.svg'
import CloseIcon from '../assets/close.svg'

const winWidth = Dimensions.get('window').width
const winHeight = Dimensions.get('window').height

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar__container}>
        <View
          style={
            styles.searchBar__unclicked
          }
        >
          <SearchIcon
            style={{ width: 20, height: 20 }}
          />

          <TextInput
            style={styles.input}
            placeholder="Поиск"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
              setClicked(true);
            }}
          />

            <CloseIcon
              style={{ height: 30, width: 30 }}
              onPress={() => {
                setSearchPhrase("");
              }}
            />
        </View>
      </View>
    </View>
  );
};

export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    // width: "90%",
  },
  searchBar__container: {
    // marginLeft: winWidth * 0.15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: winWidth * 0.7,
    // marginTop: 50
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '75%'
  },
});
