import axios from "axios";

const request = axios.create({
    baseURL: 'https://localhost:8000'
})

export default request