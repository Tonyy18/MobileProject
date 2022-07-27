import React, {Component} from "react";
import {View, Text, StyleSheet, Image, TextInput, Pressable, ActivityIndicator} from "react-native";
import { UserIcon, LockIcon, MailIcon } from "./icons";

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
        let parentClasses = [styles.parent];
        let childClasses = [styles.input];
        let iconClasses = [styles.icon];
        if(this.state.focused) {
            parentClasses.push(styles.inputFocus);
            childClasses.push(styles.inputFocus);
            iconClasses.push(styles.inputFocus);
        }
        if(this.props.type == "email") {
            this.icon = <MailIcon style={iconClasses}></MailIcon>
        }
        if(this.props.type == "password") {
            this.icon = <LockIcon style={iconClasses}></LockIcon>
        }
        if(this.props.type == "name") {
            this.icon = <UserIcon style={iconClasses}></UserIcon>
        }
        return (
            <View style={parentClasses}>
                {this.icon}
                <TextInput
                secureTextEntry={this.props.type == "password"}
                style={childClasses}
                onFocus={() => this.setState({focused: true})}
                onBlur={() => this.setState({focused: false})}
                {...this.props}>
                </TextInput>
            </View>
        )
    }
}
const EmailInput = (props) => {
    return <Input type="email" {...props}></Input>
}
const PasswordInput = (props) => {
    return <Input type="password" {...props}></Input>
}
const NameInput = (props) => {
    return <Input type="name" {...props}></Input>
}

const Button = (props) => {
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

const WhiteButton = (props) => {
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
        flexGrow: 1,
        color: "black"
    },
    inputFocus: {
        color: "#4CABFF",
        borderBottomColor: "#4CABFF",
    }
})
export {EmailInput, PasswordInput, WhiteButton, Button, NameInput};
export default Input;