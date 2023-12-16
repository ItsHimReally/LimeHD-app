import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import List from "../Components/List";
import SearchBar from "../Components/SearchBar";
import styles from "../Styles/MainStyle";
import { Feather, Entypo } from "@expo/vector-icons";

const data = [
  { id: "1", name: "Рен-ТВ", details: "мистика шиза бред инопланетяне" },
  {
    id: "2",
    name: "ТВ-3",
    details: "битва экстрасенсы шиза бред теории заговора",
  },
  { id: "3", name: "Пятница!", details: "путешествия решка орёл орел" },
  { id: "4", name: "Че!", details: "фильмы" },
  { id: "5", name: "Россия 1", details: "новости путин " },
  { id: "6", name: "Россия 1", details: "новости путин " },
  { id: "7", name: "Россия 1", details: "новости путин " },
  { id: "8", name: "Россия 1", details: "новости путин " },
];
const Search = ({ navigation }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  useEffect(() => {
    console.log(data[0].title);
    setFakeData(data);
  });
  return (
    <View style={styles.container}>
      {!clicked && <Text style={style.title}>Programming Languages</Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      <Entypo
        name="chevron-left"
        size={20}
        color="lime"
        style={{ padding: 1 }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text>Назад</Text>
      <Entypo
        name="sound-mix"
        size={20}
        color="lime"
        style={{ padding: 1 }}
        onPress={() => navigation.navigate("Filters")}
      />
      <Text>Фильтры</Text>

      <List
        searchPhrase={searchPhrase}
        data={fakeData}
        setClicked={setClicked}
      />
    </View>
  );
};

export default Search;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  listItemText: {
    fontSize: 18,
  },
});
