import axios from "axios";

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:7000',
    baseURL:'https://ezeebook-backend.herokuapp.com/',
    timeout: 10000,
    // headers: {'X-Custom-Header': 'foobar'}
  });
export default axiosInstance;