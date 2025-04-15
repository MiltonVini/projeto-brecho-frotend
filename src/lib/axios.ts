import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export const emailServiceApi = axios.create({
    baseURL: 'http://localhost:3000'
})