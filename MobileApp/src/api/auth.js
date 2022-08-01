import React, {Component} from "react";
import {Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRequest } from "./requests";
import {ping} from "./server";

const setToken = async (token) => {
    try {
      await AsyncStorage.setItem('token',token);
      return true;
    } catch (error) {
      return false;
    }
};
const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      return value
    } catch(e) {
      // error reading value
      throw e;
    }
}
const isTokenSet = () => {
  return getToken().then((token) => {
    return token != "" && token != null
  }).catch((error) => {throw error;})
}
function login(data) {
    return postRequest("/api/authenticate", data).then((json) => {
        if(json.code == 200) {
            return setToken(json.data).then(() => {
            	return json;
            }).catch((err) => {
            	return {
                code: 409,
                data: "An error ocurred, code \"login409\""
              }
            })
        }
        return json;
    }).catch((error) => {throw error});
}
function logout() {
  return setToken("").then(() => {
    return true;
  })
}
function isLoggedIn() {
    return isTokenSet().then((result) => {
      if(result) {
        return ping().then((result) => {return result.code == 200}).catch((error) => {throw error});
      }
      return result
    }).catch((error) => {throw error})
}

class Authenticated extends Component {
  constructor(props) {
    super(props)
  }
  logout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Yes",
          onPress: () => {
            logout().then(() => {
              this.props.navigation.navigate("Loading")
            })
          }
        },
        {
          text: "No"
        }
      ]
    )
  }
}

export default Authenticated;
export {getToken, setToken, Authenticated, login, isLoggedIn, logout, isTokenSet}