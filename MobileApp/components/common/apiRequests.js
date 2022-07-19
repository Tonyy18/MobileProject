import Settings from "./Settings";

function getRequest(url) {
    return fetch(url)
    .then((response) => response.json())
    .then((json) => {return json})
    .catch((error) => {throw error})
}

function ping(success, error) {
    return getRequest(Settings.url + "/api/ping").then((json) => {return json}).catch((error) => {return error});
}

export {ping}