import React, {Component, useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, Alert, Fetch} from "react-native";
import {isLoggedIn} from "../common/api";

class LoadingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedin: false,
            online: false,
            text: "Loading ..."
        }
    }
    componentDidMount() {
        isLoggedIn((login) => {
            this.setState({
                loggedIn: login,
                online: true
            })
        }, (error) => {
            this.setState({
                loggedIn: false,
                online: false,
                text: "Services are currently offline"
            })
        })
    }
    render() {
        if(this.state.online) {
            this.props.navigation.navigate("Login");
        }
        return (
            <View style={styles.container}><Text style={styles.text}>{this.state.text}</Text></View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    text: {
        fontSize: 20
    }
})
export default LoadingPage;