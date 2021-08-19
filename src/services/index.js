import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'https://tienda-dylan.herokuapp.com')
  : (baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });

const MY_SERVICE = {
  UPLOAD: async (docs) => {
    return await service.post('/upload', docs);
  }
};

export default MY_SERVICE;
