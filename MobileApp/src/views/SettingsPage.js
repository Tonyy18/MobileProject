import React, {Component} from "react";
import {View, Text, StyleSheet, Image, ActivityIndicator, Alert} from "react-native";
import {Authenticated} from "../api/auth";
class SettingsPage extends Authenticated {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text>Settings</Text>
            </View>
        )
    }
}

export default SettingsPage;