import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'https://tienda-dylan.herokuapp.com/product')
  : (baseURL = 'http://localhost:3000/product');

const service = axios.create({ withCredentials: true, baseURL });

const PRODUCT_SERVICE = {
  CREATE: data => service.post('/create', data),
  UPDATE: (data,id) => service.patch(`/update/${id}`, data),
  GET_PRODUCTS: () => service.get('/all'),
  DELETE: (id) => service.delete(`/delete/${id}`),
  DETAIL: (id) => service.get(`detail/${id}`)
};

export default PRODUCT_SERVICE;