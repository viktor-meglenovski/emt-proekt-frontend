import axios from "axios";

// const securityUrl="http://localhost:8000/api";

const instance=axios.create({
    headers:{
        "Access-Control-Allow-Origin":"*",
        'content-type': 'multipart/form-data',
    }
});

export default instance;