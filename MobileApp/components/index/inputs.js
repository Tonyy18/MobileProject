import React, {Component} from "react";
import {View, Text, StyleSheet, Image, TextInput, Pressable, ActivityIndicator} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAlignJustify, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";


class Input extends Component {
    constructor(props) {
        super(props);
        this.icon = null;
        this.state = {
            text: "",
            focused: false
        }
    }
    render() {
        let text = this.state.text;
        let parentClasses = [styles.parent];
        let childClasses = [styles.input];
        let iconClasses = [styles.icon];
        if(this.state.focused) {
            parentClasses.push(styles.inputFocus);
            childClasses.push(styles.inputFocus);
            iconClasses.push(styles.inputFocus);
        }
        if(this.props.type == "email") {
            this.icon = <FontAwesomeIcon style={iconClasses} icon={faEnvelope}></FontAwesomeIcon>
        }
        if(this.props.type == "password") {
            this.icon = <FontAwesomeIcon style={iconClasses} icon={faLock}></FontAwesomeIcon>
        }
        return (
            <View style={parentClasses}>
                {this.icon}
                <TextInput placeholder={this.props.placeholder}
                secureTextEntry={this.props.type == "password"}
                value={text}
                style={childClasses}
                onChangeText={text => this.setState({text:text})}
                onFocus={() => this.setState({focused: true})}
                onBlur={() => this.setState({focused: false})}>
                </TextInput>
            </View>
        )
    }
}
const EmailInput = (props) => {
    return <Input type="email" placeholder={props.placeholder}></Input>
}
const PasswordInput = (props) => {
    return <Input type="password" placeholder={props.placeholder}></Input>
}

const Button = (props) => {
    return <LoginButton title={props.title}></LoginButton>
}

const LoginButton = (props) => {
    let content = <Text style={{color: "white"}}>{props.title}</Text>
    if(props.loader) {
        content = <ActivityIndicator color="#ffffff"></ActivityIndicator>
    }
    return (
        <Pressable {...props} style={[styles.button, styles.blue]}>
            {content}
        </Pressable>
    )
}

const RegisterButton = (props) => {
    let content = <Text style={{color: "#C1C1C1"}}>{props.title}</Text>
    if(props.loader) {
        content = <ActivityIndicator color="#C1C1C1"></ActivityIndicator>
    }
    return (
        <Pressable {...props} style={[styles.button, styles.white]}>
            {content}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    blue: {
        color: "#",
        backgroundColor: "#4CABFF",
        height: 50,
        marginTop: 20
    },
    white: {
        borderColor: "#C1C1C1",
        borderWidth: 1
    },
    icon: {
        color: "#C1C1C1",
        marginRight: 10
    },
    parent: {
        borderBottomColor: "#C1C1C1",
        borderBottomWidth: 1,
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    input: {
        flexGrow: 1
    },
    inputFocus: {
        color: "#4CABFF",
        borderBottomColor: "#4CABFF",
    }
})
export {EmailInput, PasswordInput, LoginButton, RegisterButton, Button};
export default Input;