//configuration de la api
//AXIOS
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.EXPO_API_URL,
  headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;