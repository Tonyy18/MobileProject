import {postRequest} from "./requests";
function createUser(data) {
    return postRequest(Settings.url + "/api/users", data).then((json) => {return json}).catch((error) => {throw error});
}

export {createUser};