import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";

const Logo = () => {
    return <Text style={styles.logo}>Jennys App</Text>
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 30,
        color: "white",
        fontFamily: "Roboto"
    }
})

export default Logo

