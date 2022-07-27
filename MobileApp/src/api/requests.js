import Settings from "../common/Settings";
import {getToken} from "./auth"

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
        .catch((error) => {console.error(err); throw error})
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

export {getRequest, postRequest}