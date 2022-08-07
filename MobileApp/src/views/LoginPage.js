import React, {Component} from "react";
import {View, Text, StyleSheet, Image, ActivityIndicator, Alert, StatusBar} from "react-native";
import Logo from "../components/Logo"
import {EmailInput, PasswordInput, Button, WhiteButton} from "../components/inputs"
import AlertBar from '../components/AlertBar';
import {login} from "../api/auth";

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
            alertText: null,
            email: "",
            password: ""
        }
    }
    loginClick() {
        this.setState({loginLoader:true})
        const email = this.state.email;
        const password = this.state.password;
        login({email: email, password:password})
        .then((result) => {
            if(result.code == 200) {
                this.props.navigation.navigate("Loading")
            } else {
                this.setState({
                    alertText: result.data
                })
            }
        }).catch((err) => {
            console.error(err)
            this.setState({alertText: "Services are offline"})
        }).finally(() => {
            this.setState({
                loginLoader: false
            })
            setTimeout(() => {
                this.setState({alertText: null})
            }, 3000);
        })
    }
    registerClick() {
        this.props.navigation.navigate("Register");
    }
    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="#4CABFF"
                    barStyle="light-content"
                />
                <View style={styles.pageTop}>
                    <View style={styles.topContainer}>
                        <AlertBar visible={this.state.alertText != null} text={this.state.alertText} type="error"></AlertBar>
                        <Logo></Logo>
                    </View>
                    <Image source={require("../../assets/png/wave.png")} style={styles.wave} fadeDuration={0}></Image>
                </View>
                <View style={styles.pageBottom}>
                    <View style={styles.bottomContainer}>
                        <EmailInput placeholder="Email" value={this.state.email} onChangeText={text => this.setState({email: text})}></EmailInput>
                        <PasswordInput placeholder="Password" value={this.state.password} onChangeText={text => this.setState({password: text})}></PasswordInput>
                        <Button title="Login" loader={this.state.loginLoader} onPress={() => {this.loginClick()}}></Button>
                        <OrLine></OrLine>
                        <WhiteButton title="Register" onPress={() => {this.registerClick()}}></WhiteButton>
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