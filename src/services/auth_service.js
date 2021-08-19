import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'https://tienda-dylan.herokuapp.com/auth')
  : (baseURL = 'http://localhost:3000/auth');

const service = axios.create({ withCredentials: true, baseURL });

const AUTH_SERVICE = {
  SIGNUP: data => service.post('/signup', data),
  LOGIN: data => service.post('/login', data),
  CURRENT_USER: () => service.get('/logged'),
  LOGOUT: () => service.get('/logout')
};

export default AUTH_SERVICE;