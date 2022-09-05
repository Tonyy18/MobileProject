import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faHeart, faBan, faCheck, faAngleLeft, faDoorOpen, faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

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
const ArrowLeftIcon = (props) => {
    return <FontAwesomeIcon icon={faAngleLeft} {...props}></FontAwesomeIcon>
}
const CheckIcon = (props) => {
    return <FontAwesomeIcon icon={faCheck} {...props}></FontAwesomeIcon>
}
const BanIcon = (props) => {
    return <FontAwesomeIcon icon={faBan} {...props}></FontAwesomeIcon>
}
const HeartIcon = (props) => {
    return <FontAwesomeIcon icon={faHeart} {...props}></FontAwesomeIcon>
}
const PlusIcon = (props) => {
    return <FontAwesomeIcon icon={faPlus} {...props}></FontAwesomeIcon>
}
export {UserIcon, LockIcon, MailIcon, LogoutIcon, ArrowLeftIcon, CheckIcon, BanIcon, HeartIcon, PlusIcon};