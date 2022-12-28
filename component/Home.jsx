import { SearchBar } from "@rneui/themed";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ImageBackground,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { DataTable } from "react-native-paper";
import axiosBaseUrl from "../axios/Axios.js";
import Styles from "../styles.jsx";
import BgImg from "../assets/homeBg.png";
export const RESPONCEDATA = [
  { id: 31, password: "12345", username: "Test2" },
  { id: 32, password: "123", username: "Test3" },
  { id: 33, password: "12345", username: "Test3" },
  { id: 34, password: "12345", username: "Test4" },
  { id: 35, password: "12345", username: "Test 5" },
  { id: 36, password: "112", username: "Yes " },
];

// -------

function Home({ navigation }) {
  const [loggedUser, setLoggedUser] = useState();
  const [searchValue, setSearchValue] = useState();
  const [searchedData, setSearchedData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  // getting logged user data from asyncstorage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("loggedUsername");
      if (value !== null) {
        setLoggedUser(JSON.parse(value));
        console.log("got loggedUser: " + loggedUser);
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
    axiosBaseUrl
      .get("/users")
      .then(function (response) {
        console.log("success");
        setUsersData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  // to delete a row from database
  const del = (id) => {
    console.warn(id);
    axiosBaseUrl
      .post("/deleteuser", id)
      .then(function (response) {
        console.log("success");
        setSearchedData([]);
        setSearchedData(
          usersData.map((item, index) => {
            if (item.id === id) {
              return usersData.splice(index, 1);
            }
          })
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const searchFunction = (text) => {
    setSearchValue(text);
    var updatedDataArr = [];
    usersData.map((i) => {
      var l = i.username.toLowerCase()
      var p = i.password.toLowerCase()
      if (
        i.id === parseInt(text) ||
        l.match(text.toLowerCase()) ||
        p.match(text.toLowerCase())
      ) {
        updatedDataArr.push(i);
      }
    });
    if (updatedDataArr.length === 0) {
      console.warn("Search Error", "no data found");
      setSearchedData([]);
    } else {
      console.log(updatedDataArr);
      setSearchedData(updatedDataArr);
    }
    updatedDataArr = [];
  };

  const NextFun = () => {
    console.log("pressed");
    navigation.navigate("Next");
  };

  return (
    <View style={Styles.container}>
      <ImageBackground
        source={BgImg}
        resizeMode="cover"
        style={Styles.container}
      >
        <Text style={Styles.homeTxt}>
          Welcom Home,{"  " + loggedUser + "..!!"}
        </Text>
        <SearchBar
          style={Styles.searchBarHome}
          containerStyle={Styles.searchBarView}
          placeholder="Search Here..."
          round
          value={searchValue}
          //   onChangeText={text=>searchFunction(text)}
          onChangeText={(text) => searchFunction(text)}
          onClear={() => {
            console.warn("cleared");
            setSearchedData([]);
          }}
          onCancel={() => {
            console.warn("canceled");
            setSearchedData([]);
          }}
          // onSubmitEditing={() => searchFunction(searchValue)}
        />
        <View style={Styles.tableContainer}>
          <Text style={Styles.titleTxt}>Users Details</Text>
          <DataTable style={Styles.glassmorphism}>
            <DataTable.Header style={Styles.tableHeader}>
              <DataTable.Title style={Styles.headerTxt}>ID</DataTable.Title>
              <DataTable.Title style={Styles.headerTxt}>
                UserName
              </DataTable.Title>
              <DataTable.Title style={Styles.headerTxt}>
                Password
              </DataTable.Title>
              <DataTable.Title style={Styles.headerTxt}>Action</DataTable.Title>
            </DataTable.Header>
            <ScrollView style={Styles.scrollContainer}>
              {searchedData.length != 0
                ? searchedData.map((item) => {
                    console.log(item);
                    return <UsersDetails data={item} del={del} />;
                  })
                : usersData.map((item) => {
                    return <UsersDetails data={item} del={del} />;
                  })}
            </ScrollView>
          </DataTable>
        </View>
        <View style={Styles.btnView}>
          <Button title="Next" style={Styles.btn} onPress={NextFun} />
        </View>
      </ImageBackground>
    </View>
  );
}

export default Home;

export const UsersDetails = ({ data, del }) => {
  console.log(data.id + "  " + data.username);
  return (
    <>
      <DataTable.Row>
        <DataTable.Cell>{data.id}</DataTable.Cell>
        <DataTable.Cell>{data.username}</DataTable.Cell>
        <DataTable.Cell>{data.password}</DataTable.Cell>
        <DataTable.Cell>
          <TouchableHighlight>
            <Text style={Styles.touchableHome}>Edt</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              del((id = { id: data.id }));
            }}
          >
            <Text style={Styles.touchableHome}>Delete</Text>
          </TouchableHighlight>
        </DataTable.Cell>
      </DataTable.Row>
    </>
  );
};
