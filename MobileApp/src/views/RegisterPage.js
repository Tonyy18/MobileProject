import React, {Component} from "react";
import {View, Text, StyleSheet, Image, StatusBar} from "react-native";
import {EmailInput, PasswordInput, NameInput, Button} from "../components/inputs"
import {createUser} from "../api/user";
import AlertBar from '../components/AlertBar';
import {login} from "../api/auth";
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
            firstNameText: "",
            lastNameText: "",
            errorText: null,
        }
    }
    onClick() {
        const firstName = this.state.firstNameText.trim();
        const lastName = this.state.lastNameText.trim();
        const email = this.state.emailText.trim();
        const password = this.state.passwordText;
        if(firstName.length < 1) {
            this.setState({
                errorText: "First name is required"
            })
        } else if(firstName.length > 50) {
            this.setState({
                errorText: "First name is too long"
            })
        } else if(lastName.length < 1) {
            this.setState({
                errorText: "Last name is required"
            })
        } else if(lastName.length > 50) {
            this.setState({
                errorText: "Last name is too long"
            })
        } else if(!email_validator.validate(email)) {
            this.setState({
                errorText: "Invalid email"
            })
        } else if (this.state.emailText.length > 60) {
            this.setState({
                errorText: "Email is too long"
            })
        } else if(password.length < 5) {
            this.setState({
                errorText: "Password is too short"
            })
        } else if(password.length > 60) {
            this.setState({
                errorText: "Password is too long"
            })
         } else {
            this.setState({
                loader: true
            })
            createUser({
                firstName: firstName,
                lastName: lastName,
                email: this.state.emailText,
                password: this.state.passwordText
            }).then((result) => {
                if(result.code == 201) {
                    login({email: email, password:password})
                    .then((result) => {
                        if(result.code == 200) {
                            this.props.navigation.navigate("Loading")
                        } else {
                            this.setState({
                                errorText: result.data
                            })
                        }
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
                <StatusBar
                    backgroundColor="#F1F1F1"
                    barStyle="dark-content"
                />
                <AlertBar visible={this.state.errorText != null} text={this.state.errorText} type="notice"></AlertBar>
                <View style={styles.content}>
                    <Title></Title>
                    <NameInput placeholder="First Name" value={this.state.firstNameText} onChangeText={text => this.setState({firstNameText:text})}></NameInput>
                    <NameInput placeholder="Last Name" value={this.state.lastNameText} onChangeText={text => this.setState({lastNameText:text})}></NameInput>
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