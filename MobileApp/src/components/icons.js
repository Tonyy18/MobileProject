import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDoorOpen, faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const UserIcon = (props) => {
    return <FontAwesomeIcon icon={faUser} {...props}></FontAwesomeIcon>
}
const LockIcon = (props) => {
    return <FontAwesomeIcon icon={faLock} {...props}></FontAwesomeIcon>
}
const MailIcon = (props) => {
    return <FontAwesomeIcon icon={faEnvelope} {...props}></FontAwesomeIcon>
}
const LogoutIcon = (props) => {
    return <FontAwesomeIcon icon={faDoorOpen} {...props}></FontAwesomeIcon>
}
export {UserIcon, LockIcon, MailIcon, LogoutIcon};