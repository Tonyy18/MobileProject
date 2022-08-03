import React, {Component} from "react";
import {View, Text, StyleSheet, Image, Fetch, Pressable, Alert} from "react-native";
import { Authenticated } from "../api/auth";
import { UserIcon, LogoutIcon } from "../components/icons";
import {logout} from "../api/auth";
import Logo from "../components/Logo"
import Swiper from "../components/Swiper";

const TopBar = (props) => {
    return (
        <View style={styles.topBar}>
            <Pressable style={styles.iconButton}>
                <UserIcon style={styles.topBarIcon}></UserIcon>
            </Pressable>
            <Logo style={styles.logo}></Logo>
            <Pressable style={styles.iconButton} onPress={() => {props.logout()}}>
                <LogoutIcon style={styles.topBarIcon}></LogoutIcon>
            </Pressable>
        </View>
    )
}

class SwipingPage extends Authenticated {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <View style={styles.topBar}>
                    <Pressable style={styles.iconButton} onPress={() => {this.props.navigation.navigate("Settings")}}>
                        <UserIcon style={styles.topBarIcon}></UserIcon>
                    </Pressable>
                    <Logo style={styles.logo}></Logo>
                    <Pressable style={styles.iconButton} onPress={() => {this.logout()}}>
                        <LogoutIcon style={styles.topBarIcon}></LogoutIcon>
                    </Pressable>
                </View>
                <Swiper></Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topBar: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        height: 70,
        alignItems: "center"
    },
    topBarIcon: {
        color: "#C1C1C1",
        padding: 12,
        margin: 12,
    },
    iconButton: {
        width: 65,
        display: "flex",
        alignItems: "center",
        //borderColor: "black",
        //borderWidth: 1
    },
    logo: {
        color: "black",
        flexGrow: 1,
        textAlign: "center",
        color: "#4CABFF",
        fontSize: 17,
        fontWeight: "bold"
    }
})

export default SwipingPage;