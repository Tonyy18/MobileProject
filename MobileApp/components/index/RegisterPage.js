import React, {Component} from "react";
import {View, Text, StyleSheet, Image, Alert, Fetch} from "react-native";
import Logo from "./Logo"
import {EmailInput, PasswordInput, LoginButton, RegisterButton, Button} from "./inputs"
import Settings from "../common/Settings";

const Title = () => {
    return (
        <Text style={styles.title}>Create Account</Text>
    )
}

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false
        }
    }
    onClick() {
        this.setState({
            loader: true
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Title></Title>
                    <EmailInput placeholder="Email"></EmailInput>
                    <PasswordInput placeholder="Password"></PasswordInput>
                    <PasswordInput placeholder="Password again"></PasswordInput>
                    <Button title="Register" onPress={() => {this.onClick()}} loader={this.state.loader}></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        width: "80%",
    },  
    title: {
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 80
    },
    container: {
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default RegisterPage;