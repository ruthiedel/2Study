import axios from "axios";

 const http = axios.create({
    baseURL: "api",

    headers: {
        "Content-type": "application/json"
    }
});

export default http