import Settings from "./Settings";

function getRequest(url, success, error) {
    fetch(url)
    .then((response) => response.json())
    .then(success)
    .catch(error)
}

function ping(success, error) {
    getRequest(Settings.url + "/api/ping", success, error)
}

export {ping}