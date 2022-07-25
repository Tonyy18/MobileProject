import React, {Component} from "react";
import {View, Text, StyleSheet, Image, Fetch, Pressable} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from "../components/inputs"
import Settings from "../common/Settings"
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
      return null;
    }
}
function login(data) {
    return postRequest(Settings.url + "/api/authenticate", data).then((json) => {
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

    }).catch((error) => {throw error});
}
function isLoggedIn() {
    return ping().then((result) => {return result.code == 200}).catch((err) => {throw err});
}

class Authenticated extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    getToken().then((token) => {
        console.log(token)
    })
  }
  logout() {
    setToken("").then(() => {
        this.props.navigation.navigate("Loading")
    })
  }
}
class MainView extends Authenticated {
    constructor(props) {
        super(props)
    }
    onClick() {
        this.logout();
    }
    render() {
        return (
            <View>
              <Text>Logged in</Text>
              <Button title="Log out" onPress={() => {this.onClick()}}></Button>
            </View>
        )
    }
}
export default MainView;
export {getToken, setToken, Authenticated, login, isLoggedIn}