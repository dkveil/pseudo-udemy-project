import axios from "axios";

const host = `http://${window.location.hostname}:8000`

const request = axios.create({
        baseURL: host,
    })

export default request