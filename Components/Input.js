// List.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList

//The filter
const Input = ({ value, setValue, placeholder, description }) => {
  return (
    <View>
      <Text>{description}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
      ></TextInput>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
    borderRadius: 12,
  },
});
