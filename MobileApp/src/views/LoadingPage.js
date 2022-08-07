import React, {Component, useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, Alert, StatusBar} from "react-native";
import {isLoggedIn} from "../api/auth";
import {getCurrentPosition} from "../api/geo";

class LoadingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            text: "Connecting ..."
        }
    }
    checkLogin() {
        isLoggedIn().then((result) => {
            if(result == false) {
                //Not logged in yet
                this.props.navigation.navigate("Login");
            } else {
                this.props.navigation.navigate("Authenticated")
            }
        }).catch((error) => {
            console.error(error);
            this.setState({
                error: true,
                text: "Services are currently offline\nPlease try again later"
            })
        })
    }
    componentDidMount() {
        this.props.navigation.addListener("focus", () => {
            this.checkLogin();
        })
    }
    render() {
        let image = "";
        if(this.state.error == false) {
            image = <Image source={require('../../assets/gif/loader.gif')} style={styles.gif}/>
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#4CABFF"
                    barStyle="light-content"
                />
                {image}
                <Text style={styles.text}>{this.state.text}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    gif: {
        height: 50,
        width: 50,
        marginBottom: 20
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#4CABFF"
    },
    text: {
        fontSize: 17,
        color: "white",
        textAlign: "center",
        lineHeight: 35
    }
})
export default LoadingPage;