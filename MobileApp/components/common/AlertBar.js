import React, {Component, useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, ActivityIndicator, Pressable, Alert} from "react-native";
import FadeInOut from 'react-native-fade-in-out';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX} from "@fortawesome/free-regular-svg-icons";

class AlertBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            shown: false
        };
    }
    render() {
        if(this.props.show && this.state.visible == false && this.state.shown == false) {
            this.setState({
                visible: true
            })
            setTimeout(() => {
                this.setState({
                    visible: false
                })
            }, 3000)
            this.setState({
                shown: true
            })
        }
        if(this.props.show == false && this.state.shown == true) {
            this.setState({
                shown: false
            })
        }
        return (
        <FadeInOut visible={this.state.visible} style={styles.parent}>
            <Text style={styles.text}>{this.props.text}</Text>
        </FadeInOut>)
    }
} 
const styles = StyleSheet.create({
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
        backgroundColor: "#EC3333",
        alignItems: "center",
    },
    text: {
        color: "white",
    }
})
export default AlertBar;