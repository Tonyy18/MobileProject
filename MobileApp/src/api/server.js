import {getRequest} from "./requests";
import Settings from "../common/Settings";
function getStatus() {
    return ping().then((result) => {return true}).catch((err) => {throw err});
}
function ping() {
    return getRequest("/api/ping").then((json) => {return json}).catch((error) => {throw error});
}
export {getStatus, ping};