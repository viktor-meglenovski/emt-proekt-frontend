import axios from "axios";

let instance=axios.create({
    headers:{
        "Access-Control-Allow-Origin":"*",
        'content-type': 'multipart/form-data',
    }
});
export default instance;