import React, {Component} from "react";
import {View, Text, StyleSheet, Image, Fetch, Pressable} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from "../index/inputs"

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
export {getToken, setToken, Authenticated}