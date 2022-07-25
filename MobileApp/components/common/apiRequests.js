import Settings from "./Settings";
import {getToken} from "../auth/authentication"

function request(url, data) {
    return getToken().then((token) => {
        data["headers"] = {
            "content-type": "application/json"
        }
        if(token) {
            data["headers"]["authorization"] = "Bearer " + token;
        }
        return fetch(url, data)
        .then((response) => {return response.json()})
        .then((json) => {return json})
        .catch((error) => {throw error})
    }).catch((error) => {
        throw error;
    })
}

function getRequest(url) {
    return request(url, {type: "GET"})
    .then((result) => {return result})
    .catch((error) => {throw error})
}

function postRequest(url, _data) {
    let data = {
        method: "POST",
        body: JSON.stringify(_data),
    }
    return request(url, data)
    .then((result) => {return result})
    .catch((error) => {throw error})
}

function ping() {
    return getRequest(Settings.url + "/api/ping").then((json) => {return json}).catch((error) => {throw error});
}

export {ping, getRequest, postRequest}