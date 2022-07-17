import React, {Component} from "react";
import {View, Text, StyleSheet, Image, ActivityIndicator} from "react-native";
import Logo from "./Logo"
import {EmailInput, PasswordInput, LoginButton, RegisterButton,} from "./inputs"

const OrLine = () => {
    return(
        <View style={styles.orLine}>
            <View style={styles.borderLine}></View>
            <Text style={styles.orText}>Or</Text>
            <View style={styles.borderLine}></View>
        </View>
    )
}

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginLoader: false,
            alertText: "error"
        }
    }
    loginClick() {
        this.setState({loginLoader: true})
    }
    registerClick() {
        this.props.navigation.navigate("Register");
    }
    render() {
        return (
            <View>
                <View style={styles.pageTop}>
                    <View style={styles.topContainer}>
                        <Logo></Logo>
                    </View>
                    <Image source={require("../../assets/png/wave.png")} style={styles.wave} fadeDuration={0}></Image>
                </View>
                <View style={styles.pageBottom}>
                    <View style={styles.bottomContainer}>
                        <EmailInput placeholder="Email"></EmailInput>
                        <PasswordInput placeholder="Password"></PasswordInput>
                        <LoginButton title="Login" loader={this.state.loginLoader} onPress={() => {this.loginClick()}}></LoginButton>
                        <OrLine></OrLine>
                        <RegisterButton title="Register" onPress={() => {this.registerClick()}}></RegisterButton>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    orText: {
        paddingRight: 10,
        paddingLeft: 10,
        color: "#D6D6D6"
    },
    orLine: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    borderLine: {
        borderBottomColor: "#D6D6D6",
        borderBottomWidth: 1,
        flexGrow: 1
    },
    bottomContainer: {
        width: "80%",
    },
    topContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    pageTop: {
        backgroundColor: "#4CABFF",
        height: "40%",
        position: "relative",
        zIndex: 1
    },
    wave: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 50
    },
    pageBottom: {
        height: "60%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default LoginPage;