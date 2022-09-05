import React, {Component} from "react";
import {View, Text, StyleSheet, Image, ActivityIndicator, StatusBar, Pressable, Dimensions, ScrollView, Alert} from "react-native";
import {Authenticated} from "../api/auth";
import {ArrowLeftIcon, LogoutIcon} from "../components/icons";
import ImageSettings from "../components/ImageSettings";

const TEST_DATA = [
    {
      id: 1,
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599"
    },
    {
      id: 2,
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799"
    },
    {
      id: 3,
      src: "https://source.unsplash.com/qDkso9nvCg0/600x799"
    },
    {
      id: 4,
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799"
    },
    {
      id: 5,
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799"
    },
    {
      id: 6,
      src: "https://source.unsplash.com/NQSWvyVRIJk/800x599"
    },
    {
      id: 7,
      src: "https://source.unsplash.com/zh7GEuORbUw/600x799"
    },
    {
      id: 8,
      src: "https://source.unsplash.com/PpOHJezOalU/800x599"
    },
    {
      id: 9,
      src: "https://source.unsplash.com/I1ASdgphUH4/800x599"
    },
    {
      id: 10,
      src: "https://source.unsplash.com/XiDA78wAZVw/600x799"
    },
    {
      id: 11,
      src: "https://source.unsplash.com/x8xJpClTvR0/800x599"
    },
    {
        src: "add_image"
    }
];
const TopBar = (props) => {
    return (
        <View style={styles.topBar}>
            <Pressable style={styles.iconButton} onPress={() => {props.navigation.goBack()}}>
                <ArrowLeftIcon style={styles.topBarIcon}></ArrowLeftIcon>
            </Pressable>
            <Text style={styles.logo}>Settings</Text>
            <Pressable style={styles.iconButton} onPress={() => {props.logout()}}>
                <LogoutIcon style={styles.topBarIcon}></LogoutIcon>
            </Pressable>
        </View>
    )
}

class SettingsPage extends Authenticated {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                <TopBar {...this.props} logout={() => {this.logout()}}/>
                <ImageSettings images={TEST_DATA} onAddImage={() => {}} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%"
    },
    topBar: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        height: 70,
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: "#F1F1F1",
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
    },
    logo: {
        flexGrow: 1,
        textAlign: "center",
        fontSize: 17
    }
})
export default SettingsPage;