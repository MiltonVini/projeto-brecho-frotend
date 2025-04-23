import axios from "axios"


const apiUrl = process.env.REACT_APP_API_URL
const emailApiUrl = process.env.REACT_APP_EMAIL_SERVICE_API_URL


export const api = axios.create({
    baseURL: apiUrl
})

export const emailServiceApi = axios.create({
    baseURL: emailApiUrl
})