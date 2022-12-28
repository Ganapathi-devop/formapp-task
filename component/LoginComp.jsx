import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { React, useRef, useState } from "react";
import {
  Alert,
  Button,
  ImageBackground,
  Text,
  TextInput,
  View,
} from "react-native";
import BgImg from "../assets/bg.png";
import axiosBaseUrl from "../axios/Axios";
import Styles from "../styles.jsx";

function LoginComp({ navigation }) {
  const [uname, setuname] = useState();
  const [pass, setPass] = useState();
  const inputRef1 = useRef()
  const inputRef2 = useRef()
  const createTwoButtonAlert = () => {
    inputRef1.current.clear()
    inputRef2.current.clear()
    console.log();
    Alert.alert(uname, pass, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => dataStore() },
    ]);
  };

  const storeData = async (value) => {
    value = JSON.stringify(value.username)
    try {
      await AsyncStorage.setItem('loggedUsername', value)
      console.log("stored: " + value);
    } catch (e) {
      // saving error
      console.warn(e);
    }
  }
  
  
  const dataStore = () => {
    // var data = {
    //   username: uname,
    //   password: pass,
    // };
    // console.log(data);
    var data = { username: uname, password: pass };
    console.log(data);
    axiosBaseUrl
      .post("insertdata", { username: uname, password: pass })
      .then(function (response) {
        console.log(response);
        console.log("success");
      })
      .then(() => {
        navigation.navigate("Home");
        storeData(data)
      })
      .catch(function (error) {
        console.error(error);
      });

    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       username: uname,
    //       password:pass
    //     }),
    //   }).then(()=>{
    //     console.log('success')
    //   }).catch((error)=>{
    //     console.error(error);
    //   })
  };
  return (
    <>
      <View style={Styles.container}>
        <ImageBackground source={BgImg} resizeMode="cover" style={Styles.image}>
          <View style={Styles.formBg}>
            <Text style={Styles.text}>User Name</Text>
            <TextInput
            ref={inputRef1}
            
              style={Styles.input}
              onChangeText={(text) => {
                setuname(text);
                console.log(text);
              }}
            />
            <Text style={Styles.text}>Password</Text>
            <TextInput
            ref={inputRef2}
              style={Styles.input}
              onChangeText={(text) => {
                setPass(text);
                console.log(text);
              }}
            />
          </View>
          <View style={Styles.btnView}>
            <Button
              title="Submit"
              style={Styles.btn}
              onPress={createTwoButtonAlert}
            />
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

export default LoginComp;
