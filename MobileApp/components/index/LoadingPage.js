import React, {Component, useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, Alert, Fetch} from "react-native";
import {isLoggedIn} from "../common/api";

class LoadingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "Loading ..."
        }
    }
    componentDidMount() {
        isLoggedIn().then((result) => {
            if(results == false) {
                //Not logged in yet
                this.props.navigation.navigate("Login");
            }
        }).catch((err) => {
            this.setState({
                text: "Services are currently offline"
            })
        })
    }
    render() {
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