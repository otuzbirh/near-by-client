import axios  from 'axios';
const createApiClient = () => {



    const client = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        // headers: {
        //     Authorization : `Bearer ${localStorage.getItem("token")}`
        // }
    })
    return client;
}

export function api() {
    const api = createApiClient();
    return api;
}