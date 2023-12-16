// SearchBar.js
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Text,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView, TouchableOpacity, Dimensions, } from "react-native";
import Input from "../Components/Input";
import styles from "../Styles/MainStyle";
import RNPickerSelect from 'react-native-picker-select';

/// ICONS ///
import Star from '../assets/star.svg'
import Back from '../assets/back.svg'
import StarHalf from '../assets/starHalf.svg'

/// REDUX ///
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFilters, setProfile } from "../redux/actions";

const data = [
  { value: "0", label: "Россия"},
  { value: "1", label: "США" },
  { value: "2", label: "Франция" },
  { value: "3", label: "Испания" },
  { value: "4", label: "Германия" },
];

const data_genre = [
  { key: "1", value: "Ужастик" },
  { key: "2", value: "Боевик" },
  { key: "3", value: "Приключения" },
];

const Filters = ({ navigation }) => {

  const dispatch = useDispatch()

  const filters = useSelector((state) => state.user.filters);

  const [rating, setRating] = useState(filters["rating"]);
  const [timeStart, setTimeStart] = useState(filters["timeStart"]);
  const [timeEnd, setTimeEnd] = useState(filters["timeEnd"]);
  const [genre, setGenre] = useState(filters["genre"]);
  const [minAge, setMinAge] = useState(filters["minAge"]);
  const [prodYear, setProdYear] = useState(filters["prodYear"]);
  const [prodPlace, setProdPlace] = useState(filters["prodPlace"]);
  const [duration, setDuration] = useState(filters["duration"]);

  const [errMsg, setErrMsg] = useState('')

  const clearFilters = () => {
    setRating(-1);
    setTimeStart("");
    setTimeEnd("");
    setGenre("");
    setMinAge(-1);
    setProdYear("");
    setProdPlace("");
    setDuration(-1);
  };

  const makeResponse = () => {
    if (parseInt(prodYear) > 2024 || parseInt(prodYear) < 1930) setErrMsg('Введите допустимое значение года выпуска!');
    else {
      dispatch(setFilters({
        "rating": rating,
        "timeStart": timeStart,
        "timeEnd": timeEnd,
        "genre": genre,
        "minAge": minAge,
        "prodYear": prodYear,
        "prodPlace": prodPlace,
        "duration": duration
    }))
      navigation.goBack()
    }
  };

  const clickRating = (newRating) => {
    if (newRating == rating) setRating(-1);
    else setRating(newRating)
  }

  const onValueChange = (value) => {
    // If the selected item is clicked again, reset the picker
    if (value === prodPlace) {
      setProdPlace(null);
    } else {
      setProdPlace(value);
    }
  };

  const placeholder = {
    label: 'Select a country...',
    value: null,
    color: '#9EA0A4',
  };

  return (
    <ScrollView style={styles1.container}>
      <Back
        style={styles.filterBack}
        onPress={() => makeResponse()}
      />
      <View style={styles.ratingMain}>
        <Text style={styles.ratingText}>Рейтинг: {rating == -1 ? "" : "от " + rating.toFixed(1).toString() + " и выше"}</Text>
        <View style={styles.ratingBlock}>
          <TouchableOpacity onPress={() => clickRating(1)}><Star fill={rating >= 1 ? "#ffdd00" : "#292B2F"}/></TouchableOpacity>
          <TouchableOpacity onPress={() => clickRating(2)}><Star fill={rating >= 2 ? "#ffdd00" : "#292B2F"}/></TouchableOpacity>
          <TouchableOpacity onPress={() => clickRating(3)}><Star fill={rating >= 3 ? "#ffdd00" : "#292B2F"}/></TouchableOpacity>
          <TouchableOpacity onPress={() => clickRating(4)}><Star fill={rating >= 4 ? "#ffdd00" : "#292B2F"}/></TouchableOpacity>
          {rating >= 4.5 ?
          <TouchableOpacity onPress={() => clickRating(4.5)}><StarHalf fill={"#ffdd00"}/></TouchableOpacity> :
          <TouchableOpacity onPress={() => clickRating(4.5)}><Star fill={"#292B2F"}/></TouchableOpacity>
          }
      </View>
      
        
        
      </View>
      {/* <Input
        value={timeStart}
        setValue={setTimeStart}
        placeholder={"timeStart"}
        description={"Дата"}
      ></Input> */}
      {/* <View style={styles.genreMain}>
        <Text>Жанр:</Text>
        <TextInput value={genre} onChangeText={setGenre}></TextInput>
        <SelectList
          setSelected={(val) => setGenre(val)}
          data={data_genre}
          save="value"
          placeholder={genre}
          style={styles.genrePicker}
        />
      </View> */}
      {/* <Input
        value={minAge}
        setValue={setMinAge}
        placeholder={"minAge"}
        description={"Возрастное ограничение"}
      ></Input> */}
      <View style={styles.yearMain}>
        <Text style={styles.yearText}>Год выпуска: {prodYear == '' ? '' : 'от ' + prodYear.toString() + ' года'}</Text>
        <TextInput
          value={prodYear}
          onChangeText={setProdYear}
          placeholder={"1999"}
          style={styles.yearPicker}
          keyboardType="numeric"
        ></TextInput>
      </View>
      
      <Text style={styles.filterError}>{errMsg}</Text>
      {/* <View style={styles.block}>
        <Text>Страна</Text>
        <TextInput value={prodPlace} onChangeText={setProdPlace}></TextInput>
        <RNPickerSelect
        onValueChange={onValueChange}
        items={data}
        style={pickerSelectStyles}
        value={prodYear}
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false} // For Android styling
        />
        {console.log(prodPlace)}
      </View> */}
      {/* <Input
        value={duration}
        setValue={setDuration}
        placeholder={"duration"}
        description={"Длительность"}
      ></Input> */}
      {/* <Button title="Готово" onPress={makeResponse}></Button> */}
      <TouchableOpacity onPress={() => clearFilters()}>
        <View style={styles.clearFilters}>
          <Text style={styles.clearFiltersText}>
            Очистить
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Filters;

const winWidth = Dimensions.get('window').width
const winHeight = Dimensions.get('window').height

const styles1 = StyleSheet.create({
  container: {
    // padding: 10,
    // marginTop: "7%",
    flexDirection: "column",
    backgroundColor: '#292B2F',
    // borderRadius: 15,
    height: winHeight * 1.07
    // alignItems: "center",
    // justifyContent: "space-evenly",
  },
  block: {
    padding: 10,
    flexDirection: "column",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#FFF"
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#FFF"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#f00',
    borderRadius: 4,
    color: '#000',
    paddingRight: 30, // To ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#f00',
    borderRadius: 8,
    color: '#000',
    paddingRight: 30, // To ensure the text is never behind the icon
  },
});