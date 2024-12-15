import axios from 'axios'

export const postman = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})
