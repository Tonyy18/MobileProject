import Settings from "./Settings";
import {ping, getRequest, postRequest} from "./apiRequests";
import {SetToken} from "../auth/authentication";

function getStatus() {
    return ping().then((result) => {return true}).catch((err) => {throw err});
}

function isLoggedIn() {
    return ping().then((result) => {return result.code == 200}).catch((err) => {throw err});
}

function createUser(data) {
    return postRequest(Settings.url + "/api/users", data).then((json) => {return json}).catch((error) => {throw error});
}

function login(data) {
    return postRequest(Settings.url + "/api/authenticate", data).then((json) => {return json}).catch((error) => {throw error});
}

export {getStatus, isLoggedIn, createUser, login};