import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff40',
    paddingHorizontal:5,
    borderRadius:10,
  },
  formBg: {
    flex:1,
    height:400,
    width:400,
    paddingTop:200,
    paddingBottom:50,
    justifyContent: "center",
    backgroundColor: '#d7d7d726',
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    borderColor:"#d7d7d7",
  },
  btnView:{
    flex:1,
    width:300,
    height:100,
    padding:10,
    marginHorizontal:10,
    alignSelf:'center',
    fontSize:55,
  },
  btn:{
    alignSelf:'center',
    marginLeft:10,
    
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: "#d7d7d7",
    color: '#',
    alignSelf: "center",
    padding:5,
    fontSize: 20,
  },
  tableHeader:{
    marginTop:2,
    backgroundColor: "#8F00FF55",
    borderRadius:5,
  },
  headerTxt:{
    color: '#000',
    fontWeight:'600',
    fontSize:15,
  },
  homeTxt:{
    marginVertical:10,
    fontSize:20,
    fontWeight:"600",
    paddingHorizontal:10,
  },
  titleTxt:{
    fontSize:20,
    fontWeight:'600',
    paddingHorizontal:10,
  },
  searchBarView:{
    backgroundColor:'#ffffff20',
    paddingHorizontal:10,
    borderBottomWidth:0,
    borderTopWidth:0,
    marginVertical:10,
  },
  searchBarHome:{
    fontSize:15,
  },
  glassmorphism:{
    background: '#ffffff65',
    borderRadius:10,
    shadowColor:'#1f26875e',
    shadowOffset:{width:0, height:8},
    shadowOpacity:32,
    shadowRadius:32,
    borderBottomWidth:2.4,
    borderStyle:"solid",
  },
  editBtn:{
    fontSize:10,
  },
  touchableHome:{
    margin:5,
  },
  tableContainer:{
    marginVertical:10
  },
  btnContainer:{
    width:300,
    height:100,
    padding:10,
    marginHorizontal:10,
    alignSelf:'center',
    fontSize:55,
  },
  scrollContainer:{
    height:400,
  }
});

export default styles;
