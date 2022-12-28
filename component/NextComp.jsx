import { ImageBackground, ScrollView, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from "../styles.jsx";
import imgBg from "../assets/nextBg.png";
import { DataTable, RadioButton } from "react-native-paper";
import { Button } from "@rneui/base";
import axiosBaseUrl from "../axios/Axios.js";

//  -----

function NextComp() {
  const [loggedUser, setLoggedUser] = useState();
  const [updatedUserDetails, setUpdatedUserDetails] = useState([]);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("loggedUsername");
      if (value !== null) {
        setLoggedUser(JSON.parse(value));
        console.log("got loggedUser: " + loggedUser);
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };
  useEffect(() => {
    getData();
  });
  const showData = () => {
    console.log("showdata");
    // let data = { username: loggedUser };
    axiosBaseUrl
      .get("/users")
      .then(function (response) {
        console.log("success");
        setUpdatedUserDetails(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const updateUserData = (value) => {
    console.log(value);
    var data = {
      username: loggedUser,
      os: value,
    };
    axiosBaseUrl
      .post("/update", data)
      .then(function (response) {
        console.log("success");
        showData();
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <>
      <View style={Styles.container}>
        <ImageBackground source={imgBg} resizeMode="cover" style={Styles.image}>
          <Text style={Styles.text}>Welcom to Next Comp</Text>
          <Button
            radius={10}
            title={"Android"}
            style={Styles.btn}
            containerStyle={Styles.btnContainer}
            titleStyle={Styles.titleTxt}
            color="warning"
            onPress={() => updateUserData("android")}
          />
          <Button
            radius={10}
            color="warning"
            title={"IOS"}
            style={Styles.btn}
            containerStyle={Styles.btnContainer}
            titleStyle={Styles.titleTxt}
            onPress={() => updateUserData("ios")}
          />
          <View style={Styles.container}>
            <DataTable style={Styles.glassmorphism}>
              <DataTable.Header style={Styles.tableHeader}>
                <DataTable.Title style={Styles.headerTxt}>ID</DataTable.Title>
                <DataTable.Title style={Styles.headerTxt}>
                  username
                </DataTable.Title>
                <DataTable.Title style={Styles.headerTxt}>
                  Password
                </DataTable.Title>
                <DataTable.Title style={Styles.headerTxt}>
                  Device
                </DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {updatedUserDetails?.map((i) => {
                  return (
                    <DataTable.Row>
                      <DataTable.Cell>{i?.id}</DataTable.Cell>
                      <DataTable.Cell>{i?.username}</DataTable.Cell>
                      <DataTable.Cell>{i?.password}</DataTable.Cell>
                      <DataTable.Cell>{i?.device}</DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              </ScrollView>
            </DataTable>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

export default NextComp;
