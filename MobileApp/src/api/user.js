import {postRequest} from "./requests";

function createUser(data) {
    console.log(data)
    return postRequest("/api/users", data).then((json) => {return json}).catch((error) => {throw error});
}

export {createUser};