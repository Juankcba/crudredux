import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://localhost:3002/'
});
export default clienteAxios; 