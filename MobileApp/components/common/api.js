import Settings from "./Settings";
import {ping} from "./apiRequests";

function getStatus() {
    return ping().then((result) => {return true}).catch((err) => {return err});
}

function isLoggedIn() {
    return ping().then((result) => {return result == 200}).catch((err) => {return err});
}
export {getStatus, isLoggedIn};