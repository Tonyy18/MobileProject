import React, {Component, useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, ActivityIndicator, Pressable, Alert} from "react-native";
import FadeInOut from 'react-native-fade-in-out';

class AlertBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const style = {...styles.parent, backgroundColor: styles[this.props.type].backgroundColor}
        return(
        <FadeInOut visible={this.props.visible} style={style}>
            <Text style={styles.text}>{this.props.text}</Text>
        </FadeInOut>)
    }
} 
const styles = StyleSheet.create({
    error: {
        backgroundColor: "#EC3333",
    },
    success: {
        backgroundColor: "#3BD434",
    },
    notice: {
        backgroundColor: "#008FCD",
    },
    parent: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 65,
        flexDirection: "row",
        justifyContent: "center",
        color: "white",
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: "center",
        zIndex: 1000
    },
    text: {
        color: "white",
    }
})
export default AlertBar;