import LoginComp from "./component/LoginComp";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./component/Home";
import NextComp from "./component/NextComp";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginComp} />
        <Stack.Screen name="Next" component={NextComp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
