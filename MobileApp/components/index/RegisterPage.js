import React, {Component} from "react";
import {View, Text, StyleSheet, Image, Fetch} from "react-native";
import Logo from "./Logo"
import {EmailInput, PasswordInput, NameInput, Button} from "./inputs"
import Settings from "../common/Settings";
import {createUser} from "../common/api";
import AlertBar from '../common/AlertBar';
const email_validator = require("email-validator");

const Title = () => {
    return (
        <Text style={styles.title}>Create Account</Text>
    )
}

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            emailText: "",
            passwordText: "",
            password2Text: "",
            nameText: "",
            errorText: null,
        }
    }
    onClick() {
        const email = this.state.emailText.trim();
        const password = this.state.passwordText;
        if(!email_validator.validate(email)) {
            this.setState({
                errorText: "Invalid email"
            })
        } else if(password.length < 5) {
            this.setState({
                errorText: "Password is too short"
            })
        } else if(password.length > 60) {
            this.setState({
                errorText: "Password is too long"
            })
         } else if (this.state.emailText.length > 60) {
            this.setState({
                errorText: "Email is too long"
            })
        } else {
            this.setState({
                loader: true
            })
            createUser({
                email: this.state.emailText,
                password: this.state.passwordText
            }).then((result) => {
                if(result.code == 201) {
                    this.setState({
                        errorText: "User created"
                    })
                } else {
                    this.setState({
                        errorText:result.data
                    })
                }
            }).catch((err) => {
                console.error(err)
            }).finally(() => {
                this.setState({
                    loader: false
                })
            })
        }
        setTimeout(() => {
            this.setState({errorText: null})
        }, 3000);
    }
    render() {
        return (
            <View style={styles.container}>
                <AlertBar visible={this.state.errorText != null} text={this.state.errorText} type="notice"></AlertBar>
                <View style={styles.content}>
                    <Title></Title>
                    <NameInput placeholder="Name" value={this.state.nameText} onChangeText={text => this.setState({nameText:text})}></NameInput>
                    <EmailInput placeholder="Email" value={this.state.emailText} onChangeText={text => this.setState({emailText:text})}></EmailInput>
                    <PasswordInput placeholder="Password" value={this.state.passwordText} onChangeText={text => this.setState({passwordText:text})}></PasswordInput>
                    <PasswordInput placeholder="Password again" value={this.state.password2Text} onChangeText={text => this.setState({password2Text:text})}></PasswordInput>
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