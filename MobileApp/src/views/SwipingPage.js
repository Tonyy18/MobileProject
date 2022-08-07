import React, {Component} from "react";
import {View, Text, StyleSheet, Image, Fetch, Pressable, StatusBar, Alert} from "react-native";
import { Authenticated } from "../api/auth";
import { UserIcon, LogoutIcon } from "../components/icons";
import {logout} from "../api/auth";
import Logo from "../components/Logo"
import Swiper, {SwiperButtons} from "../components/Swiper";

class SwipingPage extends Authenticated {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                <View style={styles.topBar}>
                    <Pressable style={styles.iconButton} onPress={() => {this.props.navigation.navigate("Settings")}}>
                        <UserIcon style={styles.topBarIcon}></UserIcon>
                    </Pressable>
                    <Logo style={styles.logo}></Logo>
                    <Pressable style={styles.iconButton}>
                        <LogoutIcon style={styles.topBarIcon}></LogoutIcon>
                    </Pressable>
                </View>
                <Swiper onLike={() => {}} onNot={() => {}}></Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
    topBar: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        height: 70,
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: "#F1F1F1"
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