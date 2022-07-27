import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";

const Logo = (props) => {
    return <Text style={styles.logo} {...props}>Jennys App</Text>
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 30,
        color: "white",
        fontFamily: "Roboto"
    }
})

export default Logo

