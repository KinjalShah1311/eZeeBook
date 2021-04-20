import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:7000', //
    timeout: 2000,
    // headers: {'X-Custom-Header': 'foobar'}
  });
export default axiosInstance;