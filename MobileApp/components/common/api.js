import Settings from "./Settings";
import {ping} from "./apiRequests";

function getStatus(callback) {
    ping((json) => {
        callback(true);
    }, (error) => {
        callback(false)
    })
}

function isLoggedIn(success, error) {
    ping((json) => {
        success(json.code == 200);
    }, (error) => {
        error()
    })
}
export {getStatus, isLoggedIn};